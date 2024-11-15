import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel";

const authRoutes = express.Router();
const router = authRoutes;
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

export default authRoutes;
