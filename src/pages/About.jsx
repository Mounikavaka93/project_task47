import { Link } from "react-router-dom";
import Container from "../components/Container";
import { usePageTitle } from "../components/PageTitle";
import { primaryBtn } from "../lib/ui";

const principles = [
  {
    title: "Silence with a contour",
    copy: "Cancellation should take the room down, not scoop the voice out of a call. We tune ANC against speech before we tune it against engine noise.",
  },
  {
    title: "Fit before features",
    copy: "Three tip sizes, and a shape checked on long commutes. A spec sheet cannot tell you whether a bud still feels kind at hour four.",
  },
  {
    title: "Repairable on purpose",
    copy: "Tips, wings, and batteries stay available for two years. A pair you can service is a pair you keep.",
  },
];

export default function About() {
  usePageTitle("About");

  return (
    <div className="pb-20 md:pb-28">
      <section className="bg-ink text-paper">
        <Container className="grid items-end gap-10 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-copper">About Velune</p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-tight text-balance md:text-7xl">
              Voiced by ear. Kept that way.
            </h1>
          </div>
          <p className="max-w-md text-paper/75 leading-relaxed">
            Velune started as a tuning bench in Nørrebro. We still sign off every model in the same room — against a piano, a crowded street, and a quiet hour after the city thins out.
          </p>
        </Container>
      </section>

      <Container className="py-16 md:py-24">
        <div className="overflow-hidden rounded-[2rem]">
          <img
            src="/products/case.jpg"
            alt="Black earbuds and an open case under red and blue studio light"
            className="aspect-[16/8] w-full object-cover"
          />
        </div>
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="font-serif text-3xl leading-snug tracking-tight text-balance md:text-4xl">
            “We would rather ship eight pairs we can explain than a catalog we have to apologize for.”
          </p>
          <div className="grid gap-8">
            {principles.map((item) => (
              <article key={item.title}>
                <h2 className="font-serif text-2xl">{item.title}</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist md:text-base">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>

      <section className="bg-sand">
        <Container className="grid gap-8 py-16 md:grid-cols-3 md:py-20">
          {[
            ["Copenhagen", "Bench, voicing, and support."],
            ["Eight models", "Wireless only. No filler SKUs."],
            ["Two-year care", "Battery and driver coverage."],
          ].map(([title, copy]) => (
            <div key={title}>
              <p className="font-serif text-3xl">{title}</p>
              <p className="mt-2 text-sm text-mist">{copy}</p>
            </div>
          ))}
        </Container>
      </section>

      <Container className="pt-16 text-center md:pt-24">
        <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Hear the current collection.</h2>
        <Link to="/products" className={`${primaryBtn} mt-8`}>
          Shop earbuds
        </Link>
      </Container>
    </div>
  );
}
