import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel";

const userRoutes = express.Router();
const router = userRoutes;

const generateId = () => {
  return Math.floor(Math.random() * 3000);
};

router.post(
  "/users/createuser",
  async (req: Request, res: Response): Promise<any> => {
    const { email, name, password, permission } = req.body;

    const emailExists = await UserModel.findOne({ email: email });

    if (emailExists) {
      return res
        .status(201)
        .json({ message: "Ja existe um usuário com este email" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      email: email,
      name: name,
      password: passwordHash,
      permission: permission,
      _id: generateId(),
    });

    const allUsers = await UserModel.find();

    try {
      await newUser.save();
      console.log(allUsers);
      return res
        .status(200)
        .json({ message: "Usuario criado com sucesso", allUsers });
    } catch (error) {
      return res.status(201).json({ message: "Usuario não criado" });
    }
  }
); 

router.delete(
  "/users/delete/:id",
  async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;

    const tabela = await UserModel.deleteOne({ _id: id });
    const allUsers = await UserModel.find();
    if (tabela.deletedCount) {
      return res.status(201).json({ allUsers, message: "Usuário deletado" });
    }
    return res.status(500).json({ message: "usuário não deletado" });
  }
);

export default userRoutes;
