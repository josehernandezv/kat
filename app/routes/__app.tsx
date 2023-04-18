import { useState } from "react";
import { NavLink, Outlet, useOutletContext } from "@remix-run/react";
import { Logo } from "~/components/Logo";
import { Navbar } from "~/components/Navbar";
import { json } from "@remix-run/node";
import { requireSession } from "~/utils/session";
import { createServerClient } from "~/utils/supabase.server";
import type { LoaderArgs } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  const response = new Response();
  const supabaseClient = createServerClient({ request, response });
  const session = await requireSession(response, supabaseClient);
  return json(session);
}

export default function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="drawer-mobile drawer">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        onChange={() => setDrawerOpen(!drawerOpen)}
      />
      <div className="drawer-content">
        <Navbar onClickMenu={() => setDrawerOpen(true)} />
        <div className="flex flex-1 flex-col items-center justify-center">
          <Outlet context={useOutletContext()} />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu w-80 bg-base-100 p-4 text-base-content lg:bg-base-200">
          {/* Only visible on lg or above */}
          <li className="mb-4 hidden lg:block">
            <Logo />
          </li>
          <li>
            <NavLink to="/competitors">Competidores</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
