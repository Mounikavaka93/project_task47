import { Link } from "react-router-dom";
import Container from "../components/Container";
import Marquee from "../components/Marquee";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import ProductVisual from "../components/ProductVisual";
import Rating from "../components/Rating";
import SectionHeading from "../components/SectionHeading";
import { usePageTitle } from "../components/PageTitle";
import { products, stories } from "../data/products";
import { formatPrice, ghostLightBtn, lightBtn } from "../lib/ui";

const tiles = [
  {
    category: "noise-cancelling",
    title: "Noise cancelling",
    copy: "Cabins, floors, and late trains.",
    palette: "obsidian",
    variant: "stem",
  },
  {
    category: "true-wireless",
    title: "True wireless",
    copy: "The pair that lives in a coat.",
    palette: "ivory",
    variant: "stem",
  },
  {
    category: "sport",
    title: "Sport & open",
    copy: "Stay in, or stay aware.",
    palette: "signal",
    variant: "bean",
  },
  {
    category: "studio",
    title: "Studio",
    copy: "A flatter second opinion.",
    palette: "graphite",
    variant: "stem",
  },
];

const assurances = [
  { title: "Free shipping", copy: "On orders over $150." },
  { title: "30-day trial", copy: "Listen at home, then decide." },
  { title: "2-year warranty", copy: "Drivers and battery covered." },
  { title: "Three tip sizes", copy: "A seal that is not a guess." },
];

