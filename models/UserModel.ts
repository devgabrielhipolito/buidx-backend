import mongoose, { model, Schema } from "mongoose";

interface IUserModel {
  name: string;
  email: string;
  password: string;
  permission: string;
  _id: number;
}

const UserSchema = new Schema<IUserModel>({
  name: String,
  email: String,
  password: String,
  permission: String,
  _id: Number,
});

export const UserModel = model("users", UserSchema);
