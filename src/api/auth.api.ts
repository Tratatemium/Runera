import type { SignupData, LoginData } from "../types/auth.types";

import { apiRequest } from "./client";
import { API } from "../config/api.config";

function signupApi(data: SignupData) {
  return apiRequest(API.auth.signup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function loginApi(data: LoginData) {
  return apiRequest(API.auth.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export { signupApi, loginApi };