export default function Home() {
  usePageTitle("");
  const featured = products.filter((product) => product.featured);
  const offers = products.filter((product) => product.compareAt);
  const noir = products.find((product) => product.spotlight);

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-[#141210] text-paper">
        <img
          src="/products/case.jpg"
          alt=""
          className="kenburns pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#141210]/92 via-[#141210]/72 to-[#141210]/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141210]/80 via-transparent to-[#141210]/50" />
        <Container className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-28 sm:justify-center sm:pb-24">
          <div className="max-w-xl">
            <p className="rise text-[11px] font-medium uppercase tracking-[0.24em] text-copper">Autumn listening</p>
            <h1 className="rise mt-4 font-serif text-5xl leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl" style={{ animationDelay: "80ms" }}>
              Sound, without the noise.
            </h1>
            <p className="rise mt-6 max-w-md text-base leading-relaxed text-paper/80 sm:text-lg" style={{ animationDelay: "160ms" }}>
              Wireless earbuds voiced by ear — for commutes, quiet rooms, and the hour in between.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
              <Link to="/products" className={lightBtn}>
                Shop the collection
              </Link>
              <Link to="/products/noir-anc" className={ghostLightBtn}>
                Explore Noir ANC
              </Link>
            </div>
            <p className="rise mt-8 text-sm text-paper/70" style={{ animationDelay: "320ms" }}>
              From {formatPrice(79)} · Up to 20% off flagship ANC
            </p>
          </div>
          {noir ? (
            <Link
              to="/products/noir-anc"
              className="float-y rise mt-10 flex w-full max-w-sm items-center justify-between gap-4 rounded-2xl border border-white/30 bg-paper/95 p-4 text-ink shadow-lg backdrop-blur sm:absolute sm:bottom-16 sm:right-8 sm:mt-0 sm:w-64 md:right-12"
              style={{ animationDelay: "280ms" }}
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-mist">Now in the studio</p>
                <p className="mt-1 font-serif text-2xl leading-none">Noir ANC</p>
                <Rating value={noir.rating} className="mt-2" />
              </div>
              <p className="font-medium">{formatPrice(noir.price)}</p>
            </Link>
          ) : null}
        </Container>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-paper" />
      </section>

      <Marquee />

      <section className="relative z-10 -mt-px">
        <Container>
          <div className="grid overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {assurances.map((item) => (
              <div key={item.title} className="bg-foam px-5 py-5">
                <p className="font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-mist">{item.copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="The collection"
            title="Four ways to listen."
            text="Same bench, different days. Filter the full set whenever you know the room you are walking into."
          />
          <div className="mt-10 grid items-stretch gap-3 md:grid-cols-4 md:grid-rows-2">
            {tiles.map((tile, index) => (
              <Reveal key={tile.category} delay={index * 90} className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}>
              <Link
                to={`/products?category=${tile.category}`}
                className={`sheen group relative block h-full min-h-64 overflow-hidden rounded-[1.6rem] ${index === 0 ? "md:min-h-[34rem]" : ""}`}
              >
                <ProductVisual
                  palette={tile.palette}
                  variant={tile.variant}
                  className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-paper">
                  <p className="font-serif text-3xl tracking-tight">{tile.title}</p>
                  <p className="mt-1 max-w-xs text-sm text-paper/80">{tile.copy}</p>
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <SectionHeading
            eyebrow="In rotation"
            title="Pairs we keep reaching for."
            action={
              <Link to="/products" className="text-sm font-medium underline decoration-copper underline-offset-4">
                View all
              </Link>
            }
          />
          <div className="mt-10 grid items-stretch gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, index) => (
              <Reveal key={product.id} delay={index * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {noir ? (
        <section className="bg-ink py-20 text-paper md:py-28">
          <Container className="grid items-center gap-12 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[2rem]">
              <ProductVisual palette="obsidian" variant="stem" className="aspect-[5/4] w-full" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-copper">Spotlight · Save {Math.round(((noir.compareAt - noir.price) / noir.compareAt) * 100)}%</p>
              <h2 className="mt-3 font-serif text-4xl tracking-tight text-balance md:text-6xl">{noir.name}</h2>
              <p className="mt-5 max-w-md text-paper/75 leading-relaxed">{noir.description}</p>
              <dl className="mt-8 grid grid-cols-3 gap-3 border-y border-paper/15 py-5 sm:gap-4">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-paper/50">Battery</dt>
                  <dd className="mt-1 whitespace-nowrap font-serif text-2xl sm:text-3xl">36h</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-paper/50">ANC</dt>
                  <dd className="mt-1 whitespace-nowrap font-serif text-2xl sm:text-3xl">42 dB</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-paper/50">Weight</dt>
                  <dd className="mt-1 whitespace-nowrap font-serif text-2xl sm:text-3xl">4.8g</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/products/noir-anc" className={lightBtn}>
                  Shop Noir ANC · {formatPrice(noir.price)}
                </Link>
                <span className="text-sm text-paper/50 line-through">{formatPrice(noir.compareAt)}</span>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Offers" title="Season prices, same tuning." text="Codes VELUNE10 and VELUNE20 still work in the bag." />
          <div className="mt-10 grid items-stretch gap-4 md:grid-cols-2">
            {offers.map((product, index) => (
              <Reveal key={product.id} delay={index * 70}>
              <Link
                to={`/products/${product.id}`}
                className="group flex h-full items-center gap-4 rounded-[1.6rem] border border-ink/10 bg-foam p-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-28px_rgba(20,18,16,0.55)] sm:gap-6 sm:p-4"
              >
                <div className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-28">
                  <ProductVisual palette={product.palette} variant={product.variant} compact={product.compact} className="h-full w-full transition duration-500 group-hover:scale-105" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-copper">{product.badge || "Offer"}</p>
                  <p className="mt-1 font-serif text-2xl">{product.name}</p>
                  <p className="mt-1 text-sm text-mist">{product.tagline}</p>
                  <p className="mt-3 text-sm">
                    <span className="font-medium">{formatPrice(product.price)}</span>
                    <span className="ml-2 text-mist line-through">{formatPrice(product.compareAt)}</span>
                  </p>
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <SectionHeading eyebrow="Reviews" title="From people who wear them all day." />
          <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-3">
            {stories.map((story, index) => (
              <Reveal key={story.id} delay={index * 90}>
              <figure className="flex h-full flex-col rounded-[1.6rem] bg-foam p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-28px_rgba(20,18,16,0.45)]">
                <Rating value={5} />
                <blockquote className="mt-5 flex-1 font-serif text-2xl leading-snug tracking-tight text-balance">
                  “{story.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm text-mist">
                  <span className="font-medium text-ink">{story.name}</span>
                  <span> · {story.detail}</span>
                </figcaption>
              </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="overflow-hidden rounded-[2rem] bg-sand px-6 py-14 text-center sm:px-12 md:py-20">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-copper">Find your pair</p>
            <h2 className="mx-auto mt-3 max-w-xl font-serif text-4xl tracking-tight text-balance md:text-6xl">
              Start with the room you listen in.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/products" className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:-translate-y-0.5 hover:bg-copper">
                Browse earbuds
              </Link>
              <Link to="/about" className="inline-flex rounded-full border border-ink/15 px-6 py-3 text-sm font-medium transition hover:-translate-y-0.5 hover:bg-ink hover:text-paper">
                Read the story
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
