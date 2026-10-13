import { apiRequest } from "./api";

export const adminService = {
  getUsers() {
    return apiRequest("/zplaybet.bet/newone/admin/users");
  },

  getDeposits() {
    return apiRequest("/zplaybet.bet/newone/admin/deposits");
  },

  getWithdrawals() {
    return apiRequest("/zplaybet.bet/newone/admin/withdrawals");
  },
};