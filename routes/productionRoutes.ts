import express, { Request, Response } from "express";
import { productionModel } from "../models/ProductionModel";
import authRoutes from "./AuthRoutes";

const productionRoutes = express.Router();
const router = authRoutes;

const generateId = () => {
  return Math.floor(Math.random() * 3000);
};

router.post(
  "/production/updateTask/:id",
  async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const { status, marca, modelo } = req.body;
    await productionModel.updateOne(
      { _id: id },
      {
        status: status,
        marca: marca,
        modelo: modelo,
      }
    );
    const alldate = await productionModel.find();
    return res.status(201).json({ data: alldate });
  }
);

router.delete(
  "/production/delete/:id",
  async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;

    const tabela = await productionModel.deleteOne({ _id: id });
    const alldate = await productionModel.find();
    if (tabela.deletedCount) {
      return res.status(201).json({ data: alldate, status: "ok" });
    }
    return res
      .status(500)
      .json({ data: alldate, message: "Tabela não deletada" });
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
      return res.status(201).json({ data: allDate, status: "Ok" });
    } catch (error) {
      return res.status(500).json({ status: error });
    }
  }
);

export default productionRoutes;
