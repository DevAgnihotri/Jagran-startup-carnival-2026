"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginClient({ nextPath }: { nextPath: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const supabase = createSupabaseBrowserClient();

    const configuredOrigin = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
    const origin = configuredOrigin || window.location.origin;
    const safeNext = nextPath.startsWith("/") ? nextPath : "/dashboard";

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(safeNext)}`,
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      setLoading(false);
      setError(error.message || "Unable to start Google login.");
      return;
    }

    if (!data?.url) {
      setLoading(false);
      setError("Google login URL was not generated.");
      return;
    }

    // Force top-level navigation to avoid iframe/popup origin restrictions.
    window.location.assign(data.url);
  };

  return (
    <main className="min-h-screen bg-[#080808] px-6 py-24 text-[#F5F5F0]">
      <div className="mx-auto max-w-3xl border border-[#202020] bg-[#0F0F0F] p-10 md:p-14">
        <p className="font-ibm-mono text-[11px] tracking-[2px] text-[#888]">STALL REGISTRATION</p>
        <h1 className="mt-4 font-grotesk text-4xl font-bold tracking-tight md:text-5xl">Login To Create Your Stall Page</h1>
        <p className="mt-4 max-w-xl font-ibm-mono text-[12px] leading-6 tracking-[1px] text-[#A0A09A]">
          Continue with Google to unlock your dashboard, customize your public page, and manage your carnival presence.
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-10 inline-flex h-12 items-center justify-center bg-[#FFD600] px-8 font-ibm-mono text-[11px] font-bold tracking-[2px] text-[#0A0A0A] transition hover:bg-[#F5F5F0] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "CONNECTING..." : "LOGIN WITH GOOGLE"}
        </button>

        {error ? (
          <p className="mt-4 font-ibm-mono text-[11px] tracking-[1px] text-[#FF7A7A]">
            {error}
          </p>
        ) : null}
      </div>
    </main>
  );
}
