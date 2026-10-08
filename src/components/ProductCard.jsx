import { Link } from "react-router-dom";
import { categoryLabel } from "../data/products";
import { useCart } from "../context/CartContext";
import { formatPrice, salePercent } from "../lib/ui";
import ProductVisual from "./ProductVisual";
import Rating from "./Rating";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const savings = salePercent(product);

  return (
    <article className="sheen group flex h-full flex-col">
      <Link
        to={`/products/${product.id}`}
        aria-label={product.name}
        className="relative block aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-sand"
      >
        <ProductVisual
          palette={product.palette}
          variant={product.variant}
          compact={product.compact}
          className="h-full w-full transition duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2">
          {product.badge ? (
            <span className="rounded-full bg-paper/95 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-ink">
              {product.badge}
            </span>
          ) : null}
          {savings > 0 ? (
            <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-paper">
              Save {savings}%
            </span>
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-1 pt-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-mist">
          {categoryLabel(product.category)}
        </p>
        <Link to={`/products/${product.id}`} className="mt-1 font-serif text-2xl tracking-tight text-ink">
          {product.name}
        </Link>
        <p className="mt-1 text-sm text-mist">{product.tagline}</p>
        <Rating value={product.rating} count={product.reviewCount} className="mt-3" />
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p className="text-ink">
            <span className="text-lg font-medium">{formatPrice(product.price)}</span>
            {product.compareAt ? (
              <span className="ml-2 text-sm text-mist line-through">{formatPrice(product.compareAt)}</span>
            ) : null}
          </p>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-paper"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
