const express = require("express");
const app = express();
const connection = require("./DB/db.js");
const db = require("./index.js");
const DB = new db("data", connection, "mensajes");

const { Server: HTTPServer } = require("http");
const { Server: IOSocket } = require("socket.io");
const httpServer = new HTTPServer(app);
const io = new IOSocket(httpServer);

let Products = [];
let Messages = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

io.on("connection", async (socket) => {
  Products = await DB.getAllProducts();
  Messages = await DB.getAllMessages();
  console.log("connected to", socket.id);

  await DB.createTable();

  socket.emit("products", Products);
  socket.emit("chat-messages", Messages);

  socket.on("new_msg", async (msg) => {
    console.log("new message", msg);
    await DB.newMessages(msg);
    socket.emit("chat-messages", Messages);
  });
});

httpServer.listen(8080, () => {});
