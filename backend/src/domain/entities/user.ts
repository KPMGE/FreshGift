import { Gift } from "./gift";

export type User = {
  id: string;
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  savedGifts: Gift[];
};
