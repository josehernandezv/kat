import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireSession } from "~/utils/session";
import { createServerClient } from "~/utils/supabase.server";
import { HiPlus } from "react-icons/hi2";

export async function loader({ request }: LoaderArgs) {
  const response = new Response();
  const supabaseClient = createServerClient({ request, response });
  await requireSession(response, supabaseClient);

  const { data } = await supabaseClient.from("competitors").select();

  return json({ competitors: data ?? [] }, { headers: response.headers });
}

export default function CompetitorsIndexRoute() {
  const { competitors } = useLoaderData<typeof loader>();
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
              <th>Género</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((competitor) => (
              <tr key={competitor.id}>
                <td>{competitor.first_name}</td>
                <td>{competitor.last_name}</td>
                <td>{competitor.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
