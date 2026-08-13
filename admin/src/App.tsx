import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SessionProvider } from "./context/SessionContext";
import { LoginPage } from "./pages/LoginPage";
import { SubmissionsPage } from "./pages/SubmissionsPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";

export default function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Navigate to="/testimonials" replace />} />
              <Route path="testimonials" element={<TestimonialsPage />} />
              <Route path="submissions" element={<SubmissionsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  );
}
