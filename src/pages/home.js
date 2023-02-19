import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import axios from "axios";
function Home() {
  let stompClientRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted" || result.state === "prompt") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
              },
              (error) => {}
            );
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
    if (stompClientRef.current === null) {
      connect();
    }
  }, []);
  function connect() {
    if (!connected) {
      let socket = new SockJS("http://localhost:8080/ws");
      stompClientRef.current = Stomp.over(() => socket);
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
      });
    }
  }
  function sendName() {
    // var name = document.getElementById("name").value;
    // stompClientRef.current.send(
    //   "/app/hello",
    //   {},
    //   JSON.stringify({ name: name })
    // );

    // axios({
    //   method: "POST",
    //   url: "http://localhost:8080/registerUser",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: {
    //     firstName: "Mohammad",
    //     lastName: "Mohammad",
    //     userEmail: "mohmd@gmail.com",
    //     password: "12345",
    //     userRole: "HEALTH_PROFESSIONAL",
    //     userLanguage: "en",
    //     profilePicture: "",
    //   },
    // }).then((res) => {
    //   console.log(res.data);
    // });
    // axios({
    //   method: "POST",
    //   url: "http://localhost:8080/loginUser",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: {
    //     userEmail: "mohmd@gmail.com",
    //     password: "12345",
    //   },
    // }).then((res) => {
    //   console.log(res.data);
    // });
    //  axios({
    //   method: "POST",
    //   url: "http://localhost:8080/checkToken/PASSWORD",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: {
    //     userFk: 30,
    //     tokenValue: "JOZL9C",
    //   },
    // }).then((res) => {
    //   console.log(res.data);
    // });

    // axios({
    //   method: "GET",
    //   url: "http://localhost:8080/getBusinessAccount/35",
    // }).then((res) => {
    //   console.log(res.data);
    // });
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const { latitude, longitude } = position.coords;

    //       axios({
    //         method: "POST",
    //         url: "http://localhost:8080/updateBusinessAccount",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         data: {
    //           businessAccountId: 5,
    //           userFk: 35,
    //           specialityFk: 1,
    //           biography: "test",
    //           clinicLocation: "test",
    //           clinicLocationLongitude: longitude,
    //           clinicLocationLatitude: latitude,
    //         },
    //       }).then((res) => {
    //         console.log(res.data);
    //       });
    //     },
    //     (error) => {
    //       alert("enable location");
    //     }
    //   );
    // }

    // axios({
    //   method: "POST",
    //   url: "http://localhost:8080/updatePassword",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: {
    //     userFk: 335,
    //     currentPassword: "123454",

    //     newPassword: "1234567",
    //   },
    // }).then((res) => {
    //   console.log(res.data);
    // });

    // axios({
    //   method: "POST",
    //   url: "http://localhost:8080/setSchedule/5",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: {
    //     scheduleSlots: [
    //       {
    //         slotDate: new Date("2023-02-18T17:50:47"),
    //         slotStartTime: new Date("2023-02-18T13:00:00"),

    //         slotEndTime: new Date("2023-02-18T13:20:00"),
    //       },

    //       {
    //         slotDate: new Date("2023-02-18T17:50:47"),
    //         slotStartTime: new Date("2023-02-18T13:25:00"),

    //         slotEndTime: new Date("2023-02-18T13:45:00"),
    //       },
    //       {
    //         slotDate: new Date("2023-02-18T17:50:47"),
    //         slotStartTime: new Date("2023-02-18T13:50:00"),

    //         slotEndTime: new Date("2023-02-18T14:10:00"),
    //       },
    //       {
    //         slotDate: new Date("2023-02-18T17:50:47"),
    //         slotStartTime: new Date("2023-02-18T14:15:00"),

    //         slotEndTime: new Date("2023-02-18T14:35:00"),
    //       },
    //     ],
    //   },
    // }).then((res) => {
    //   console.log(res.data);
    // });
    // axios({
    //   method: "GET",
    //   url: "http://localhost:8080/getBusinessAccountSchedule/5/2/2",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: {},
    // }).then((res) => {
    //   console.log(res.data);
    // });

    // axios({
    //   method: "DELETE",
    //   url: "http://localhost:8080/deleteReservationSlot/1",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: {},
    // }).then((res) => {
    //   console.log(res.data);
    // });

    // axios({
    //   method: "GET",
    //   url: "http://localhost:8080/getFavorites/36",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: {},
    // }).then((res) => {
    //   console.log(res.data);
    // });

    axios({
      method: "POST",
      url: "http://localhost:8080/globalSearch/1/2",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        minDistance: 0,
        maxDistance: 0.4,
        myLatitude: latitude,
        myLongitude: longitude,
      },
    }).then((res) => {
      console.log(res.data);
    });
    // axios({
    //   method: "GET",
    //   url: "http://localhost:8080/getReservationSlots/36",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: {},
    // }).then((res) => {
    //   console.log(res.data);
    // });
  }
  return (
    <div>
      <h1>WebSocket Example</h1>
      <input type="text" id="name" placeholder="Your name" />
      <button onClick={sendName}>Send</button>
    </div>
  );
}
export default Home;
