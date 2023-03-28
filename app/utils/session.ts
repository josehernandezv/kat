import { redirect } from "@remix-run/node";
import type { SupabaseClient } from "~/utils/supabase.server";

export async function requireSession(
  response: Response,
  supabaseClient: SupabaseClient
) {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) {
    // there is no session, therefore, we are redirecting
    // to the landing page. The `/?index` is required here
    // for Remix to correctly call our loaders
    throw redirect("/login", {
      // we still need to return response.headers to attach the set-cookie header
      headers: response.headers,
    });
  }
  return session;
}
