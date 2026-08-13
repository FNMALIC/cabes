import { NavLink, Outlet } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm font-medium ${
    isActive ? "text-blue-night" : "text-muted hover:text-text"
  }`;

export function Layout() {
  const { session, logout } = useSessionContext();

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="font-semibold text-blue-night">CABES — Administration</div>
          <nav className="flex items-center gap-2">
            <NavLink to="/testimonials" className={navLinkClass}>
              Témoignages
            </NavLink>
            <NavLink to="/submissions" className={navLinkClass}>
              Demandes de contact
            </NavLink>
            <span className="mx-2 text-sm text-muted">{session?.email}</span>
            <button
              type="button"
              onClick={() => logout()}
              className="px-3 py-2 text-sm font-medium text-muted hover:text-red"
            >
              Déconnexion
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
