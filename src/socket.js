import socketIOClient from "socket.io-client";
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjdmODI4NjdmYTE2NGM0ZTAxMmI2MTUiLCJpYXQiOjE3MjE0NDg5ODR9.0vENI9ut0iF-rphWl8Q7mG2LL5haTH-xOrpil52kRME';

const SOCKET_URL = "https://api.writertools.ai";
let socket = null;
if (token) {
  socket = socketIOClient(SOCKET_URL, {
    path: "/socket.io",
    transports: ["websocket"],
    query: {
      token,
    },
  });
}

export const getSocket = () => {
  return socket;
};
