function validateUsername(username: string) {
  if (username.length < 4 || username.length > 20) {
    return "Username must be 4-20 chars.";
  }
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return "Use letters, numbers, or _.";
  }
}

function validateEmail(email: string) {
  if (email.length > 254) {
    return "Email is too long.";
  }
  if (/\s/.test(email)) {
    return "No spaces in email.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Enter a valid email.";
  }
}

function validatePassword(password: string) {
  const length = password.length;
  if (length < 8) {
    return "At least 8 characters.";
  }
  if (length > 128) {
    return "Max 128 characters.";
  }
}

function validateConfirmPassword(password:string, confirm?:string) {
  if (password !== confirm) {
    return "Passwords do not match."
  }
}

function validateLogin(login: string) {
  return undefined
}

export { validateUsername, validateEmail, validatePassword, validateConfirmPassword, validateLogin };
