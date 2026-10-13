import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, X, ChevronDown } from "lucide-react";
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
      setError("Please enter your phone number.");
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
    <main className="flex min-h-screen w-full items-center justify-center bg-[#0d0f17] text-white">
      <section className="w-full min-h-screen sm:min-h-0 sm:max-w-md sm:rounded-2xl bg-[#161a25] p-4 sm:p-6 shadow-2xl border-0 sm:border border-white/5 flex flex-col justify-between sm:justify-start">
        
        <div>
          {/* Top Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <h2 className="text-sm font-bold tracking-wider text-gray-300 uppercase">
              Login
            </h2>
            <Link
              to="/"
              aria-label="Close"
              className="text-gray-400 hover:text-white transition"
            >
              <X size={20} />
            </Link>
          </div>

          {/* Promotional Banner */}
          <div className="relative mb-6 overflow-hidden rounded-xl bg-gradient-to-r from-[#141238] via-[#211a52] to-[#0e3b3a] p-4 border border-indigo-500/20 shadow-lg flex items-center justify-between">
            <div className="z-10 pr-2">
              <span className="text-xs font-black tracking-widest text-cyan-400">ZPLAY</span>
              <h3 className="text-base font-extrabold text-white leading-tight mt-0.5">
                JOIN TO OUR BOT
              </h3>
              <p className="text-xs font-bold text-emerald-400 mt-0.5">
                TO GET FREE WHEELS
              </p>
            </div>
            <div className="shrink-0 flex items-center justify-center">
              <div className="h-14 w-14 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-400/30 text-cyan-300 shadow-inner">
                🤖
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          {attempted && !error && loading && (
            <p className="mb-4 text-sm text-gray-400" role="status">
              Checking your account...
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Mobile Number Field */}
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-xs font-semibold text-gray-400"
              >
                Mobile Number *
              </label>

              <div className="flex items-center rounded-xl bg-[#1e2330] border border-white/10 focus-within:border-[#00c853] overflow-hidden">
                {/* Country Code Prefix */}
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
                  placeholder="Mobile Number"
                  className="min-w-0 flex-1 bg-transparent px-3.5 py-3 text-sm text-white outline-none placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Password Field */}
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
                  autoComplete="current-password"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-xl bg-[#00c853] px-4 py-3.5 text-sm font-bold text-black transition hover:bg-[#00b048] disabled:cursor-not-allowed disabled:opacity-60 shadow-lg shadow-[#00c853]/20"
            >
              {loading ? "Please wait..." : "Login"}
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-8 sm:mt-5 text-center space-y-3 pb-6 sm:pb-0">
          <div>
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-[#00c853] hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="text-xs text-gray-400">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#00c853] hover:underline"
            >
              Register
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}