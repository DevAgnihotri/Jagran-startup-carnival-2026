import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import DashboardEditor from "@/components/auth/DashboardEditor";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/auth/login?next=/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#080808] px-6 py-24 text-[#F5F5F0] md:px-12">
      <div className="mx-auto max-w-4xl border border-[#202020] bg-[#0F0F0F] p-8 md:p-12">
        <p className="font-ibm-mono text-[11px] tracking-[2px] text-[#888]">STALL DASHBOARD</p>
        <h1 className="mt-3 font-grotesk text-4xl font-bold tracking-tight md:text-5xl">Customize Your Public Stall Page</h1>
        <p className="mt-3 font-ibm-mono text-[12px] tracking-[1px] text-[#A0A09A]">
          Add your banner, logo, story, and videos. Your page updates instantly after save.
        </p>

        <div className="mt-10">
          <DashboardEditor />
        </div>
      </div>
    </main>
  );
}
