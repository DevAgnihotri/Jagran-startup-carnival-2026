import LoginClient from "@/components/auth/LoginClient";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params.next || "/dashboard";

  return <LoginClient nextPath={nextPath} />;
}
