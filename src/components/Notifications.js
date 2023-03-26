import { BellOutlined, DownOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/images/avatar.jpg";
import { userController } from "../controllers/userController";
import { util } from "../public/util";

export default function Notifications() {
  const [showNotifications, setShowNotifications] = useState(false);
  const userData = useSelector((state) => state);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (showNotifications) {
      let tempNotifications = [...userData.notifications.notifications];
      let tempNotOpened = [];
      for (let i = 0; i < tempNotifications.length; i++) {
        if (tempNotifications[i].isOpen === false) {
          tempNotifications[i].isOpen = true;
          tempNotOpened.push({
            notificationId: tempNotifications[i].notificationId,
            isOpen: true,
          });
        }
      }
      if (tempNotOpened.length !== 0) {
        userController.updateNotification({ body: tempNotOpened });
        dispatch({
          type: "SET_MY_NOTIFICATIONS",
          notifications: {
            notifications: tempNotifications,
            pageNumber: userData.notifications.pageNumber,
            totalNumberOfPages: userData.notifications.totalNumberOfPages,
          },
        });
      }
      if (userData.notifications.pageNumber === -1) {
        setLoading(true);
        userController
          .getNotifications({
            userId: userData.userInfo.userId,
            pageNumber:
              userData.notifications.pageNumber === -1
                ? 1
                : userData.notifications.pageNumber,
            recordsByPage: 4,
          })
          .then((response) => {
            let notifications = response.data.notifications;
            for (let i = 0; i < notifications.length; i++) {
              let notificationText = notifications[i].notificationText;
              let outputString = notificationText.replace(
                /\[.*?\]/g,
                function (match, captureGroup) {
                  let date = match.substring(1, match.length-1);
                  date = moment(
                    util.formatTimeByOffset(
                      new Date(moment(date, "YYYY-MM-DD HH:mm:ss"))
                    ),
                    "YYYY-MM-DD HH:mm:ss"
                  ).format("YYYY-MM-DD HH:mm:ss");
                  return date;
                }
              );
              notifications[i].notificationText = outputString;
            }
            dispatch({
              type: "SET_MY_NOTIFICATIONS",
              notifications: {
                notifications: [...tempNotifications, ...notifications],
                pageNumber:
                  userData.notifications.pageNumber === -1
                    ? 1
                    : userData.notifications.pageNumber + 1,
                totalNumberOfPages: response.data.totalNumberOfPages,
              },
            });
          })
          .then(() => {
            setLoading(false);
          });
      }
    }
  }, [showNotifications, userData.loadingApp]);

  useEffect(() => {
    if (loadMore) {
      setLoading(true);
      setLoadMore(false);
      userController
        .getNotifications({
          userId: userData.userInfo.userId,
          pageNumber:
            userData.notifications.pageNumber === -1
              ? 1
              : userData.notifications.pageNumber,
          recordsByPage: 4,
        })
        .then((response) => {
          let notifications = response.data.notifications;
          for (let i = 0; i < notifications.length; i++) {
            let notificationText = notifications[i].notificationText;
            let outputString = notificationText.replace(
              /\[.*?\]/g,
              function (match, captureGroup) {
                let date = match.substring(1, match.length-1);
                date = moment(
                  util.formatTimeByOffset(
                    new Date(moment(date, "YYYY-MM-DD HH:mm:ss"))
                  ),
                  "YYYY-MM-DD HH:mm:ss"
                ).format("YYYY-MM-DD HH:mm:ss");
                return date;
              }
            );
            notifications[i].notificationText = outputString;
          }
          dispatch({
            type: "SET_MY_NOTIFICATIONS",
            notifications: {
              notifications: [
                ...userData.notifications.notifications,
                ...notifications,
              ],
              pageNumber:
                userData.notifications.pageNumber === -1
                  ? 1
                  : userData.notifications.pageNumber + 1,
              totalNumberOfPages: response.data.totalNumberOfPages,
            },
          });
        })
        .then(() => {
          setLoading(false);
        });
    }
  }, [loadMore]);
  
  return (
    <div className="nav-notification-wrapper">
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setShowNotifications(!showNotifications)}
        className="d-flex align-items-center"
      >
        <BellOutlined />
      </div>
      <div className="nav-notification-badge">
        <Badge
          count={
            userData.notifications.notifications.filter(
              (n) => n.isOpen === false
            ).length
          }
        />
      </div>
      {userData.loadingApp
        ? "loading..."
        : showNotifications && (
            <div className="d-flex flex-column nav-notifications">
              {userData.notifications.notifications.length === 0
                ? "No notifications"
                : userData.notifications.notifications.map((not) => {
                    return (
                      <div className="nav-notification">
                        {not.notificationText}
                      </div>
                    );
                  })}
              {userData.notifications.pageNumber !== -1 &&
                userData.notifications.pageNumber <=
                  userData.notifications.totalNumberOfPages &&
                !loading && (
                  <div onClick={() => setLoadMore(true)}>load more</div>
                )}
            </div>
          )}
    </div>
  );
}
