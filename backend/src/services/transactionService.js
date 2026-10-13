const Deposit = require("../models/Deposit");
const Withdrawal = require("../models/Withdrawal");

function validateAmount(amount) {
  if (
    amount === undefined ||
    amount === null ||
    amount === "" ||
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    const error = new Error("Enter a valid amount greater than zero");
    error.statusCode = 400;
    throw error;
  }
}

async function createDeposit(userId, data) {
  const { amount, referenceId,phoneNumber } = data;

  validateAmount(amount);

  if (
    typeof referenceId !== "string" ||
    !referenceId.trim()
  ) {
    const error = new Error("Reference ID is required");
    error.statusCode = 400;
    throw error;
  }

  const deposit = await Deposit.create({
    user: userId,
    phoneNumber: phoneNumber?.trim() || "",
    amount,
    referenceId: referenceId.trim(),
  });

  return deposit;
}

async function createWithdrawal(userId, data) {
  const { name, method, accountNumber, amount } = data;

  validateAmount(amount);

  if (typeof name !== "string" || name.trim().length < 2) {
    const error = new Error("Enter a valid account holder name");
    error.statusCode = 400;
    throw error;
  }

  if (!["Telebirr", "CBE"].includes(method)) {
    const error = new Error("Choose Telebirr or CBE");
    error.statusCode = 400;
    throw error;
  }

  if (
    typeof accountNumber !== "string" ||
    accountNumber.trim().length < 5
  ) {
    const error = new Error("Enter valid account information");
    error.statusCode = 400;
    throw error;
  }

  const withdrawal = await Withdrawal.create({
    user: userId,
    name: name.trim(),
    method,
    accountNumber: accountNumber.trim(),
    amount,
  });

  return withdrawal;
}

async function getMyTransactions(userId) {
  const [deposits, withdrawals] = await Promise.all([
    Deposit.find({ user: userId })
      .select("-referenceId")
      .sort({ createdAt: -1 })
      .lean(),

    Withdrawal.find({ user: userId })
      .select("-accountNumber")
      .sort({ createdAt: -1 })
      .lean(),
  ]);

  return { deposits, withdrawals };
}

module.exports = {
  createDeposit,
  createWithdrawal,
  getMyTransactions,
};