import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  X,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import { authService } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
    acceptedAgreement: false,
  });

  const [currency, setCurrency] = useState("ETB");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!form.acceptedAgreement) {
      setError("Please accept the terms to continue.");
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        phone: form.phone.trim(),
        password: form.password,
        acceptedAgreement: form.acceptedAgreement,
      });

      navigate("/login", {
        replace: true,
        state: {
          message: "Account created successfully. Please sign in.",
        },
      });
    } catch (err) {
      setError(err.message || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#0d0f17] text-white">
      <section className="w-full min-h-screen sm:min-h-0 sm:max-w-md sm:rounded-2xl bg-[#161a25] p-4 sm:p-6 shadow-2xl border-0 sm:border border-white/5 flex flex-col justify-between sm:justify-start">
        
        <div>
          {/* Top Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <h2 className="text-sm font-bold tracking-wider text-gray-300 uppercase">
              REGISTRATION
            </h2>
            <Link
              to="/"
              aria-label="Close"
              className="text-gray-400 hover:text-white transition"
            >
              <X size={20} />
            </Link>
          </div>

          {/* Logo / Brand Header */}
          <div className="mb-6 text-center">
            <span className="text-lg font-black tracking-widest bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-300 bg-clip-text text-transparent">
              ZPLAY
            </span>
          </div>

          {/* API error */}
          {error && (
            <div
              role="alert"
              className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Mobile Number */}
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-xs font-semibold text-gray-400"
              >
                Mobile Number *
              </label>

              <div className="flex items-center rounded-xl bg-[#1e2330] border border-white/10 focus-within:border-[#00c853] overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-3 bg-[#242b3c] border-r border-white/10 text-xs font-medium text-gray-200">
                  <span className="text-base">🇪🇹</span>
                  <span>+251</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </div>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Number format 9xxx..."
                  className="min-w-0 flex-1 bg-transparent px-3.5 py-3 text-sm text-white outline-none placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Currency Select */}
            <div>
              <label
                htmlFor="currency"
                className="mb-1.5 block text-xs font-semibold text-gray-400"
              >
                Currency
              </label>
              <div className="relative">
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full appearance-none rounded-xl bg-[#1e2330] border border-white/10 px-3.5 py-3 text-sm text-white outline-none focus:border-[#00c853]"
                >
                  <option value="ETB" className="bg-[#1e2330] text-white">ETB</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold text-gray-400"
              >
                Password *
              </label>

              <div className="flex items-center rounded-xl bg-[#1e2330] border border-white/10 px-3.5 py-3 focus-within:border-[#00c853]">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-gray-400 transition hover:text-white pl-2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-xs font-semibold text-gray-400"
              >
                Confirm Password *
              </label>

              <div className="flex items-center rounded-xl bg-[#1e2330] border border-white/10 px-3.5 py-3 focus-within:border-[#00c853]">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your Password"
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  className="text-gray-400 transition hover:text-white pl-2"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* reCAPTCHA Box */}
            <div className="flex items-center justify-between rounded-xl bg-[#1b2234] border border-blue-500/30 p-3 shadow-inner">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">✓</div>
                <span className="text-xs text-gray-300 font-medium">
                  protected by <span className="font-bold text-white">reCAPTCHA</span>
                </span>
              </div>
              <button type="button" aria-label="Refresh captcha" className="text-blue-400 hover:text-blue-300 transition">
                <RefreshCw size={18} />
              </button>
            </div>

            {/* Agreement */}
            <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-gray-400 pt-1">
              <input
                type="checkbox"
                name="acceptedAgreement"
                checked={form.acceptedAgreement}
                onChange={handleChange}
                required
                className="mt-0.5 h-4 w-4 rounded accent-[#00c853]"
              />

              <span>
                I confirm that I am 21 years old and accept the{" "}
                <Link to="/terms" className="text-[#00c853] underline hover:text-[#00b048]">
                  General Terms and Conditions
                </Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-xl bg-[#00c853] px-4 py-3.5 text-sm font-bold text-black transition hover:bg-[#00b048] disabled:cursor-not-allowed disabled:opacity-60 shadow-lg shadow-[#00c853]/20"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          {/* Login link */}
          <p className="mt-5 text-center text-xs text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#00c853] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

      </section>
    </main>
  );
}