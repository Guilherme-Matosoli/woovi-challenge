import { io } from "socket.io-client"

const websockUrl = "http://localhost:4001"

export const socket = io(websockUrl);
