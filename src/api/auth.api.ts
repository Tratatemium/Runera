import { apiRequest } from "./client";

interface SignupData {
  username: string;
  email: string;
  password: string;
}

function signup(data: SignupData) {
  return apiRequest("https://runners-api-lac.vercel.app/api/v1/auth/signup", {
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

function login(data: LoginData) {
  return apiRequest("https://runners-api-lac.vercel.app/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export { signup, login };
