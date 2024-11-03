import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import config from "./config.js";
import { connectToMongo, getDb } from "./db.js";

import productsRouter from "./routes/products.router.js";
import usersRouter from "./routes/users.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
await connectToMongo();
const db = getDb();

app.engine("handlebars", handlebars.engine());
app.set("views", `${config.DIRNAME}/views`);
app.set("view engine", "handlebars");

app.use("/views", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/static", express.static(`${config.DIRNAME}/public`));

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

// Rutas de vista
app.get("/home", async (req, res) => {
  const products = await db.collection("products").find().toArray();
  res.render("home", { products });
});

app.get("/realtimeproducts", async (req, res) => {
  const products = await db.collection("products").find().toArray();
  res.render("realTimeProducts", { products });
});

// Configuración del servidor HTTP y WebSocket
const httpServer = app.listen(config.PORT, () => {
  console.log(`Server activo en puerto ${config.PORT}`);
});

const socketServer = new Server(httpServer);
app.set("socketServer", socketServer);

// WebSocket: manejo de conexiones
socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado con id", socket.id);

  socket.on("init_message", (data) => {
    console.log(data);
  });

  socket.emit("welcome", `Bienvenido cliente, estás conectado con el id ${socket.id}`);
});

// Ruta para agregar productos
app.post("/products", async (req, res) => {
  const newProduct = req.body;
  await db.collection("products").insertOne(newProduct);

  const products = await db.collection("products").find().toArray();
  socketServer.emit("productListUpdate", products);

  res.status(201).send("Producto agregado");
});

// Ruta para eliminar productos
app.post("/products/delete", async (req, res) => {
  const { name } = req.body;
  await db.collection("products").deleteOne({ name });

  const products = await db.collection("products").find().toArray();
  socketServer.emit("productListUpdate", products);

  res.status(200).send("Producto eliminado");
});
