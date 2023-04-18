import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireSession } from "~/utils/session";
import { createServerClient } from "~/utils/supabase.server";
import { HiPlus } from "react-icons/hi2";
import type { Category, Country } from "~/utils/api";
import { formatCategory, formatCountry } from "~/utils/helper";

export async function loader({ request }: LoaderArgs) {
  const response = new Response();
  const supabaseClient = createServerClient({ request, response });
  await requireSession(response, supabaseClient);

  const { data } = await supabaseClient.from("competitors").select(`
    id,
    first_name,
    last_name,
    category: categories (*),
    country: countries (flag_emoji, name)
  `);

  return json({ competitors: data ?? [] }, { headers: response.headers });
}

export default function CompetitorsIndexRoute() {
  const { competitors } = useLoaderData<typeof loader>();
  console.log(competitors);
  return (
    <>
      <header className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-base-content">
            Competidores
          </h1>
          <p className="text-base text-base-content">
            Lista completa de competidores
          </p>
        </div>
        <Link to="/competitors/new" className="btn-primary btn gap-2">
          <HiPlus size={24} />
          <span>Nuevo competidor</span>
        </Link>
      </header>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Categoría</th>
              <th>País</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((competitor) => (
              <tr key={competitor.id}>
                <td>{competitor.first_name}</td>
                <td>{competitor.last_name}</td>
                <td>
                  {competitor.category
                    ? formatCategory(competitor.category as Category)
                    : ""}
                </td>
                <td>
                  {competitor.country
                    ? formatCountry(competitor.country as Country)
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
