import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("stall_profiles")
    .select("slug, stall_name, tagline, banner_url, updated_at, created_at")
    .eq("is_published", true)
    .or("tagline.not.is.null,about.not.is.null,banner_url.not.is.null,logo_url.not.is.null,website_url.not.is.null,contact_email.not.is.null")
    .order("updated_at", { ascending: false })
    .limit(24);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ stalls: data ?? [] });
}
