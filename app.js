const express = require("express");
const app = express();
const connection = require("./DB/db.js");
const db = require("./index.js");
const DB = new db("data", connection, "mensajes");
const handlebars = require("express-handlebars");

const { Server: HTTPServer } = require("http");
const { Server: IOSocket } = require("socket.io");
const httpServer = new HTTPServer(app);
const io = new IOSocket(httpServer);

let Products = [];
let Messages = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// app.use("views", "./views");
const hbs = handlebars.engine({
  extname: "hbs",
  layoutsDir: "./views/layouts/",
});
app.engine("hbs", hbs);

app.set("view engine", "hbs");

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

app.get("/", async (req, res) => {
  const data = await DB.getAllProducts();
  res.render("main", { layout: "myProducts", items: data });
});

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await DB.getProductsById(id);
    res.render("main", { layout: "product", ...product });
  } catch (e) {
    res.status(404).render("main", { layout: "error" });
  }
});

app.get("/api/", async (req, res) => {
  const data = await DB.getAllProducts();
  res.send(data);
});

app.get("/api/product", async (req, res) => {
  const { id } = req.query;
  try {
    const data = await DB.getProductsById(id);

    return res.send(data);
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

app.post("/api/product", async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const newData = await DB.newProduct({ title, price, thumbnail });
  return res.redirect("/products");
  // retunr res.send({ msg: "Usuario creado", data: newData });
});

httpServer.listen(8080, () => {});
