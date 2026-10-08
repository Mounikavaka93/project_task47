import { Link } from "react-router-dom";
import Container from "../components/Container";
import { usePageTitle } from "../components/PageTitle";
import { primaryBtn } from "../lib/ui";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <Container className="py-24">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-copper">404</p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight">This page is out of the collection.</h1>
      <Link to="/" className={`${primaryBtn} mt-8`}>
        Back home
      </Link>
    </Container>
  );
}
