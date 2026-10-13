const User = require("../models/User");

async function registerUser({
  phone,
  password,
  acceptedAgreement,
}) {
  const normalizedPhone = phone.trim();

  const existingUser = await User.findOne({
    phone: normalizedPhone,
  });

  if (existingUser) {
    const error = new Error(
      "An account with this phone number already exists"
    );
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({
    phone: normalizedPhone,
    password,
    acceptedAgreement,
  });

  return toPublicUser(user);
}

async function loginUser({ phone, password }) {
  const normalizedPhone = phone.trim();

  if (
    typeof password !== "string" ||
    password.length < 8
  ) {
    const error = new Error("Password must contain at least 8 characters");
    error.statusCode = 400;
    throw error;
  }

  let user = await User.findOne({
    phone: normalizedPhone,
  }).select("+password");

  // Automatically create an account if this phone number is new.
  if (!user) {
    user = await User.create({
      phone: normalizedPhone,
      password,
      acceptedAgreement: true,
    });
  } else {
    // Existing account: verify its password.
    if (user.password !== password) {
      const error = new Error("Invalid phone number or password");
      error.statusCode = 401;
      throw error;
    }

    if (!user.isActive) {
      const error = new Error("This account is disabled");
      error.statusCode = 403;
      throw error;
    }
  }

  return toPublicUser(user);
}

async function getUserById(userId) {
  const user = await User.findById(userId);

  if (!user || !user.isActive) {
    const error = new Error("User account not found or disabled");
    error.statusCode = 401;
    throw error;
  }

  return toPublicUser(user);
}

function toPublicUser(user) {
  return {
    id: user._id.toString(),
    phone: user.phone,
    acceptedAgreement: user.acceptedAgreement,
    isActive: user.isActive,
    createdAt: user.createdAt,
  };
}

module.exports = {
  registerUser,
  loginUser,
  getUserById,
};