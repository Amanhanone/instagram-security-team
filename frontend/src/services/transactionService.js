
import { apiRequest } from "./api";

export const transactionService = {
  getMyTransactions() {
    return apiRequest("/transactions/me");
  },

  createDeposit(depositData) {
    return apiRequest("/transactions/deposits", {
      method: "POST",
      body: JSON.stringify(depositData),
    });
  },

  createWithdrawal(withdrawalData) {
    return apiRequest("/transactions/withdrawals", {
      method: "POST",
      body: JSON.stringify(withdrawalData),
    });
  },
};
