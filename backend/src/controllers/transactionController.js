
const {
  createDeposit,
  createWithdrawal,
  getMyTransactions,
} = require("../services/transactionService");

async function submitDeposit(req, res, next) {
  try {
    const deposit = await createDeposit(null, req.body);

    return res.status(201).json({
      success: true,
      message: "Deposit request submitted for review",
      deposit: {
        id: deposit._id,
        amount: deposit.amount,
        status: deposit.status,
        createdAt: deposit.createdAt,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function submitWithdrawal(req, res, next) {
  try {
    const withdrawal = await createWithdrawal(null, req.body);

    return res.status(201).json({
      success: true,
      message: "Withdrawal request submitted for review",
      withdrawal: {
        id: withdrawal._id,
        amount: withdrawal.amount,
        method: withdrawal.method,
        status: withdrawal.status,
        createdAt: withdrawal.createdAt,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function getTransactions(req, res, next) {
  try {
    const transactions = await getMyTransactions(req.user.id);

    return res.status(200).json({
      success: true,
      ...transactions,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  submitDeposit,
  submitWithdrawal,
  getTransactions,
};
