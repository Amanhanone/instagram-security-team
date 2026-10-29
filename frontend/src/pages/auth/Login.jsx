import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Camera } from "lucide-react";
import { authService } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const phone = form.phone.trim();
    const password = form.password;

    if (!phone) {
      setError("Please enter your mobile number.");
      return;
    }

    if (!password || password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      await authService.login({ phone, password });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to continue. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#121212] text-[#f5f5f5] flex flex-col justify-between items-center px-4 py-8 select-none">
      
      {/* Top Language Selector */}
      <div className="w-full max-w-xs text-center">
        <button
          type="button"
          className="text-xs text-[#a8a8a8] hover:text-white transition py-1"
        >
          English (US) ▾
        </button>
      </div>

      {/* Center Container */}
      <div className="w-full max-w-xs flex-1 flex flex-col justify-center items-center space-y-6">
        
        {/* Brand Icon / Logo */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white shadow-lg">
            <Camera size={40} strokeWidth={1.8} />
          </div>
          <h1 className="text-2xl font-semibold tracking-wider font-serif">Instagram</h1>
        </div>

        {/* Error Notification */}
        {error && (
          <div role="alert" className="w-full p-3 text-xs text-red-400 bg-red-950/40 border border-red-900 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-3">
          <div className="mt-4"> 
            <input
              id="phone"
              name="phone"
              type="text"
              autoComplete="username"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="w-full bg-[#262626] border border-[#363636] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#a8a8a8] placeholder:text-[#8e8e8e] transition"
            />
          </div>

          <div className="relative mt-4">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-[#262626] border border-[#363636] rounded-xl px-4 py-3 pr-10 text-sm text-white outline-none focus:border-[#a8a8a8] placeholder:text-[#8e8e8e] transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a8a8a8] hover:text-white transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-30 rounded-xl bg-[#0095f6] hover:bg-[#1877f2] px-4 py-3 text-sm font-semibold text-white transition disabled:opacity-50 shadow-md"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center">
          <Link
            to="/forgot-password"
            className="text-xs text-[#e0e0e0] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      {/* Bottom Footer / Sign Up */}
      <div className="w-full max-w-xs pt-6 pb-2 text-center space-y-4">
        <Link
          to="/register"
          className="flex w-full items-center justify-center rounded-xl border border-[#363636] bg-transparent px-4 py-3 text-xs font-semibold text-[#0095f6] hover:bg-[#262626]/40 transition"
        >
          Create new account
        </Link>

        {/* Meta Branding Footer */}
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold tracking-widest text-[#737373] pt-2">
          <span>∞</span>
          <span>Meta</span>
        </div>
      </div>

    </main>
  );
}