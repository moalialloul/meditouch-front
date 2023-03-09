import React, { useEffect, useRef, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useDispatch, useSelector } from "react-redux";
import { userController } from "../controllers/userController";
export const SocketWrapperContext = React.createContext("");
export const SocketWrapperProvider = ({ ...props }) => {
  const [connected, setConnected] = useState(false);
  let stompClientRef = useRef(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state);
  const communityPostsRef = useRef({
    pageNumber: -1,
    totalNumberOfPages: 1,
    posts: [],
  });
  const reservedSlots = useRef([]);
  const favoriteDoctors = useRef([]);
  const myAppointments = useRef([]);
  const notifications = useRef([]);
  const specialities = useRef([]);
  useEffect(() => {
    async function login() {
      const tempStorage = new window.mega.Storage(
        {
          email: "mohammadalialloul@gmail.com",
          password: "12121212@@AAAaa",
          userAgent: null,
        },
        (error) => {
          if (error) {
            console.log("error");
          } else {
            console.log("success");
          }
        }
      );

      await tempStorage.ready;
      dispatch({
        type: "SET_STORAGE",
        storage: tempStorage,
      });
    }
    login();
  }, []);
  useEffect(() => {
    communityPostsRef.current = userData.communityPosts;
  }, [userData.communityPosts]);
  useEffect(() => {
    reservedSlots.current = userData.reservedSlots;
  }, [userData.reservedSlots]);
  useEffect(() => {
    myAppointments.current = userData.myAppointments;
  }, [userData.myAppointments]);
  useEffect(() => {
    notifications.current = userData.notifications;
  }, [userData.notifications]);
  useEffect(() => {
    if (userData.specialities.length === 0) {
      userController.getSpecialities().then((response) => {
        specialities.current = response.data.specialities;
        dispatch({
          type: "SET_SPECIALITIES",
          specialities: specialities.current,
        });
      });
    }
  }, []);
  useEffect(() => {
    if (stompClientRef.current === null) {
      connect();
    }
  }, []);
  function connect() {
    if (!connected) {
      let socket = new SockJS("http://localhost:8080/ws");
      stompClientRef.current = Stomp.over(socket);
      stompClientRef.current.connect({}, function (frame) {
        console.log("Connected: " + frame);
        setConnected(true);
        stompClientRef.current.subscribe(
          "/topic/greetings",
          function (greeting) {
            var message = JSON.parse(greeting.body);
            console.log("Received: " + message.name);
          }
        );

        stompClientRef.current.subscribe(
          "/topic/reservedSlots/",
          function (payload) {
            var reservedSlotId = JSON.parse(payload.body).reservedSlot;
            let allReservedSlots = [reservedSlotId, ...reservedSlots.current];
            dispatch({
              type: "SET_RESERVED_SLOTS",
              reservedSlots: allReservedSlots,
            });
          }
        );

        stompClientRef.current.subscribe(
          "/topic/communityPosts/",
          function (payload) {
            var message = JSON.parse(payload.body).communityPost;
            message.communityPostComments = {
              pageNumber: -1,
              totalNumberOfPages: 1,
              comments: [],
            };
            let allCommunityPosts = [
              message,
              ...communityPostsRef.current.posts,
            ];
            dispatch({
              type: "SET_COMMUNITY_POSTS",
              communityPosts: {
                pageNumber: communityPostsRef.current.pageNumber,
                totalNumberOfPages:
                  communityPostsRef.current.totalNumberOfPages,
                posts: allCommunityPosts,
              },
            });
          }
        );

        stompClientRef.current.subscribe(
          "/topic/communityPostComment/",
          function (payload) {
            var message = JSON.parse(payload.body);
            let indexOfPost = communityPostsRef.current.posts.findIndex(
              (p) => (p.postId = message.postId)
            );
            communityPostsRef.current.posts[indexOfPost].commentCount =
              communityPostsRef.current.posts[indexOfPost].commentCount + 1;
            communityPostsRef.current.posts[
              indexOfPost
            ].communityPostComments.comments.unshift(message);
            dispatch({
              type: "SET_COMMUNITY_POSTS",
              communityPosts: {
                pageNumber: communityPostsRef.current.pageNumber,
                totalNumberOfPages:
                  communityPostsRef.current.totalNumberOfPages,
                posts: communityPostsRef.current.posts,
              },
            });
          }
        );
      });
    }
  }
  useEffect(() => {
    if (userData.userInfo !== null && stompClientRef.current && connected) {
      stompClientRef.current.subscribe(
        "/topic/favoriteDoctors/" + userData.userInfo.userId,
        function (payload) {
          var message = JSON.parse(payload.body);
          let allFavoriteDoctors = [...favoriteDoctors.current];
          if (message.type === "ADD") {
            allFavoriteDoctors.push(message.favoriteDoctorInfo);
          } else {
            let indexOfFavorite = allFavoriteDoctors.findIndex(
              (fd) => fd.favoriteId === message.favoriteId
            );
            allFavoriteDoctors.splice(indexOfFavorite, 1);
          }
          dispatch({
            type: "SET_FAVORITE_DOCTORS",
            favoriteDoctors: allFavoriteDoctors,
          });
        }
      );

      stompClientRef.current.subscribe(
        "/topic/appointmentsReminder/" + userData.userInfo.userId,
        function (payload) {
          var newNotification = JSON.parse(payload.body);

          let allNotifications = [newNotification, ...notifications.current];
          dispatch({
            type: "SET_MY_NOTIFICATIONS",
            notifications: allNotifications,
          });
        }
      );

      stompClientRef.current.subscribe(
        "/topic/clinicTurn/" + userData.userInfo.userId,
        function (payload) {
          var message = JSON.parse(payload.body);
          console.log("Received: " + message.message);
        }
      );

      if (userData.businessAccountInfo !== null) {
        stompClientRef.current.subscribe(
          "/topic/appointment/" +
            userData.businessAccountInfo.businessAccountId,
          function (payload) {
            var appointment = JSON.parse(payload.body).appointment;
            let allMyAppointments = [appointment, ...myAppointments.current];
            dispatch({
              type: "SET_MY_APPOINTMENTS",
              myAppointments: allMyAppointments,
            });
          }
        );

        if (userData.businessAccountInfo !== null) {
          stompClientRef.current.subscribe(
            "/topic/referral/" + userData.businessAccountInfo.businessAccountId,
            function (payload) {
              // var appointment = JSON.parse(payload.body).appointment;
              // let allMyAppointments = [appointment, ...myAppointments.current];
              // dispatch({
              //   type: "SET_MY_APPOINTMENTS",
              //   myAppointments: allMyAppointments,
              // });
            }
          );
        }
      }
    }
  }, [userData.userInfo, connected, userData.businessAccountInfo]);
  useEffect(() => {
    if (connected) {
      stompClientRef.current.send(
        "/app/hello",
        {},
        JSON.stringify({ firstName: "Mohammad" })
      );
    }
  }, [connected]);
  return (
    <SocketWrapperContext.Provider value={{}}>
      {props.children}
    </SocketWrapperContext.Provider>
  );
};
