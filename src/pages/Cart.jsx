import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { usePageTitle } from "../components/PageTitle";
import ProductVisual from "../components/ProductVisual";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { fieldClass, formatPrice, primaryBtn, validEmail } from "../lib/ui";

function digitsOnly(value, max) {
  return value.replace(/\D/g, "").slice(0, max);
}

function formatCardNumber(value) {
  return digitsOnly(value, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value) {
  const digits = digitsOnly(value, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function luhnValid(number) {
  let sum = 0;
  let alternate = false;
  for (let index = number.length - 1; index >= 0; index -= 1) {
    let digit = Number(number[index]);
    if (alternate) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

function expiryValid(value) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!match) return false;
  const month = Number(match[1]);
  if (month < 1 || month > 12) return false;
  const end = new Date(2000 + Number(match[2]), month, 1);
  return end > new Date();
}

export default function Cart() {
  usePageTitle("Your bag");
  const { user } = useAuth();
  const { items, updateQty, removeItem, subtotal, discount, shipping, total, promo, applyPromo, clearCart } = useCart();
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [checkingOut, setCheckingOut] = useState(false);
  const [order, setOrder] = useState(null);
  const [details, setDetails] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    address: "",
    city: "",
    postal: "",
    country: "United States",
  });
  const [payment, setPayment] = useState({
    name: user?.name ?? "",
    number: "",
    expiry: "",
    cvc: "",
  });
  const [formError, setFormError] = useState("");

  const apply = (event) => {
    event.preventDefault();
    const result = applyPromo(code);
    setCodeError(result.ok ? "" : result.error);
    if (result.ok) setCode("");
  };

  const placeOrder = (event) => {
    event.preventDefault();
    if (!details.name.trim() || !validEmail(details.email) || !details.address.trim() || !details.city.trim() || !details.postal.trim()) {
      setFormError("Add a name, email, street, city, and postal code.");
      return;
    }
    const cardNumber = payment.number.replace(/\s/g, "");
    if (!payment.name.trim() || cardNumber.length < 13 || !luhnValid(cardNumber)) {
      setFormError("Enter the name on the card and a valid card number.");
      return;
    }
    if (!expiryValid(payment.expiry)) {
      setFormError("Enter an expiry date that is still current, as MM/YY.");
      return;
    }
    if (!/^\d{3,4}$/.test(payment.cvc)) {
      setFormError("Enter the 3-digit security code on the card.");
      return;
    }
    const snapshot = {
      number: `VL-${Math.floor(10000 + Math.random() * 90000)}`,
      email: details.email.trim(),
      name: details.name.trim(),
      total,
      count: items.reduce((sum, item) => sum + item.qty, 0),
      card: `•••• ${cardNumber.slice(-4)}`,
    };
    clearCart();
    setPayment({ name: "", number: "", expiry: "", cvc: "" });
    setOrder(snapshot);
    setCheckingOut(false);
  };

  if (order) {
    return (
      <Container className="py-20 md:py-28">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-copper">Order {order.number}</p>
        <h1 className="mt-3 max-w-xl font-serif text-5xl tracking-tight text-balance md:text-6xl">
          Thank you, {order.name.split(" ")[0]}. The bench has it.
        </h1>
        <p className="mt-4 max-w-lg text-mist leading-relaxed">
          This is a demo checkout, so card {order.card} was not charged. A confirmation would go to {order.email}. {order.count}{" "}
          {order.count === 1 ? "pair" : "items"} · {formatPrice(order.total)}.
        </p>
        <Link to="/products" className={`${primaryBtn} mt-8`}>
          Keep listening
        </Link>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-20 md:py-28">
        <h1 className="font-serif text-5xl tracking-tight md:text-6xl">Your bag is empty.</h1>
        <p className="mt-3 max-w-md text-mist">The collection is eight pairs. Start with the room you listen in.</p>
        <Link to="/products" className={`${primaryBtn} mt-8`}>
          Shop earbuds
        </Link>
      </Container>
    );
  }

  return (
    <div className="pb-20 pt-10 md:pb-28 md:pt-14">
      <Container className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
        <div>
          <h1 className="font-serif text-5xl tracking-tight">Your bag</h1>
          <p className="mt-2 text-sm text-mist">{user ? `Signed in as ${user.email}` : "Checking out as a guest is fine."}</p>
          <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            {items.map((item) => (
              <li key={item.key} className="flex gap-4 py-5">
                <Link to={`/products/${item.id}`} className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl">
                  <ProductVisual palette={item.palette} variant={item.variant} compact={item.compact} className="h-full w-full" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link to={`/products/${item.id}`} className="font-serif text-2xl">
                        {item.name}
                      </Link>
                      <p className="text-sm text-mist">{item.color}</p>
                    </div>
                    <p className="font-medium">{formatPrice(item.price * item.qty)}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-ink/15">
                      <button type="button" className="px-3 py-1.5" aria-label="Decrease quantity" onClick={() => updateQty(item.key, item.qty - 1)}>
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{item.qty}</span>
                      <button type="button" className="px-3 py-1.5" aria-label="Increase quantity" onClick={() => updateQty(item.key, item.qty + 1)}>
                        +
                      </button>
                    </div>
                    <button type="button" className="text-sm text-mist underline-offset-4 hover:text-ink hover:underline" onClick={() => removeItem(item.key)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {checkingOut ? (
            <form id="checkout" onSubmit={placeOrder} className="mt-10 space-y-10" noValidate>
              <section>
                <h2 className="font-serif text-3xl tracking-tight">Delivery</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {[
                    ["name", "Full name", "text", "name"],
                    ["email", "Email", "email", "email"],
                    ["address", "Street address", "text", "street-address"],
                    ["city", "City", "text", "address-level2"],
                    ["postal", "Postal code", "text", "postal-code"],
                  ].map(([key, label, type, autoComplete]) => (
                    <div key={key} className={key === "address" ? "sm:col-span-2" : ""}>
                      <label htmlFor={`ship-${key}`} className="text-sm">{label}</label>
                      <input
                        id={`ship-${key}`}
                        type={type}
                        autoComplete={autoComplete}
                        value={details[key]}
                        onChange={(event) => setDetails((current) => ({ ...current, [key]: event.target.value }))}
                        className={`${fieldClass} mt-1.5`}
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="ship-country" className="text-sm">Country</label>
                    <select
                      id="ship-country"
                      autoComplete="country-name"
                      value={details.country}
                      onChange={(event) => setDetails((current) => ({ ...current, country: event.target.value }))}
                      className={`${fieldClass} mt-1.5`}
                    >
                      {["United States", "Denmark", "United Kingdom", "Canada", "Germany"].map((country) => (
                        <option key={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-3xl tracking-tight">Payment</h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-mist">
                  Card details stay on this page for the demo. Nothing is charged. Try 4242 4242 4242 4242, a future expiry, and any 3-digit code.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="card-name" className="text-sm">Name on card</label>
                    <input
                      id="card-name"
                      autoComplete="cc-name"
                      value={payment.name}
                      onChange={(event) => setPayment((current) => ({ ...current, name: event.target.value }))}
                      className={`${fieldClass} mt-1.5`}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="card-number" className="text-sm">Card number</label>
                    <input
                      id="card-number"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="1234 5678 9012 3456"
                      value={payment.number}
                      onChange={(event) => setPayment((current) => ({ ...current, number: formatCardNumber(event.target.value) }))}
                      className={`${fieldClass} mt-1.5 tracking-wide`}
                    />
                  </div>
                  <div>
                    <label htmlFor="card-expiry" className="text-sm">Expiry</label>
                    <input
                      id="card-expiry"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM/YY"
                      value={payment.expiry}
                      onChange={(event) => setPayment((current) => ({ ...current, expiry: formatExpiry(event.target.value) }))}
                      className={`${fieldClass} mt-1.5`}
                    />
                  </div>
                  <div>
                    <label htmlFor="card-cvc" className="text-sm">Security code</label>
                    <input
                      id="card-cvc"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      value={payment.cvc}
                      onChange={(event) => setPayment((current) => ({ ...current, cvc: digitsOnly(event.target.value, 4) }))}
                      className={`${fieldClass} mt-1.5`}
                    />
                  </div>
                </div>
              </section>
              {formError ? <p className="text-sm text-clay" role="alert">{formError}</p> : null}
            </form>
          ) : null}
        </div>

        <aside className="rounded-[1.6rem] bg-foam p-6 lg:sticky lg:top-24">
          <h2 className="font-serif text-2xl">Summary</h2>
          <form onSubmit={apply} className="mt-4 flex gap-2">
            <label htmlFor="cart-code" className="sr-only">Offer code</label>
            <input id="cart-code" value={code} onChange={(event) => setCode(event.target.value)} placeholder="Offer code" className={fieldClass} />
            <button type="submit" className="rounded-full border border-ink/15 px-4 text-sm">
              Apply
            </button>
          </form>
          <p className="mt-2 text-xs text-mist">{codeError || (promo ? `${promo} applied` : "Try VELUNE10 or VELUNE20")}</p>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-mist">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-mist">Offer</dt>
              <dd>{discount > 0 ? `−${formatPrice(discount)}` : formatPrice(0)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-mist">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-medium">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-mist">Shipping is free over $150 after offers. Otherwise $12.</p>

          {checkingOut ? (
            <>
              {formError ? <p className="mt-4 text-sm text-clay" role="alert">{formError}</p> : null}
              <button type="submit" form="checkout" className={`${primaryBtn} mt-4 w-full`}>
                Pay {formatPrice(total)}
              </button>
            </>
          ) : (
            <button type="button" className={`${primaryBtn} mt-6 w-full`} onClick={() => setCheckingOut(true)}>
              Checkout
            </button>
          )}
        </aside>
      </Container>
    </div>
  );
}
