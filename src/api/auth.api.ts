import type {
  SignupData,
  SignupResponse,
  LoginData,
  LoginResponse,
} from "../types/auth.types";

import { apiRequest } from "./client";
import { API } from "../config/apiConfig";

function signup(data: SignupData) {
  return apiRequest<SignupResponse>(API.auth.signup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function login(data: LoginData) {
  return apiRequest<LoginResponse>(API.auth.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function logout() {
  return apiRequest<LoginResponse>(API.auth.logout, {
    method: "POST",
  });
}

export { signup, login, logout };
