import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireSession } from "utils/session";
import { createServerClient } from "utils/supabase.server";

export async function loader({ request }: LoaderArgs) {
  const response = new Response();
  const supabaseClient = createServerClient({ request, response });
  await requireSession(response, supabaseClient);

  const { data } = await supabaseClient.from("competitors").select();

  return json({ competitors: data ?? [] }, { headers: response.headers });
}

export default function Index() {
  const { competitors } = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <p>{JSON.stringify(competitors, null, 2)}</p>
      <form action="/logout" method="post">
        <button type="submit" className="btn">
          Logout
        </button>
      </form>
    </div>
  );
}
