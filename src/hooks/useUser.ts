import { ApiError } from "../errors/errors";

import * as usersApi from "../api/users.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { mapUserResponseToState } from "../utils/user.utils";

interface UseUserReturn {
      signup: (payload: SignupData) => Promise<Record<string, string> | undefined>;
  login: (payload: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  isFetching: boolean;
  fieldError: Record<string, string> | undefined;
  formError: string | undefined;
}