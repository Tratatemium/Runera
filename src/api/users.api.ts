import type { UserApiResponse } from "../types/users.types";

import { apiRequest } from "./client";
import { API } from "../config/apiConfig";

function getMe() {
  return apiRequest<UserApiResponse>(API.users.me, {
    method: "GET",
  });
}

export { getMe };
