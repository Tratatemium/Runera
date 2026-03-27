import type {
  SignupData,
  SignupResponse,
  LoginData,
  LoginResponse,
} from "../types/auth.types";

import { apiRequest } from "./client";
import { API } from "../config/apiConfig";

function signup(data: SignupData) {
  return apiRequest<SignupResponse>({
    path: API.auth.signup,
    assertData: false,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  });
}

function login(data: LoginData) {
  return apiRequest<LoginResponse>({
    path: API.auth.login,
    assertData: false,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  });
}

function logout() {
  return apiRequest<LoginResponse>({
    path: API.auth.logout,
    assertData: false,
    options: {
      method: "POST",
    },
  });
}

export { signup, login, logout };
