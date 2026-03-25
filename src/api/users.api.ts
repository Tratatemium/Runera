import type { UserApiResponse, UserState } from "../types/users.types";

import { apiRequest } from "./client";
import { API } from "../config/apiConfig";

function getMe() {
  return apiRequest<UserApiResponse>(API.users.me, {
    method: "GET",
  });
}

function updateProfile(data: { profile: UserState["profile"] }) {
  return apiRequest(API.users.profile, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export { getMe, updateProfile };
