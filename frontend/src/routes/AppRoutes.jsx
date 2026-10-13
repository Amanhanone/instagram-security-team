import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Deposits from "../pages/dashboard/Deposits";
import Withdrawals from "../pages/dashboard/Withdrawals";
import Transactions from "../pages/dashboard/Transactions";
import AdminDashboard from "../pages/admin/AdminDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Intentionally unprotected for now */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/deposit" element={<Deposits />} />
      <Route path="/withdraw" element={<Withdrawals />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/admin123321" element={<AdminDashboard />} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}