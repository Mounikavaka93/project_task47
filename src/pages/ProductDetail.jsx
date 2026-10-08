import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/Container";
import { usePageTitle } from "../components/PageTitle";
import ProductCard from "../components/ProductCard";
import ProductVisual from "../components/ProductVisual";
import Rating, { StarPicker } from "../components/Rating";
import { categoryLabel, getProduct, relatedProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { fieldClass, formatPrice, ghostBtn, primaryBtn, salePercent } from "../lib/ui";

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(id);
  usePageTitle(product ? product.name : "Not found");

  if (!product) {
    return (
      <Container className="py-24">
        <h1 className="font-serif text-5xl">That pair is not in the collection.</h1>
        <Link to="/products" className={`${primaryBtn} mt-8`}>
          Back to earbuds
        </Link>
      </Container>
    );
  }

  return <Detail product={product} />;
}

function Detail({ product }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [colorName, setColorName] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState(product.reviews);
  const [form, setForm] = useState({ name: "", title: "", body: "", rating: 5 });
  const [reviewNote, setReviewNote] = useState("");

  useEffect(() => {
    setColorName(product.colors[0].name);
    setQty(1);
    setReviews(product.reviews);
    setReviewNote("");
    setForm({ name: "", title: "", body: "", rating: 5 });
  }, [product]);

  const color = product.colors.find((entry) => entry.name === colorName) ?? product.colors[0];
  const savings = salePercent(product);
  const suggestions = relatedProducts(product);

  const add = (open) => addItem(product, { color: color.name, palette: color.palette, qty, open });

  const submitReview = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.body.trim()) {
      setReviewNote("Add your name and a few words about the pair.");
      return;
    }
    setReviews((current) => [
      {
        id: `local-${Date.now()}`,
        name: form.name.trim(),
        rating: form.rating,
        title: form.title.trim() || "Listener note",
        body: form.body.trim(),
        date: "Just now",
      },
      ...current,
    ]);
    setForm({ name: "", title: "", body: "", rating: 5 });
    setReviewNote("Thanks — your note is on this page for this visit.");
  };

  return (
    <div className="pb-20 pt-8 md:pb-28 md:pt-12">
      <Container>
        <nav className="text-sm text-mist">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="px-2">/</span>
          <Link to="/products" className="hover:text-ink">Products</Link>
          <span className="px-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="mt-6 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[2rem]">
              <ProductVisual
                palette={color.palette}
                variant={product.variant}
                compact={product.compact}
                className="aspect-[4/5] w-full sm:aspect-[5/4]"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.colors.map((swatch) => {
                const selected = swatch.name === color.name;
                return (
                  <button
                    key={swatch.name}
                    type="button"
                    onClick={() => setColorName(swatch.name)}
                    aria-pressed={selected}
                    className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                      selected ? "border-ink bg-foam" : "border-ink/10 hover:border-ink/30"
                    }`}
                  >
                    <span className="h-4 w-4 rounded-full border border-ink/10" style={{ background: swatch.hex }} />
                    {swatch.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-copper">{categoryLabel(product.category)}</p>
            <h1 className="mt-2 font-serif text-5xl tracking-tight md:text-6xl">{product.name}</h1>
            <p className="mt-2 text-lg text-mist">{product.tagline}</p>
            <Rating value={product.rating} count={product.reviewCount} className="mt-4" />

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <p className="font-serif text-4xl">{formatPrice(product.price)}</p>
              {product.compareAt ? (
                <p className="pb-1 text-lg text-mist line-through">{formatPrice(product.compareAt)}</p>
              ) : null}
              {savings > 0 ? (
                <p className="mb-1 rounded-full bg-ink px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-paper">
                  Save {formatPrice(product.compareAt - product.price)}
                </p>
              ) : null}
            </div>
            <p className="mt-3 text-sm text-mist">In stock — ships in 2 days. Free shipping over $150.</p>

            <p className="mt-6 max-w-xl leading-relaxed text-ink/80">{product.description}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-ink/15">
                <button type="button" className="px-4 py-3" aria-label="Decrease quantity" onClick={() => setQty((value) => Math.max(1, value - 1))}>
                  −
                </button>
                <span className="w-6 text-center text-sm">{qty}</span>
                <button type="button" className="px-4 py-3" aria-label="Increase quantity" onClick={() => setQty((value) => Math.min(8, value + 1))}>
                  +
                </button>
              </div>
              <button type="button" className={primaryBtn} onClick={() => add(true)}>
                Add to bag
              </button>
              <button
                type="button"
                className={ghostBtn}
                onClick={() => {
                  add(false);
                  navigate("/cart");
                }}
              >
                Buy now
              </button>
            </div>

            <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {product.specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 py-3 text-sm">
                  <dt className="text-mist">{spec.label}</dt>
                  <dd className="text-right">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-6 grid gap-2 text-sm text-mist sm:grid-cols-2">
              {product.shipping.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-20 border-t border-ink/10 pt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-copper">Reviews</p>
              <h2 className="mt-2 font-serif text-4xl tracking-tight">What listeners noticed</h2>
            </div>
            <Rating value={product.rating} count={product.reviewCount} />
          </div>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              {reviews.map((review) => (
                <article key={review.id} className="rounded-[1.4rem] bg-foam p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Rating value={review.rating} />
                    <p className="text-xs text-mist">{review.date}</p>
                  </div>
                  <h3 className="mt-3 font-medium">{review.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">{review.body}</p>
                  <p className="mt-4 text-sm text-mist">{review.name}</p>
                </article>
              ))}
            </div>
            <form onSubmit={submitReview} className="h-fit rounded-[1.4rem] border border-ink/10 bg-white p-5">
              <h3 className="font-serif text-2xl">Write a review</h3>
              <p className="mt-1 text-sm text-mist">Saved on this page for your visit.</p>
              <div className="mt-4">
                <StarPicker value={form.rating} onChange={(rating) => setForm((current) => ({ ...current, rating }))} />
              </div>
              <label className="mt-4 block text-sm" htmlFor="review-name">
                Name
              </label>
              <input id="review-name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className={`${fieldClass} mt-2`} />
              <label className="mt-4 block text-sm" htmlFor="review-title">
                Title
              </label>
              <input id="review-title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} className={`${fieldClass} mt-2`} />
              <label className="mt-4 block text-sm" htmlFor="review-body">
                Review
              </label>
              <textarea id="review-body" rows="4" value={form.body} onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))} className={`${fieldClass} mt-2 resize-y`} />
              {reviewNote ? <p className="mt-3 text-sm text-copper">{reviewNote}</p> : null}
              <button type="submit" className={`${primaryBtn} mt-4 w-full`}>
                Publish review
              </button>
            </form>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-serif text-4xl tracking-tight">Also in the studio</h2>
          <div className="mt-8 grid items-stretch gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
