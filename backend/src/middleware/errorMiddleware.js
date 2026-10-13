function errorMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err.message);

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "An account with this phone number already exists",
    });
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");

    return res.status(400).json({
      success: false,
      message,
    });
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message:
      err.statusCode && err.statusCode < 500
        ? err.message
        : "Internal server error",
  });
}

module.exports = errorMiddleware;