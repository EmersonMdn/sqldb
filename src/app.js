const express = require("express");
const app = express();

//FAKER
const { faker } = require("@faker-js/faker");
faker.locale = "es_MX";

//MONGO
const mongoose = require("mongoose");
const Message = require("./models/messageSchema.js");
const Product = require("./models/productSchema.js");
const db = require("./containers/index.js");
const dbMensajes = new db(Message);
const dbProducts = new db(Product);

//IMPLEMETANDO SOCKET.IO
const { Server: HTTPServer } = require("http");
const { Server: IOSocket } = require("socket.io");
const httpServer = new HTTPServer(app);
const io = new IOSocket(httpServer);

// MIDDLEWARE;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

const generarProductos = () => {
  //Generar Productos aleatorios con faker
  return {
    title: faker.commerce.product(),
    price: faker.commerce.price(1000, 10000, 0),
    thumbnail: faker.image.imageUrl(),
  };
};

let products = []; // Array de productos

app.get("/api/productos-test", async (req, res) => {
  const { cant = 5 } = req.query;
  for (let i = 0; i < cant; i++) {
    products.push({ id: products.length + 1, ...generarProductos() });
  }
  await dbProducts.save(products);
  res.send(products);
});

io.on("connection", async (socket) => {
  console.log("connected to", socket.id);

  socket.emit('products', await dbProducts.getAll());
  socket.emit("chat-messages", await dbMensajes.getAll());

  socket.on("new_msg", async (msg) => {
    io.sockets.emit("chat-messages", await dbMensajes.save(msg));
    socket.emit("chat-messages", await dbMensajes.getAll());
  });
});

httpServer.listen(8080, () => {
  mongoose.connect(
    "mongodb+srv://EmersonMdn:Loque.321@cluster0.0llifr1.mongodb.net/coderhouse?retryWrites=true&w=majority",
    {
      serverSelectionTimeoutMS: 5000,
    },
    (e) => {
      if (e) {
        console.log("Can not connect.", e);
        return e;
      }
      console.log("mongoDB connected!");
    }
  );
  console.log("Conexion establecida en puerto 8080");
});
