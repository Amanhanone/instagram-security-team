function validateRegister(data) {
  const { phone, password, confirmPassword, acceptedAgreement } = data;

  if (!phone || typeof phone !== "string") {
    return "Phone number is required";
  }

  const normalizedPhone = phone.trim();

  if (normalizedPhone.length < 7 || normalizedPhone.length > 20) {
    return "Phone number must be between 7 and 20 characters";
  }

  if (!password || typeof password !== "string") {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must contain at least 8 characters";
  }

  if (confirmPassword !== password) {
    return "Passwords do not match";
  }

  if (acceptedAgreement !== true) {
    return "You must accept the agreement";
  }

  return null;
}

function validateLogin(data) {
  const { phone, password } = data;

  if (!phone || typeof phone !== "string" || !phone.trim()) {
    return "Phone number is required";
  }

  if (!password || typeof password !== "string") {
    return "Password is required";
  }

  return null;
}

module.exports = {
  validateRegister,
  validateLogin,
};