import type { User } from "@/types/user";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};
