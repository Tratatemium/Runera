import { apiRequest } from "./client";
import { API } from "./api.config";

interface SignupData {
  username: string;
  email: string;
  password: string;
}
interface JwtTokenPayload {
  userId: string;
  role: string;
  username: string;
  email: string;
  accessTokenVersion: number;
  iat: number;
  exp: number;
  iss: string;
}
interface LoginResponse {
  token: string;
  expiresIn: string;
}

function signupApi(data: SignupData) {
  return apiRequest(API.auth.signup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

interface LoginData {
  username?: string;
  email?: string;
  password: string;
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
export type { LoginResponse, JwtTokenPayload };
