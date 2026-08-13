import { Navigate, Outlet } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";

export function ProtectedRoute() {
  const { session, loading } = useSessionContext();

  if (loading) {
    return <div className="p-8 text-sm text-muted">Chargement...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
