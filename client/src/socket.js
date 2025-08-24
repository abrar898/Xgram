import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false
});

socket.onAny((ev, ...args) => console.log("[socket]", ev, args));

export default socket;
