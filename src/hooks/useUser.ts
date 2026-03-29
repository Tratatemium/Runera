import type { UpdateUserPayload } from "../types/users.types";

import * as usersApi from "../api/users.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { handleApiFormError } from "../utils/api.utils";
import { normalizeProfile } from "../utils/user.utils";

interface UseUserReturn {
  isFetching: boolean;
  formError: string | undefined;
  updateProfile: (
    payload: UpdateUserPayload,
  ) => Promise<Record<string, string> | undefined>;
}

function useUser(): UseUserReturn {
  const navigate = useNavigate();
  const { updateUser } = useAuthContext();

  const [isFetching, setIsFetching] = useState(false);
  const [formError, setFormError] = useState<string | undefined>(undefined);

  async function updateProfile(
    payload: UpdateUserPayload,
  ): Promise<Record<string, string> | undefined> {
    setIsFetching(true);
    setFormError(undefined);

    try {
      const response = await usersApi.updateProfile(payload);
      const updateFields = normalizeProfile(response.savedProfile);
      updateUser({ profile: updateFields });
      navigate("/user/info");
    } catch (err) {
      const fieldErrors = handleApiFormError(err, setFormError);
      if (fieldErrors) return fieldErrors;
    } finally {
      setIsFetching(false);
    }
  }

  return { isFetching, formError, updateProfile };
}

export { useUser };
