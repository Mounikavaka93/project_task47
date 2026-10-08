import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/ui";
import { IconClose } from "./Icons";
import ProductVisual from "./ProductVisual";

export default function CartDrawer() {
  const { items, drawerOpen, setDrawerOpen, updateQty, removeItem, subtotal, count } = useCart();
  const [code, setCode] = useState("");
  const { applyPromo, promo, discount } = useCart();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen, setDrawerOpen]);

  if (!drawerOpen) return null;

  const submitCode = (event) => {
    event.preventDefault();
    const result = applyPromo(code);
    setError(result.ok ? "" : result.error);
  };

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="fade-in absolute inset-0 bg-ink/40"
        aria-label="Close bag"
        onClick={() => setDrawerOpen(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className="sheet-in absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="font-serif text-2xl">Your bag {count > 0 ? <span className="text-mist">({count})</span> : null}</h2>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full hover:bg-sand" onClick={() => setDrawerOpen(false)} aria-label="Close">
            <IconClose />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-start justify-center">
              <p className="font-serif text-3xl">The bag is empty.</p>
              <p className="mt-2 text-sm text-mist">Eight pairs are waiting in the collection.</p>
              <Link to="/products" onClick={() => setDrawerOpen(false)} className="mt-6 rounded-full bg-ink px-5 py-3 text-sm text-paper">
                Shop earbuds
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.key} className="flex gap-3">
                <Link to={`/products/${item.id}`} onClick={() => setDrawerOpen(false)} className="h-24 w-20 shrink-0 overflow-hidden rounded-2xl">
                  <ProductVisual palette={item.palette} variant={item.variant} compact={item.compact} className="h-full w-full" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link to={`/products/${item.id}`} onClick={() => setDrawerOpen(false)} className="font-medium">
                        {item.name}
                      </Link>
                      <p className="text-sm text-mist">{item.color}</p>
                    </div>
                    <p className="text-sm font-medium">{formatPrice(item.price * item.qty)}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-ink/15">
                      <button type="button" className="px-3 py-1.5 text-sm" aria-label="Decrease quantity" onClick={() => updateQty(item.key, item.qty - 1)}>
                        −
                      </button>
                      <span className="w-5 text-center text-sm">{item.qty}</span>
                      <button type="button" className="px-3 py-1.5 text-sm" aria-label="Increase quantity" onClick={() => updateQty(item.key, item.qty + 1)}>
                        +
                      </button>
                    </div>
                    <button type="button" className="text-sm text-mist underline-offset-4 hover:text-ink hover:underline" onClick={() => removeItem(item.key)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 ? (
          <div className="border-t border-ink/10 px-5 py-5">
            <form onSubmit={submitCode} className="flex gap-2">
              <label htmlFor="drawer-code" className="sr-only">
                Offer code
              </label>
              <input
                id="drawer-code"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Offer code"
                className="w-full rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-copper"
              />
              <button type="submit" className="rounded-full border border-ink/15 px-4 text-sm">
                Apply
              </button>
            </form>
            <p className="mt-2 text-xs text-mist">{error || (promo ? `${promo} applied` : "Try VELUNE10 or VELUNE20")}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-mist">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 ? (
              <div className="mt-1 flex items-center justify-between text-sm text-copper">
                <span>Offer</span>
                <span>−{formatPrice(discount)}</span>
              </div>
            ) : null}
            <Link
              to="/cart"
              onClick={() => setDrawerOpen(false)}
              className="mt-4 flex w-full items-center justify-center rounded-full bg-ink py-3 text-sm font-medium text-paper transition hover:bg-copper"
            >
              Review bag
            </Link>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
