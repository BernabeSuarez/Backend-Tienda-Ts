import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  encryptPass(password: string): Promise<string>;
  validatePass(password: string): boolean;
}

const user = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

user.methods.encryptPass = async function (password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

user.methods.validatePass = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compareSync(password, this.password); // Compara el hash de las passwords
};

const User = model<IUser>("user", user);

export default User;
