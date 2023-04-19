import type { ActionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { createServerClient } from "~/utils/supabase.server";
import { CompetitorForm } from "~/components/CompetitorForm";
import { validateCompetitor } from "~/utils/validation";

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabaseClient = createServerClient({ request, response });
  const formPayload = Object.fromEntries(await request.formData());
  try {
    const newCompetitor = validateCompetitor(formPayload);
    if (!newCompetitor.success) throw newCompetitor.error.format();

    const { error } = await supabaseClient.from("competitors").insert({
      ...newCompetitor.data,
      category_id: Number(formPayload["category[id]"]) || null,
      country_id: Number(formPayload["country[id]"]) || null,
    });
    if (error) throw error;
    return redirect("/competitors", { headers: response.headers });
  } catch (error) {
    return json({ error }, { status: 400, headers: response.headers });
  }
};

export default function NewCompetitorRoute() {
  return (
    <div>
      <p>Agrega un nuevo competidor</p>
      <CompetitorForm />
    </div>
  );
}
