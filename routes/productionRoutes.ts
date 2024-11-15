import express, { Request, Response } from "express";
import { productionModel } from "../models/ProductionModel";
import authRoutes from "./AuthRoutes";

const productionRoutes = express.Router();
const router = authRoutes;

const generateId = () => {
  return Math.floor(Math.random() * 3000);
};

router.post(
  "/production/updateTask/:_id",
  async (req: Request, res: Response): Promise<any> => {
    const id = req.params._id;
    const { status } = req.body;

    await productionModel.updateOne({ _id: id }, { status: status });
    const alldate = await productionModel.find();
    return res.status(201).json({ data: alldate });
  }
);

router.post(
  "/production/create",
  async (req: Request, res: Response): Promise<any> => {
    const dataAtual = new Date();
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(dataAtual);

    const { marca, modelo, funcionario, portas, supervisor, prazo, status } =
      req.body.data;

    let new_production = new productionModel({
      marca,
      modelo,
      funcionario,
      supervisor,
      portas,
      prazo,
      criado: dataFormatada,
      status: "Em produção",
      _id: generateId(),
    });
    try {
      await new_production.save();

      // Buscar a lista atualizada após salvar o novo documento
      const allDate = await productionModel.find();
      console.log(new_production);
      return res.status(201).json({ data: allDate });
    } catch (error) {
      return res.status(500).json({ status: error });
    }
  }
);

export default productionRoutes;
