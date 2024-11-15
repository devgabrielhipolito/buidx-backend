import mongoose from "mongoose";
import { UserModel } from "../models/UserModel";
import dotenv from "dotenv";
dotenv.config();

const dbUSer = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const url: string = `mongodb+srv://${dbUSer}:${dbPass}@cluster0.b9soz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";`;

export const runDb = () => {
  mongoose
    .connect(url)
    .then(() => console.log("Banco conectado"))
    .catch((error) =>
      console.log("Falha ao conectar com o banco", error.message)
    );
};
