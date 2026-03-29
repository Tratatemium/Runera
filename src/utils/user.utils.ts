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

function isAccountKey(key: UserKey): key is UserAccountKey {
  return accountKeys.includes(key as UserAccountKey);
}

function isProfileKey(key: UserKey): key is UserProfileKey {
  return profileKeys.includes(key as UserProfileKey);
}

function getUserValue(user: UserState, key: UserKey) {
  if (isAccountKey(key)) {
    return user.account[key];
  }
  if (isProfileKey(key)) {
    return user.profile[key];
  }
}

function normalizeProfile(profile: UserState["profile"]): UserState["profile"] {
  const normalized = { ...profile };

  if (normalized.dateOfBirth) {
    normalized.dateOfBirth = normalizeDate(normalized.dateOfBirth);
  }

  return normalized;
}

function normalizeUserResponse(data: UserApiResponse): UserApiResponse {
  const normalized = { ...data };

  if (normalized.userData.profile) {
    normalized.userData.profile = normalizeProfile(normalized.userData.profile);
  }

  return normalized;
}

export type { UserKey };
export {
  mapUserResponseToState,
  getUserValue,
  normalizeProfile,
  normalizeUserResponse,
};
