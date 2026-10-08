import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { IconBag, IconClose, IconMenu, IconSearch, IconUser } from "./Icons";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count, setDrawerOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [query, setQuery] = useState("");

  const onHero = location.pathname === "/" && !scrolled && !menuOpen && !accountOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const submitSearch = (event) => {
    event.preventDefault();
    const next = query.trim();
    navigate(next ? `/products?q=${encodeURIComponent(next)}` : "/products");
    setMenuOpen(false);
  };

  const linkClass = (isActive) =>
    `relative text-sm tracking-wide transition ${
      onHero
        ? isActive
          ? "text-paper"
          : "text-paper/70 hover:text-paper"
        : isActive
          ? "text-ink"
          : "text-ink/60 hover:text-ink"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition duration-300 ${
        onHero ? "text-paper" : "border-b border-ink/10 bg-paper/90 text-ink backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link to="/" className="shrink-0 font-serif text-[1.55rem] leading-none tracking-tight sm:text-[1.7rem]">
          Velune<span className="text-copper">.</span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex lg:gap-8">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => linkClass(isActive)}>
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive ? <span className="absolute -bottom-1.5 left-0 h-px w-full bg-copper" /> : null}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <form onSubmit={submitSearch} className="relative hidden shrink-0 lg:block">
            <label htmlFor="nav-search" className="sr-only">
              Search earbuds
            </label>
            <IconSearch className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${onHero ? "text-paper/70" : "text-mist"}`} />
            <input
              id="nav-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              className={`w-36 rounded-full border py-2 pl-9 pr-3 text-sm outline-none transition duration-300 focus:w-48 xl:w-44 ${
                onHero
                  ? "border-paper/25 bg-paper/10 text-paper placeholder:text-paper/50"
                  : "border-ink/15 bg-white text-ink placeholder:text-mist"
              }`}
            />
          </form>

          <div className="relative">
            {user ? (
              <button
                type="button"
                className="flex items-center gap-2 rounded-full px-2 py-2 text-sm transition hover:bg-ink/5"
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                onClick={() => setAccountOpen((open) => !open)}
              >
                <IconUser />
                <span className="hidden max-w-24 truncate lg:inline">{user.name.split(" ")[0]}</span>
              </button>
            ) : (
              <Link to="/login" className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-ink/5" aria-label="Log in">
                <IconUser />
              </Link>
            )}
            {accountOpen && user ? (
              <div className="absolute right-0 top-12 w-52 rounded-2xl border border-ink/10 bg-foam p-2 text-ink shadow-[0_18px_40px_-24px_rgba(20,18,16,0.45)]">
                <p className="px-3 py-2 text-xs text-mist">{user.email}</p>
                <Link to="/cart" className="block rounded-xl px-3 py-2 text-sm hover:bg-sand" onClick={() => setAccountOpen(false)}>
                  Your bag
                </Link>
                <button
                  type="button"
                  className="block w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-sand"
                  onClick={() => {
                    logout();
                    setAccountOpen(false);
                  }}
                >
                  Log out
                </button>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            className="relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-ink/5"
            aria-label={`Open bag, ${count} items`}
            onClick={() => {
              setMenuOpen(false);
              setDrawerOpen(true);
            }}
          >
            <IconBag />
            {count > 0 ? (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-copper px-1 text-[10px] font-medium text-white">
                {count}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 bg-paper px-5 py-6 text-ink md:hidden">
          <form onSubmit={submitSearch}>
            <label htmlFor="mobile-search" className="sr-only">
              Search earbuds
            </label>
            <input
              id="mobile-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search earbuds"
              className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-copper"
            />
          </form>
          <nav className="mt-8 flex flex-col gap-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className="font-serif text-4xl tracking-tight"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to={user ? "/cart" : "/login"} className="font-serif text-4xl tracking-tight" onClick={() => setMenuOpen(false)}>
              {user ? "Account" : "Login"}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
