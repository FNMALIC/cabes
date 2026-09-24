import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AnnoncesPage } from "./pages/AnnoncesPage";
import { AvisPage } from "./pages/AvisPage";
import { CabinetPage } from "./pages/CabinetPage";
import { CarrieresPage } from "./pages/CarrieresPage";
import { ContactPage } from "./pages/ContactPage";
import { EquipePage } from "./pages/EquipePage";
import { ExpertisesPage } from "./pages/ExpertisesPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cabinet" element={<CabinetPage />} />
          <Route path="expertises" element={<ExpertisesPage />} />
          <Route path="equipe" element={<EquipePage />} />
          <Route path="carrieres" element={<CarrieresPage />} />
          <Route path="annonces" element={<AnnoncesPage />} />
          <Route path="avis" element={<AvisPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
