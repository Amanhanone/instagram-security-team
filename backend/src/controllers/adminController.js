const User = require("../models/User");
const Deposit = require("../models/Deposit");
const Withdrawal = require("../models/Withdrawal");

async function getUsers(req, res, next) {
  try {
    // Explicitly add +password to the select string to override select: false in the schema
    const users = await User.find({})
      .select("phone acceptedAgreement isActive createdAt +password")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return next(error);
  }
}

async function getDeposits(req, res, next) {
  try {
    // Correct Mongoose populate syntax: space-separated fields in a single string
    // Include +password inside the select parameter
    const deposits = await Deposit.find({})
      .populate({
        path: "user",
        select: "phone password +password" 
      })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: deposits.length,
      deposits,
    });
  } catch (error) {
    return next(error);
  }
}

async function getWithdrawals(req, res, next) {
  try {
    // Correct Mongoose populate syntax: space-separated fields in a single string
    // Include +password inside the select parameter
    const withdrawals = await Withdrawal.find({})
      .populate({
        path: "user",
        select: "phone password +password"
      })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: withdrawals.length,
      withdrawals,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUsers,
  getDeposits,
  getWithdrawals,
};
