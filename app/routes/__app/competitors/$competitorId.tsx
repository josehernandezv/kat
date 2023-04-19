import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { CompetitorForm } from "~/components/CompetitorForm";
import { requireSession } from "~/utils/session";
import { createServerClient } from "~/utils/supabase.server";
import { validateCompetitor } from "~/utils/validation";

export async function loader({ request, params }: LoaderArgs) {
  const response = new Response();
  const supabaseClient = createServerClient({ request, response });
  await requireSession(response, supabaseClient);
  const { competitorId } = params;

  const { data, error } = await supabaseClient
    .from("competitors")
    .select(`*`)
    .eq("id", competitorId)
    .limit(1)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return json({ competitor: data }, { headers: response.headers });
}

export const action = async ({ request, params }: ActionArgs) => {
  const response = new Response();
  const supabaseClient = createServerClient({ request, response });
  try {
    if (request.method === "DELETE") {
      const { error } = await supabaseClient
        .from("competitors")
        .delete()
        .eq("id", params.competitorId);
      if (error) throw error;
      return redirect("/competitors", { headers: response.headers });
    }

    const formPayload = Object.fromEntries(await request.formData());
    const updatedCompetitor = validateCompetitor(formPayload);
    if (!updatedCompetitor.success) throw updatedCompetitor.error.format();

    const { error } = await supabaseClient
      .from("competitors")
      .update({
        ...updatedCompetitor.data,
        category_id: Number(formPayload["category[id]"]) || null,
        country_id: Number(formPayload["country[id]"]) || null,
      })
      .eq("id", params.competitorId);
    if (error) throw error;
    return redirect("/competitors", { headers: response.headers });
  } catch (error) {
    return json({ error }, { status: 400, headers: response.headers });
  }
};

export default function CompetitorRoute() {
  const { competitor } = useLoaderData<typeof loader>();
  return (
    <div>
      <CompetitorForm competitor={competitor} />
      <Form method="delete">
        <button className="btn-outline btn-error btn mt-4" type="submit">
          Eliminar competidor
        </button>
      </Form>
    </div>
  );
}
