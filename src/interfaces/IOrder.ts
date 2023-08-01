import { IUser } from "./IUser";
import { IProduct } from "./IProduct";

export interface IOrder extends Document {
  user: IUser;
  cart: IProduct[];
  price: number;
  created_at: Date;
}
