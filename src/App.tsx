import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CabinetPage } from "./pages/CabinetPage";
import { ContactPage } from "./pages/ContactPage";
import { EquipePage } from "./pages/EquipePage";
import { ExpertisesPage } from "./pages/ExpertisesPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cabinet" element={<CabinetPage />} />
          <Route path="expertises" element={<ExpertisesPage />} />
          <Route path="equipe" element={<EquipePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
