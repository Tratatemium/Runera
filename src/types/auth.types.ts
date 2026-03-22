import type { UserState } from "./users.types";

interface SignupData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  username?: string;
  email?: string;
  password: string;
}

interface AuthContextValue {
  user: UserState | null;
  login: (user: UserState) => void;
  logout: () => void;
}

export type { SignupData, LoginData, AuthContextValue };
