import type { UserData } from "../types/users.types";

import { apiRequest } from "./client";
import { API } from "../config/api.config";

function getMe() {
  return apiRequest<UserData>(API.users.me, {
    method: "GET",
  });
}

export { getMe };
