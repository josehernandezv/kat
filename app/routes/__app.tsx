import { NavLink, Outlet } from "@remix-run/react";
import { useState } from "react";

import { Logo } from "~/components/Logo";
import { Navbar } from "~/components/Navbar";

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
          <Outlet />
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
