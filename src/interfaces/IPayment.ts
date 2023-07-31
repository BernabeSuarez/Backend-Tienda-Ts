export interface IPayment extends Document {
  title: string;
  currency_id: string;
  unit_price: number;
  quantity: number;
  description: string;
  category_id: string;
}
