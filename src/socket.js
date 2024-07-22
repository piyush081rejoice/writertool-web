import socketIOClient from "socket.io-client";
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjdmODI4NjdmYTE2NGM0ZTAxMmI2MTUiLCJpYXQiOjE3MjE2NDQxODh9.cZV-4xt6a3JUP0PHFTzjdpIIHm-t55R5sgmt1ufuAv8";

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

export const connectSocket = () => {
  if (token) {
    socket = socketIOClient(SOCKET_URL, {
      path: "/socket.io",
      transports: ["websocket"],
      query: {
        token,
      },
    });
  }
};

export const getSocket = () => {
  return socket;
};
