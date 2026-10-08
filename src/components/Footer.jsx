import { useState } from "react";
import { Link } from "react-router-dom";
import { validEmail } from "../lib/ui";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subscribe = (event) => {
    event.preventDefault();
    if (!validEmail(email)) {
      setMessage("Enter a valid email to join the list.");
      return;
    }
    setMessage("You are on the list. We will write when a new pair ships.");
    setEmail("");
  };

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-serif text-3xl tracking-tight">
            Velune<span className="text-copper">.</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
            Wireless earbuds voiced by ear in Copenhagen. Quiet rooms, long days, and the walk between them.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-paper/50">Shop</p>
            <ul className="mt-4 space-y-2 text-sm text-paper/80">
              <li><Link className="hover:text-paper" to="/products">All earbuds</Link></li>
              <li><Link className="hover:text-paper" to="/products?category=noise-cancelling">Noise cancelling</Link></li>
              <li><Link className="hover:text-paper" to="/products?category=sport">Sport</Link></li>
              <li><Link className="hover:text-paper" to="/products?category=studio">Studio</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-paper/50">Visit</p>
            <ul className="mt-4 space-y-2 text-sm text-paper/80">
              <li><Link className="hover:text-paper" to="/">Home</Link></li>
              <li><Link className="hover:text-paper" to="/about">About</Link></li>
              <li><Link className="hover:text-paper" to="/contact">Contact</Link></li>
              <li><Link className="hover:text-paper" to="/login">Login</Link></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-[11px] uppercase tracking-[0.18em] text-paper/50">Support</p>
            <ul className="mt-4 space-y-2 text-sm text-paper/80">
              <li>Free shipping over $150</li>
              <li>30-day home trial</li>
              <li>2-year warranty</li>
              <li>hello@velune.audio</li>
            </ul>
          </div>
        </div>
        <form onSubmit={subscribe} className="lg:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-paper/50">Notes from the bench</p>
          <label htmlFor="footer-email" className="mt-4 block text-sm text-paper/80">
            New colors and listening notes. No weekly noise.
          </label>
          <div className="mt-3 flex gap-2">
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              className="min-w-0 flex-1 rounded-full border border-paper/20 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-paper/40 focus:border-paper"
            />
            <button type="submit" className="shrink-0 rounded-full bg-paper px-4 py-3 text-sm font-medium text-ink transition hover:bg-white">
              Join
            </button>
          </div>
          {message ? <p className="mt-3 text-sm text-paper/70">{message}</p> : null}
        </form>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Velune. Demo storefront.</p>
          <p>Tuned for everyday listening.</p>
        </div>
      </div>
    </footer>
  );
}
