import type { UserState, UserApiResponse } from "../types/users.types";

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

export { mapUserResponseToState };
