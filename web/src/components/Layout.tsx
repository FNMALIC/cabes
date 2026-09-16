import { Outlet } from "react-router-dom";
import { Analytics } from "./Analytics";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollToTop } from "./ScrollToTop";
import { Seo } from "./Seo";

export function Layout() {
  return (
    <div className="relative min-h-screen">
      <a href="#main-content" className="skip-link">
        Aller au contenu
      </a>
      <ScrollToTop />
      <Seo />
      <Analytics />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
