import type { AuthContextValue } from "../types/auth.types";
import type { UserState } from "../types/users.types";

import { createContext, ReactNode, useContext, useState } from "react";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserState | null>(null);

  const login = (user: UserState) => setUser(user);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
