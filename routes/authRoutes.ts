import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel";

const authRoutes = express.Router();
const router = authRoutes;

const generateId = () => {
  return Math.floor(Math.random() * 3000);
};

router.post("/auth", async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (!email || !password) {
    return res.status(400).json({ error: "Email e senhas são obrigatorios" });
  }

  if (!user) {
    return res.status(400).json({ error: "Email não existe" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.json({ error: "Senha incorreta" });
  }
  try {
    const { permission, name, email } = user;
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user.id,
      },
      secret
    );
    res
      .status(200)
      .json({ status: "autenticado", token, permission, name, email });

    // const saveUser = await UserModel({ email, password });
  } catch (error) {
    res.status(500).json({ error: "Error, tente novamente mais tarde" });
  }
});

router.post(
  "/auth/createuser",
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
      return res.status(201).json({ message: "Deu algum erro" });
    }
  }
);

export default authRoutes;
