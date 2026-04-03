import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { slugify, stallNameFromEmail } from "@/lib/stall/slug";

const updateSchema = z.object({
  slug: z.string().min(3).max(50).optional(),
  stall_name: z.string().min(2).max(120).optional(),
  tagline: z.string().max(180).optional(),
  about: z.string().max(2000).optional(),
  banner_url: z.string().url().or(z.literal("")).optional(),
  logo_url: z.string().url().or(z.literal("")).optional(),
  video_links: z.array(z.string().url()).max(10).optional(),
  contact_email: z.string().email().or(z.literal("")).optional(),
  instagram_url: z.string().url().or(z.literal("")).optional(),
  linkedin_url: z.string().url().or(z.literal("")).optional(),
  website_url: z.string().url().or(z.literal("")).optional(),
  background_color: z.union([z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/), z.literal("")]).optional(),
  background_gradient: z.union([z.string().max(200), z.literal("")]).optional(),
  is_published: z.boolean().optional(),
});

async function getUserId() {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  return { supabase, user: userData.user };
}

async function generateUniqueSlug(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>, base: string) {
  const initial = slugify(base) || "my-stall";

  for (let i = 0; i < 100; i++) {
    const candidate = i === 0 ? initial : `${initial}-${i}`;

    const { data } = await supabase
      .from("stall_profiles")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();

    if (!data) return candidate;
  }

  return `${initial}-${Date.now()}`;
}

export async function GET() {
  const { supabase, user } = await getUserId();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("stall_profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json({ profile: data });
}

export async function POST() {
  const { supabase, user } = await getUserId();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: existing } = await supabase
    .from("stall_profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ profile: existing });
  }

  const stallName = stallNameFromEmail(user.email);
  const slug = await generateUniqueSlug(supabase, stallName);

  const { data, error } = await supabase
    .from("stall_profiles")
    .insert({
      user_id: user.id,
      stall_name: stallName,
      slug,
      video_links: [],
      is_published: true,
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ profile: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const { supabase, user } = await getUserId();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parse = updateSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: parse.error.flatten() }, { status: 400 });
  }

  const payload = parse.data;

  if (payload.slug) {
    const normalizedSlug = slugify(payload.slug);
    if (!normalizedSlug || normalizedSlug.length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters." }, { status: 400 });
    }

    const { data: slugOwner, error: slugError } = await supabase
      .from("stall_profiles")
      .select("user_id")
      .eq("slug", normalizedSlug)
      .maybeSingle();

    if (slugError) {
      return NextResponse.json({ error: slugError.message }, { status: 500 });
    }

    if (slugOwner && slugOwner.user_id !== user.id) {
      return NextResponse.json({ error: "Username is already taken. Try another one." }, { status: 409 });
    }

    payload.slug = normalizedSlug;
  }

  if (payload.stall_name) {
    payload.stall_name = payload.stall_name.trim();
    if (!payload.stall_name) {
      return NextResponse.json({ error: "stall_name cannot be empty" }, { status: 400 });
    }
  }

  if (Object.prototype.hasOwnProperty.call(payload, "background_color")) {
    // normalize empty string to null, and trim valid values
    if (!payload.background_color) payload.background_color = null;
    else payload.background_color = (payload.background_color as string).trim();
  }

  if (Object.prototype.hasOwnProperty.call(payload, "background_gradient")) {
    if (!payload.background_gradient) payload.background_gradient = null;
    else payload.background_gradient = (payload.background_gradient as string).trim();
  }

  const { data, error } = await supabase
    .from("stall_profiles")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ profile: data });
}
