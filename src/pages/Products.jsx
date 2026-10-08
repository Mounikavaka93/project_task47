import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../components/Container";
import { usePageTitle } from "../components/PageTitle";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import { categories, matchesPrice, priceFilters, products } from "../data/products";

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
];

export default function Products() {
  usePageTitle("Earbuds");
  const [params, setParams] = useSearchParams();
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("featured");

  const query = params.get("q") ?? "";
  const category = params.get("category") ?? "all";

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const haystack = [product.name, product.tagline, product.category, product.description].join(" ").toLowerCase();
      const matchesQuery = !needle || haystack.includes(needle);
      const matchesCategory = category === "all" || product.category === category;
      return matchesQuery && matchesCategory && matchesPrice(product, price);
    });

    const ranked = [...filtered];
    if (sort === "price-asc") ranked.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") ranked.sort((a, b) => b.price - a.price);
    if (sort === "rating") ranked.sort((a, b) => b.rating - a.rating);
    return ranked;
  }, [query, category, price, sort]);

  const filtersActive = Boolean(query) || category !== "all" || price !== "all" || sort !== "featured";

  return (
    <div className="pb-20 pt-10 md:pb-28 md:pt-14">
      <Container>
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-copper">The collection</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-serif text-5xl tracking-tight md:text-6xl">Earbuds</h1>
          <p className="max-w-sm text-sm leading-relaxed text-mist">
            Eight pairs. Search by name, or narrow by how you listen.
          </p>
        </div>

        <div className="sticky top-16 z-30 -mx-5 mt-8 border-y border-ink/10 bg-paper/90 px-5 py-4 backdrop-blur-md md:-mx-8 md:px-8">
          <div className="flex gap-2 overflow-x-auto pb-3">
            {categories.map((item) => {
              const active = category === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateParam("category", item.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                    active ? "bg-ink text-paper" : "border border-ink/10 bg-foam text-ink hover:border-ink/30"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center">
            <form
              onSubmit={(event) => event.preventDefault()}
              className="relative"
            >
              <label htmlFor="catalog-search" className="sr-only">
                Search products
              </label>
              <input
                id="catalog-search"
                value={query}
                onChange={(event) => updateParam("q", event.target.value)}
                placeholder="Search earbuds"
                className="w-full rounded-full border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-copper"
              />
            </form>
            <label className="sr-only" htmlFor="price-filter">
              Price
            </label>
            <select
              id="price-filter"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="rounded-full border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-copper"
            >
              {priceFilters.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <label className="sr-only" htmlFor="sort-filter">
              Sort
            </label>
            <select
              id="sort-filter"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-full border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-copper"
            >
              {sorts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-mist">
          <p>
            {visible.length} {visible.length === 1 ? "pair" : "pairs"}
          </p>
          {filtersActive ? (
            <button
              type="button"
              className="underline decoration-copper underline-offset-4"
              onClick={() => {
                setParams({}, { replace: true });
                setPrice("all");
                setSort("featured");
              }}
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {visible.length === 0 ? (
          <div className="mt-16 rounded-[1.6rem] bg-foam px-6 py-16 text-center">
            <h2 className="font-serif text-4xl">Nothing matches that search.</h2>
            <p className="mt-3 text-sm text-mist">Try a model name, or clear the filters and start from the full collection.</p>
          </div>
        ) : (
          <div className="mt-10 grid items-stretch gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product, index) => (
              <Reveal key={product.id} delay={(index % 3) * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
