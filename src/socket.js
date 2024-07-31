// import socketIOClient from "socket.io-client";

// const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjdmODI4NjdmYTE2NGM0ZTAxMmI2MTUiLCJpYXQiOjE3MjE5ODQxMDJ9.-DCuM5D0akc65GNwV1X-XwjdZKC6IS8LPK_oa1u39qI";


// let socket = null;
// if (token) {
//   socket = socketIOClient(SOCKET_URL, {
//     transports: ["websocket"],
//     query: {
//       token,
//     },
//   });
// }

// export const getSocket = () => {
//   return socket;
// };

const SOCKET_URL = "https://api.writertools.ai/";

import socketIOClient from "socket.io-client";
import { getCookie } from "./hooks/useCookie";

let access_token = getCookie("userToken");
let socket = null;

if (access_token) {
  socket = socketIOClient(SOCKET_URL, {
    transports: ["websocket", "htmlfile", "xhr-polling", "*"],
    extraHeaders: {
      "Bypass-Tunnel-Reminder": "true",
    },
    query: {
      token: "Bearer " + access_token,
    },
  });
}

export const connectSocket = (accessToken) => {
  if (accessToken) {
    socket = socketIOClient(SOCKET_URL, {
      transports: ["websocket", "htmlfile", "xhr-polling", "*"],
      extraHeaders: {
        "Bypass-Tunnel-Reminder": "true",
      },
      query: {
        token: "Bearer " + accessToken,
      },
    });
  }
};
export const getSocket = () => {
  return socket;
};
