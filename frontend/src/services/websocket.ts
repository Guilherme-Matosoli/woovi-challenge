import { io } from "socket.io-client"

const websockUrl = import.meta.env.VITE_WEBSOCKET;

export const socket = io(websockUrl);
