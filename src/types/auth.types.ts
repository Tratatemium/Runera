import type { UserState } from "./users.types";

interface SignupData {
  username: string;
  email: string;
  password: string;
}

interface SignupResponse {
  userId: string;
}

interface LoginData {
  username?: string;
  email?: string;
  password: string;
}

type LoginResponse = void;

interface AuthContextValue {
  user: UserState | null;
  login: (user: UserState) => void;
  logout: () => void;
}

export type {
  SignupData,
  SignupResponse,
  LoginData,
  LoginResponse,
  AuthContextValue,
};
