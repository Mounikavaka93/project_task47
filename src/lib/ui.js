export const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium tracking-wide text-paper transition duration-300 hover:-translate-y-0.5 hover:bg-copper disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40";

export const lightBtn =
  "inline-flex items-center justify-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-medium tracking-wide text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-white";

export const ghostBtn =
  "inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-transparent px-6 py-3 text-sm font-medium tracking-wide transition duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-paper";

export const ghostLightBtn =
  "inline-flex items-center justify-center gap-2 rounded-full border border-paper/30 px-6 py-3 text-sm font-medium tracking-wide text-paper transition duration-300 hover:-translate-y-0.5 hover:bg-paper hover:text-ink";

export const fieldClass =
  "w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-mist/70 focus:border-copper";

export function formatPrice(value) {
  const hasCents = Math.round(Number(value) * 100) % 100 !== 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function salePercent(product) {
  if (!product.compareAt || product.compareAt <= product.price) return 0;
  return Math.round(((product.compareAt - product.price) / product.compareAt) * 100);
}

export const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
