const express = require("express");

const {
  submitDeposit,
  submitWithdrawal,
  getTransactions,
} = require("../controllers/transactionController");

const {
  requireAuth,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Public endpoints: no login required.
router.post("/deposits", submitDeposit);
router.post("/withdrawals", submitWithdrawal);

// Private endpoint: login required.
router.get("/me", requireAuth, getTransactions);

module.exports = router;