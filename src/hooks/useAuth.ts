import { useState } from "react";
import * as authApi from "../api/auth.api";
import { SignupData } from "../types/auth.types";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../api/errors";

interface UseAuthReturn {
  signup: (payload: SignupData) => Promise<void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isFetching: boolean;
  fieldError: Record<string, string> | undefined;
  formError: string | undefined;
}

function useAuth(): UseAuthReturn {
  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(false);
  const [fieldError, setFieldError] = useState<
    Record<string, string> | undefined
  >(undefined);
  const [formError, setFormError] = useState<string | undefined>(undefined);

  async function signup(payload: SignupData) {
    setFieldError(undefined);
    setFormError(undefined);
    setIsFetching(true);
    try {
      await authApi.signup(payload);
      navigate("/login");
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.code, err.message);

        if (err.field) setFieldError({ [err.field]: err.message });
        else setFormError(err.message);
      } else {
        console.error("Unexpected error", err);
        setFormError("Something went wrong.");
      }
    } finally {
      setIsFetching(false);
    }
  }

  async function login() {}
  async function logout() {}

  return { signup, login, logout, isFetching, fieldError, formError };
}

export { useAuth };
