const express = require("express");
const app = express();
const mongoose = require("mongoose");

//FAKER
const { faker } = require("@faker-js/faker");
faker.locale = "es_MX";

//MONGO
//Models
const msgSchema = new mongoose.Schema({
  author: {
    id: { type: String, required: true }, //Email
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    alias: { type: String, required: true }, //alias de usuario
    avatar: { type: String, required: true }, //url de avatar
  },
  text: { type: String, required: true, min: 1 },
});

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  thumbnail: { type: String, required: true },
});
const db = require("./containers/index.js");
const dbMensajes = new db("mensajes", msgSchema);
const dbProducts = new db("productos", productsSchema);

//IMPLEMETANDO SOCKET.IO
const { Server: HTTPServer } = require("http");
const { Server: IOSocket } = require("socket.io");
const httpServer = new HTTPServer(app);
const io = new IOSocket(httpServer);

// MIDDLEWARE;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// const generarProductos = () => {
//   //Generar Productos aleatorios con faker
//   return {
//     title: faker.commerce.product(),
//     price: faker.commerce.price(1000, 10000, 0),
//     thumbnail: faker.image.imageUrl(),
//   };
// };

let products = []; // Array de productos

// app.get("/api/productos-test", async (req, res) => {
//   const { cant = 5 } = req.query;
//   for (let i = 0; i < cant; i++) {
//     products.push({ id: products.length + 1, ...generarProductos() });
//   }
//   await dbProducts.save(products);
//   res.send(products);
// });

io.on("connection", async (socket) => {
  console.log("connected to", socket.id);

  socket.emit("chat-messages", await dbMensajes.getAll());

  socket.on("new_msg", async (msg) => {
    io.sockets.emit("chat-messages", await dbMensajes.save(msg));
    socket.emit("chat-messages", await dbMensajes.getAll());
  });
});

httpServer.listen(8080, () =>
  console.log("Conexion establecida en puerto 8080")
);
