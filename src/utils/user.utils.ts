import type { UserState, UserApiResponse } from "../types/users.types";
import { normalizeDate } from "./normalize.utils";

const mapUserResponseToState = (data: UserApiResponse): UserState => ({
  account: {
    email: data.userData.account.email,
    username: data.userData.account.username,
  },
  profile: {
    firstName: data.userData.profile.firstName,
    lastName: data.userData.profile.lastName,
    dateOfBirth: data.userData.profile.dateOfBirth,
    heightCm: data.userData.profile.heightCm,
    weightKg: data.userData.profile.weightKg,
  },
  role: data.userData.role,
});

const accountKeys = ["email", "username"] as const;
const profileKeys = [
  "firstName",
  "lastName",
  "dateOfBirth",
  "heightCm",
  "weightKg",
] as const;

type UserAccountKey = (typeof accountKeys)[number];
type UserProfileKey = (typeof profileKeys)[number];
type UserKey = UserAccountKey | UserProfileKey;

function normalizeUserValue(value: string | number | undefined): string {
  return value == null ? "" : String(value);
}

function getUserData(user: UserState | null) {
  if (!user) return undefined;

  return {
    ...user.account,
    ...user.profile,
  };
}

function normalizeProfile(profile: UserState["profile"]): UserState["profile"] {
  const normalized = { ...profile };

  if (normalized.dateOfBirth) {
    normalized.dateOfBirth = normalizeDate(normalized.dateOfBirth);
  }

  return normalized;
}

function normalizeUserResponse(data: UserApiResponse): UserApiResponse {
  const normalized: UserApiResponse = {
    ...data,
    userData: {
      ...data.userData,
      profile: data.userData.profile
        ? normalizeProfile(data.userData.profile)
        : data.userData.profile,
    },
  };

  return normalized;
}

export type { UserKey };
export {
  mapUserResponseToState,
  getUserData,
  normalizeProfile,
  normalizeUserResponse,
};
