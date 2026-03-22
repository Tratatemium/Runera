import type {
  SignupData,
  SignupResponse,
  LoginData,
  LoginResponse,
} from "../types/auth.types";

import { apiRequest } from "./client";
import { API } from "../config/apiConfig";

function signupApi(data: SignupData) {
  return apiRequest<SignupResponse>(API.auth.signup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function loginApi(data: LoginData) {
  return apiRequest<LoginResponse>(API.auth.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export { signupApi, loginApi };
