import type { SignupData, LoginData } from "../types/auth.types";
import { ApiError } from "../errors/errors";

import * as authApi from "../api/auth.api";
import * as usersApi from "../api/users.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { mapUserResponseToState } from "../utils/user.utils";

interface UseAuthReturn {
  signup: (payload: SignupData) => Promise<void>;
  login: (payload: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  isFetching: boolean;
  fieldError: Record<string, string> | undefined;
  formError: string | undefined;
}

function useAuth(): UseAuthReturn {
  const navigate = useNavigate();
  const { loginUser, logoutUser } = useAuthContext();

  const [isFetching, setIsFetching] = useState(false);
  const [fieldError, setFieldError] = useState<
    Record<string, string> | undefined
  >(undefined);
  const [formError, setFormError] = useState<string | undefined>(undefined);

  async function signup(payload: SignupData) {
    setIsFetching(true);
    setFieldError(undefined);
    setFormError(undefined);

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

  async function login(payload: LoginData) {
    logoutUser();
    setIsFetching(true);
    setFieldError(undefined);
    setFormError(undefined);

    try {
      await authApi.login(payload);
      const userData = await usersApi.getMe();
      loginUser(mapUserResponseToState(userData));
      navigate("/user/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.code, err.message);
        setFormError(err.message);
      } else {
        console.error("Unexpected error", err);
        setFormError("Something went wrong.");
      }
    } finally {
      setIsFetching(false);
    }
  }

  async function logout() {
    try {
      await authApi.logout();
    } catch (err) {
      console.error("Failed to log out via API: ", err);
    } finally {
      logoutUser();
      navigate("/", { replace: true });
    }
  }

  return { signup, login, logout, isFetching, fieldError, formError };
}

export { useAuth };
