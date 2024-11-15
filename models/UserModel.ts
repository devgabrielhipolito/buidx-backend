import mongoose, { model, Schema } from "mongoose";

interface IUserModel {
  name: string;
  email: string;
  password: string;
  permission;
}

const UserSchema = new Schema<IUserModel>({
  name: String,
  email: String,
  password: String,
  permission: String,
});

export const UserModel = model("users", UserSchema);
