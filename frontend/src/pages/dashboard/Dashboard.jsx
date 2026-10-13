import { Link } from "react-router-dom";
import {
  Menu,
  User,
  Home,
  Dices,
  Wallet,
  Trophy,
  History,
  Megaphone,
  Send,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0d1017] text-white flex flex-col justify-between pb-16 sm:pb-0">
      <div>
        {/* Top Announcement Bar */}
        <div className="bg-[#131926] px-4 py-2 text-center text-xs text-gray-300 flex items-center justify-center gap-2 border-b border-white/5">
          <Megaphone size={14} className="text-[#00c853] shrink-0" />
          <span>5% daily cashback</span>
        </div>

        {/* Main Header / Navigation */}
        <header className="sticky top-0 z-40 bg-[#161b26] px-4 py-3 border-b border-white/5 flex items-center justify-between gap-2 shadow-md">
          <div className="flex items-center gap-3">
            <button aria-label="Open menu" className="text-gray-300 hover:text-white">
              <Menu size={22} />
            </button>

            <Link to="/dashboard" className="flex items-center">
              <span className="text-lg font-black tracking-widest bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-300 bg-clip-text text-transparent">
                ZPLAY
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Deposit Button Icon */}
            <Link
              to="/deposit"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#00c853]/40 bg-[#00c853]/20 text-[#00c853] transition hover:bg-[#00c853]/30"
              title="Quick Deposit"
            >
              <Wallet size={16} />
            </Link>

            {/* Account Balance Widget */}
            <Link to="/deposit">
              <div className="flex items-center rounded-lg bg-[#1e2535] px-3 py-1.5 border border-white/5 text-xs font-bold text-white">
                ETB
              </div>
            </Link>

            {/* User Profile / Account Link */}
            <Link
              to="/deposit"
              className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#1e2535] text-gray-300 hover:text-white border border-white/5"
              title="Transactions & Account"
            >
              <User size={18} />
            </Link>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="p-4 max-w-2xl mx-auto space-y-5">

          {/* Time & Server Info Bar */}
          <div className="text-center text-[11px] font-semibold text-gray-400 tracking-wider">
            13.10.2026 · GMT+3
          </div>

          {/* Quick Category Icons */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="flex flex-col items-center justify-center rounded-xl bg-[#161b26] p-3 border border-white/5 hover:border-white/10 transition cursor-pointer">
              <div className="text-2xl mb-1">🎰</div>
              <Link to="/deposit">
                <span className="text-[11px] font-bold text-gray-300 tracking-wider">CASINO</span>
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center rounded-xl bg-[#161b26] p-3 border border-white/5 hover:border-white/10 transition cursor-pointer">
              <div className="text-2xl mb-1">💃</div>
              <Link to="/deposit">
                <span className="text-[11px] font-bold text-gray-300 tracking-wider">LIVE CASINO</span>
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center rounded-xl bg-[#161b26] p-3 border border-white/5 hover:border-white/10 transition cursor-pointer">
              <div className="text-2xl mb-1">⚽</div>
              <Link to="/deposit">
                <span className="text-[11px] font-bold text-gray-300 tracking-wider">SPORTS</span>
              </Link>
            </div>
          </div>

          {/* Agent ለመሆን Banner Card (Amharic Agent Banner) */}
          <a
            href="https://t.me/agent4bet"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-blue-900/40 via-[#161b26] to-cyan-900/40 p-4 border border-blue-500/30 hover:border-blue-400 transition shadow-lg group"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-cyan-400 border border-blue-400/30">
                <Send size={22} />
              </div>
              <div>
                <h3 className="text-sm font-black text-white group-hover:text-cyan-400 transition">
                 አጀንት ለመሆን
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  ያግኙን @agent4bet በቴሌግራም
                </p>
              </div>
            </div>
            
          </a>

          {/* Featured Telegram Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#141238] via-[#24113e] to-[#0d2a33] p-5 border border-purple-500/20 shadow-xl flex items-center justify-between min-h-[160px]">
            <div className="z-10 space-y-2 max-w-[60%]">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">ZPLAY</span>
              <h2 className="text-lg font-black leading-tight text-white tracking-tight">
                ONE TAP.<br />INSTANT ACCESS.
              </h2>
              <a
                href="https://t.me/agent4bet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/30 hover:opacity-90 transition"
              >
                <span>ይኑሩ!</span>
                <span className="text-[10px] opacity-80 uppercase">
                  TAP TO JOIN (@agent4bet)
                </span>
              </a>
            </div>

            <div className="shrink-0 text-5xl opacity-90 pr-2">
              📱
            </div>
          </div>

          {/* Primary Action Buttons (Deposit & Withdraw) */}
          <section className="grid grid-cols-2 gap-3 pt-1">
            <Link
              to="/deposit"
              className="flex items-center justify-center rounded-xl bg-[#00c853] py-3.5 px-4 text-sm font-bold text-black shadow-lg shadow-[#00c853]/20 hover:bg-[#00b048] transition text-center"
            >
              Deposit
            </Link>

            <Link
              to="/withdraw"
              className="flex items-center justify-center rounded-xl border-2 border-[#00c853] bg-transparent py-3.5 px-4 text-sm font-bold text-[#00c853] hover:bg-[#00c853]/10 transition text-center"
            >
              Withdraw
            </Link>
          </section>

          {/* Account Activity Summary Section */}
          <section className="mt-6 rounded-xl border border-white/5 bg-[#161b26] p-4 text-xs text-gray-400 space-y-1">
            <div className="flex items-center justify-between text-gray-300 font-semibold mb-2">
              <span>Account Activity</span>
              <Link to="/transactions" className="text-[#00c853] hover:underline text-[11px]">
                View History
              </Link>
            </div>
            <p className="leading-relaxed">
              Visit Transactions to review submitted deposit and withdrawal requests.
            </p>
          </section>

        </main>
      </div>

      {/* Bottom Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#121620] border-t border-white/10 px-4 py-2 flex items-center justify-around sm:hidden">
        <Link to="/dashboard" className="flex flex-col items-center gap-1 text-[#00c853]">
          <Home size={18} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link to="/deposit" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white">
          <Dices size={18} />
          <span className="text-[10px] font-medium">Sports</span>
        </Link>
        <Link to="/deposit" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white">
          <Wallet size={18} />
          <span className="text-[10px] font-medium">Deposit</span>
        </Link>
        <Link to="/deposit" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white">
          <Trophy size={18} />
          <span className="text-[10px] font-medium">Casino</span>
        </Link>
        <Link to="/deposit" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white">
          <History size={18} />
          <span className="text-[10px] font-medium">History</span>
        </Link>
      </nav>
    </div>
  );
}