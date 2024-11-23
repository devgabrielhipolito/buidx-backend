import express from "express";
import cors, { CorsOptions } from "cors";
import { runDb } from "./db/connect";
import authRoutes from "./routes/AuthRoutes";
import productionRoutes from "./routes/productionRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
const port = 3000;

const corsOpt: CorsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOpt));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/v1", authRoutes);
app.use("/api/v1/", productionRoutes);
app.use("/api/v1/", userRoutes);

app.listen(port, () => {
  runDb();
  console.log("Servidor rodando na porta", port);
});
