
import { MongoClient } from "mongodb";
import config from "./config.js";

const mongoURL = config.MONGO_URL;
const client = new MongoClient(mongoURL);

let db;

export async function connectToMongo() {
  try {
    await client.connect();
    console.log("Conexión a MongoDB exitosa");
    db = client.db("nombreDeTuBaseDeDatos");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
  }
}

export function getDb() {
  if (!db) throw new Error("La base de datos no está inicializada.");
  return db;
}
