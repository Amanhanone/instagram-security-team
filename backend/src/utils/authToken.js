const jwt = require("jsonwebtoken");

const COOKIE_NAME = "zplaybet_token";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

function createAuthToken(userId) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing from environment variables");
  }

  return jwt.sign(
    { sub: userId },
    secret,
    { expiresIn: "7d" }
  );
}

function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  };
}

function getClearCookieOptions() {
  const { httpOnly, secure, sameSite, path } = getCookieOptions();

  return {
    httpOnly,
    secure,
    sameSite,
    path,
  };
}

module.exports = {
  COOKIE_NAME,
  createAuthToken,
  getCookieOptions,
  getClearCookieOptions,
};