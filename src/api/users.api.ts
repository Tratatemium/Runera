import type {
  UserState,
  UserApiResponse,
  UserUpdateResponse,
} from "../types/users.types";

import { apiRequest } from "./client";
import { API } from "../config/apiConfig";
import { ResponseError } from "../errors/errors";

function getMe() {
  return apiRequest<UserApiResponse>({
    path: API.users.me,
    assertData: true,
    options: {
      method: "GET",
    },
  });
}

function updateProfile(data: { profile: UserState["profile"] }) {
  return apiRequest<UserUpdateResponse>({
    path: API.users.profile,
    assertData: true,
    options: {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  });
}

export { getMe, updateProfile };
