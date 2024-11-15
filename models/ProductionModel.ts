import mongoose, { model, Schema } from "mongoose";

enum TypeStatus {
  "Em produção",
  "Cancelado",
  "Finalizado",
}
interface IproductionModel {
  marca: string;
  modelo: string;
  funcionario: string[];
  supervisor: string;
  prazo: string;
  portas: string;
  criado: string;
  status: string;
  _id: number;
}

const productionSchema = new Schema<IproductionModel>({
  marca: String,
  modelo: String,
  funcionario: [String],
  supervisor: String,
  portas: String,
  prazo: String,
  criado: String,
  status: String,
  _id: Number,
});

export const productionModel = model("production", productionSchema);
