//EXPRESS
const express = require("express");
const app = express();

//CONEXION CON MYSQL
const connection = require("./DB/db.js");

//CONTENEDOR DE DB
const db = require("./index.js");
const DB = new db("data", connection, "mensajes");

//IMPLEMETANDO SOCKET.IO
const { Server: HTTPServer } = require("http");
const { Server: IOSocket } = require("socket.io");
const httpServer = new HTTPServer(app);
const io = new IOSocket(httpServer);

let Messages = [];

// MIDDLEWARE;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

io.on("connection", async (socket) => {
  // await DB.createTable();
  await DB.getAllMessages().then((data) => {
    Messages = data;
  });

  console.log("connected to", socket.id, Messages);

  socket.emit("chat-messages", Messages);

  socket.on("new_msg", async (msg) => {
    console.log("new message", msg);
    await DB.newMessages(msg);
    await DB.getAllMessages().then((data) => {
      Messages = data;
    });
    socket.emit("chat-messages", Messages);
  });
});

httpServer.listen(8080, () => {});
