import { Outlet, useOutletContext } from "@remix-run/react";

export default function CompetitorsRoute() {
  return (
    <main className="container w-full px-4">
      <Outlet context={useOutletContext()} />
    </main>
  );
}
