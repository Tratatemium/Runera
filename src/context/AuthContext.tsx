import type { AuthContextValue } from "../types/auth.types";
import type { UserState } from "../types/users.types";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import merge from "lodash/merge";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserState | null>(null);

  const loginUser = (user: UserState) => setUser(user);
  const logoutUser = () => setUser(null);
  const updateUser = (updates: Partial<UserState>) => {
    setUser((prev) => merge({}, prev, updates));
  };

  useEffect(() => {
    const handler = () => logoutUser();
    window.addEventListener("unauthorized", handler);
    return () => window.removeEventListener("unauthorized", handler);
  }, [logoutUser]);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuthContext };
