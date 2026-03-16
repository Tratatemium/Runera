function validateUsername(username: string) {
  const length = username.length
  if (length < 4) {
    return "Username must be at least 4 characters.";
  }
  if (length > 20) {
    return "Username cannot exceed 20 characters.";
  }
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return "Username can only contain letters, numbers, and underscores.";
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
  const length = login.length;
  if (length < 4) {
    return "At least 4 characters.";
  }
  if (length > 128) {
    return "Max 254 characters.";
  }
}

export { validateUsername, validateEmail, validatePassword, validateConfirmPassword, validateLogin };
