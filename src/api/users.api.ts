import type {
  UserState,
  UserApiResponse,
  UserUpdateResponse,
} from "../types/users.types";

import { apiRequest } from "./client";
import { API } from "../config/apiConfig";
import { ResponseError } from "../errors/errors";

async function getMe() {
  const result =  await apiRequest<UserApiResponse>(API.users.me, {
    method: "GET",
  });
  if (!result) throw new ResponseError("Empty responce from server.")
  return result;
}

function updateProfile(data: { profile: UserState["profile"] }) {
  return apiRequest<UserUpdateResponse>(API.users.profile, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export { getMe, updateProfile };
