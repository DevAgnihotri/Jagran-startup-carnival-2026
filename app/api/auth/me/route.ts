import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    return NextResponse.json({ user: null, slug: null });
  }

  const { data: profile } = await supabase
    .from("stall_profiles")
    .select("slug")
    .eq("user_id", userData.user.id)
    .maybeSingle();

  return NextResponse.json({
    user: {
      id: userData.user.id,
      email: userData.user.email ?? null,
    },
    slug: profile?.slug ?? null,
  });
}
