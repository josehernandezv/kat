import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createServerClient } from "utils/supabase.server";

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabaseClient = createServerClient({ request, response });

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) return;

  const { error } = await supabaseClient.auth.signOut();
  if (error) throw error;
  return redirect("/login", { headers: response.headers });
};

export const loader = async () => {
  return redirect("/");
};
