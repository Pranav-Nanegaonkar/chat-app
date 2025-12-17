import { Server } from "socket.io";
import http from "http";
import express from "express";
import { CLIENT_URL } from "../constants/env.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [CLIENT_URL],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected ", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected ", socket.id);
  });
});

export { io, app, server };
