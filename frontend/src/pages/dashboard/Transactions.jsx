import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Smartphone, Building2 } from "lucide-react";
import { transactionService } from "../../services/transactionService";

export default function Withdrawals() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    amount: "",
    method: "CBE Birr",
    name: "",
    accountNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const amount = Number(form.amount);
    const name = form.name.trim();
    const accountNumber = form.accountNumber.trim();

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Enter a valid amount greater than zero.");
      return;
    }

    if (name.length < 2) {
      setError("Enter a valid account holder name.");
      return;
    }

    if (!["Telebirr", "CBE", "CBE Birr", "eBirr", "Bank Transfer"].includes(form.method)) {
      setError("Please select a valid withdrawal method.");
      return;
    }

    if (accountNumber.length < 5) {
      setError("Enter valid account information (at least 5 characters).");
      return;
    }

    setLoading(true);

    try {
      const result = await transactionService.createWithdrawal({
        amount,
        name,
        method: form.method,
        accountNumber,
      });

      setSuccess(
        result.message || "Withdrawal request submitted successfully."
      );

      setForm({
        amount: "",
        method: "CBE Birr",
        name: "",
        accountNumber: "",
      });

      navigate("/login", {
        state: {
          message:
            result.message ||
            "Your withdrawal request was submitted successfully.",
        },
      });
    } catch (err) {
      setError(
        err.message || "Could not submit your withdrawal request."
      );
    } finally {
      setLoading(false);
    }
  }

  const methods = [
    { id: "CBE Birr", label: "CBE Birr", desc: "Mobile banking", icon: Smartphone },
    { id: "Telebirr", label: "Telebirr", desc: "Ethio Telecom", icon: Smartphone },
    { id: "eBirr", label: "eBirr", desc: "Digital wallet", icon: Smartphone },
    { id: "Bank Transfer", label: "Bank Transfer", desc: "Direct bank transfer", icon: Building2 },
  ];

  return (
    <main className="min-h-screen bg-[#0d0f17] px-4 py-6 text-white sm:px-8">
      <div className="mx-auto max-w-xl">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition">
            <ArrowLeft size={18} />
            <span className="font-bold tracking-wider uppercase text-xs text-gray-300">Betconnect</span>
          </Link>
          <span className="text-xs font-black tracking-widest bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-300 bg-clip-text text-transparent">
            ZPLAY
          </span>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-xl font-bold tracking-tight">Withdrawal Details</h1>
          <p className="text-xs text-gray-400 mt-1">Enter your transaction information</p>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-white/5 bg-[#161a25] p-5 sm:p-6 shadow-2xl">

          {error && (
            <div
              role="alert"
              className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
            >
              <CheckCircle2 size={18} className="shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Amount Display / Input Box */}
            <div className="rounded-2xl bg-[#1e2330] border border-white/10 p-4 text-center">
              <span className="text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">AMOUNT</span>
              <div className="flex items-center justify-center gap-2 mt-1">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  required
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-36 bg-transparent text-center text-3xl font-black text-white outline-none placeholder:text-gray-600"
                />
                <span className="text-lg font-bold text-gray-400">ETB</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-2">Min: 100 ETB — Max: 100,000 ETB</p>
            </div>

            {/* Phone Number / Account Number */}
            <div>
              <label
                htmlFor="accountNumber"
                className="mb-1.5 block text-xs font-semibold text-gray-400"
              >
                Phone Number / Account Number
              </label>

              <input
                id="accountNumber"
                name="accountNumber"
                type="text"
                minLength={5}
                maxLength={50}
                required
                value={form.accountNumber}
                onChange={handleChange}
                placeholder="0911223344"
                autoComplete="off"
                className="w-full rounded-xl bg-[#1e2330] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#00c853] placeholder:text-gray-600"
              />
            </div>

            {/* Account Holder Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-xs font-semibold text-gray-400"
              >
                Account Holder Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                minLength={2}
                maxLength={100}
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Enter account holder's full name"
                autoComplete="name"
                className="w-full rounded-xl bg-[#1e2330] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#00c853] placeholder:text-gray-600"
              />
            </div>

            {/* Payment Methods Selection Grid */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-400">
                Payment Method
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {methods.map((m) => {
                  const isSelected = form.method === m.id;
                  const IconComponent = m.icon;

                  return (
                    <div
                      key={m.id}
                      onClick={() => setForm((c) => ({ ...c, method: m.id }))}
                      className={`cursor-pointer rounded-xl p-3.5 border transition relative flex items-center justify-between ${
                        isSelected
                          ? "bg-[#172b22] border-[#00c853] shadow-lg shadow-[#00c853]/10"
                          : "bg-[#1e2330] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${isSelected ? "bg-[#00c853] text-black" : "bg-[#283044] text-gray-300"}`}>
                          <IconComponent size={18} />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-white">{m.label}</h3>
                          <p className="text-[11px] text-gray-400">{m.desc}</p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="h-5 w-5 rounded-full bg-[#00c853] text-black flex items-center justify-center text-xs font-black">
                          ✓
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#00c853] px-4 py-3.5 text-sm font-bold text-black transition hover:bg-[#00b048] disabled:cursor-not-allowed disabled:opacity-60 shadow-lg shadow-[#00c853]/20 mt-2"
            >
              {loading ? "Submitting..." : "Submit withdrawal request"}
            </button>
          </form>

          <p className="mt-5 text-center text-[11px] leading-relaxed text-gray-500">
            A submitted request is not a completed payment. Never provide your
            banking password, PIN, or one-time verification code.
          </p>
        </div>
      </div>
    </main>
  );
}