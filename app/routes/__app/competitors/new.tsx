import type { ActionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createServerClient } from "~/utils/supabase.server";
import { AutoComplete } from "~/components/AutoComplete";
import type { Category, Country } from "~/utils/api";
import { z } from "zod";
import clsx from "clsx";
import { formatCategory, formatCountry } from "~/utils/helper";

const competitorSchema = z.object({
  first_name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres",
  }),
  last_name: z.string().min(2, {
    message: "El apellido debe tener al menos 2 caracteres",
  }),
  category_id: z.number().optional(),
  country_id: z.number().optional(),
});

// type CompetitorFields = z.infer<typeof competitorSchema>;

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabaseClient = createServerClient({ request, response });
  const formPayload = Object.fromEntries(await request.formData());
  try {
    const newCompetitor = competitorSchema.safeParse(formPayload);
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
  const data = useActionData();
  console.log("data", data);
  return (
    <div>
      <p>Agrega un nuevo competidor</p>
      <Form method="post">
        <div className="form-control w-full max-w-xs pb-4">
          <label className="label">
            <span
              className={clsx("label-text", {
                "text-error": data?.error?.first_name,
              })}
            >
              Nombre
            </span>
          </label>
          <input
            type="text"
            name="first_name"
            className={clsx("input-bordered input w-full max-w-xs", {
              "input-error": data?.error?.first_name,
            })}
          />
        </div>
        <div className="form-control w-full max-w-xs pb-4">
          <label className="label">
            <span
              className={clsx("label-text", {
                "text-error": data?.error?.last_name,
              })}
            >
              Apellido
            </span>
          </label>
          <input
            type="text"
            name="last_name"
            className={clsx("input-bordered input w-full max-w-xs", {
              "input-error": data?.error?.last_name,
            })}
          />
        </div>
        <div className="form-control w-full max-w-xs pb-4">
          <label className="label">
            <span className="label-text">Categoría</span>
          </label>
          <AutoComplete<Category>
            name="category"
            entity="categories"
            displayValue={(item) => formatCategory(item)}
            filterValue={({ age_division, gender, weight }, query) =>
              (age_division || "")
                .toLowerCase()
                .includes(query.toLowerCase()) ||
              (gender || "").toLowerCase().includes(query.toLowerCase()) ||
              (weight || "").toLowerCase().includes(query.toLowerCase()) ||
              query
                .toLowerCase()
                .includes((age_division || "").toLowerCase?.()) ||
              query.toLowerCase().includes((gender || "").toLowerCase()) ||
              query.toLowerCase().includes((weight || "").toLowerCase())
            }
          />
        </div>
        <div className="form-control w-full max-w-xs pb-4">
          <label className="label">
            <span className="label-text">País</span>
          </label>
          <AutoComplete<Country>
            name="country"
            entity="countries"
            displayValue={(item) => formatCountry(item)}
            filterValue={({ name }, query) =>
              (name || "").toLowerCase().includes(query.toLowerCase()) ||
              query.toLowerCase().includes((name || "").toLowerCase?.())
            }
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
