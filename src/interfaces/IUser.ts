export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  encryptPass(password: string): Promise<string>;
  validatePass(password: string): boolean;
  _id: string;
  save(): string;
}
