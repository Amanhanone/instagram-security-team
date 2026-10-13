const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");

const {
  registerUser,
  loginUser,
} = require("../services/authService");

const {
  COOKIE_NAME,
  createAuthToken,
  getCookieOptions,
  getClearCookieOptions,
} = require("../utils/authToken");

async function register(req, res, next) {
  try {
    const validationError = validateRegister(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const user = await registerUser(req.body);
    const token = createAuthToken(user.id);

    res.cookie(COOKIE_NAME, token, getCookieOptions());

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user,
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const validationError = validateLogin(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const user = await loginUser(req.body);
    const token = createAuthToken(user.id);

    res.cookie(COOKIE_NAME, token, getCookieOptions());

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    return next(error);
  }
}

function logout(req, res) {
  res.clearCookie(COOKIE_NAME, getClearCookieOptions());

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
}

function getMe(req, res) {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
}

module.exports = {
  register,
  login,
  logout,
  getMe,
};