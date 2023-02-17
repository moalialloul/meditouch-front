import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
function Home() {
  let stompClientRef = useRef(null);
  const [connected, setConnected] = useState(false);
  useEffect(() => {
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
    var name = document.getElementById("name").value;
    stompClientRef.current.send(
      "/app/hello",
      {},
      JSON.stringify({ name: name })
    );
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
