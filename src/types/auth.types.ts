interface SignupData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  username?: string;
  email?: string;
  password: string;
}

export type { SignupData, LoginData };
