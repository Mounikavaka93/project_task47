import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import Footer from "./Footer";
import Navbar from "./Navbar";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export default function Layout() {
  const { pathname } = useLocation();
  const { toast } = useCart();
  const flush = pathname === "/";

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main" key={pathname} className={`page-in flex-1 ${flush ? "" : "pt-16"}`}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      {toast ? (
        <div
          key={toast.id}
          role="status"
          className="fade-in fixed bottom-5 left-1/2 z-[70] -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-sm text-paper shadow-lg"
        >
          {toast.message}
        </div>
      ) : null}
    </div>
  );
}
