
const express = require("express");

const {
  getUsers,
  getDeposits,
  getWithdrawals,
} = require("../controllers/adminController");

const router = express.Router();

// Local learning only: these endpoints have no authentication.
router.get("/users", getUsers);
router.get("/deposits", getDeposits);
router.get("/withdrawals", getWithdrawals);

module.exports = router;
