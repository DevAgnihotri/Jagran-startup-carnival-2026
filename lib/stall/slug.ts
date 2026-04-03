export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function stallNameFromEmail(email?: string | null): string {
  if (!email) return "My Stall";
  const localPart = email.split("@")[0] || "my-stall";
  return localPart.replace(/[._-]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
