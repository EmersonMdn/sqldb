const express = require("express");
const app = express();
const path = require("path");
const { faker } = require("@faker-js/faker");
//SOCKET
// const { Server: HTTPServer } = require("http");
// const { Server: IOSocket } = require("socket.io");
// const httpServer = new HTTPServer(app);
// const io = new IOSocket(httpServer);

app.use(express.static(path.join(__dirname, "public")));

app.listen(8080, function () {
  console.log("Server 8080");
});
