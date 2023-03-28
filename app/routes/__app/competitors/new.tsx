import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createServerClient } from "~/utils/supabase.server";

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabaseClient = createServerClient({ request, response });
  const { first_name } = Object.fromEntries(await request.formData());

  const { error } = await supabaseClient.from("competitors").insert({
    first_name: String(first_name),
  });
  if (error) throw error;

  return redirect("/competitors", { headers: response.headers });
};

export default function NewCompetitorRoute() {
  return (
    <div>
      <p>Agrega un nuevo competidor</p>
      <Form method="post">
        <div className="form-control w-full max-w-xs pb-4">
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            name="first_name"
            className="input-bordered input w-full max-w-xs"
          />
        </div>
        <div>
          <button type="submit" className="btn">
            Crear competidor
          </button>
        </div>
      </Form>
    </div>
  );
}
