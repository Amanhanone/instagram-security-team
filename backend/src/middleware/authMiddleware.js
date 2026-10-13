const jwt = require("jsonwebtoken");
const {
  COOKIE_NAME,
} = require("../utils/authToken");

const {
  getUserById,
} = require("../services/authService");

async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.[COOKIE_NAME];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is missing");
    }

    const decoded = jwt.verify(token, secret);

    const user = await getUserById(decoded.sub);

    req.user = user;

    return next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired session",
      });
    }

    return next(error);
  }
}

module.exports = { requireAuth };