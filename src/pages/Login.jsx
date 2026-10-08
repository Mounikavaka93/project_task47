import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePageTitle } from "../components/PageTitle";
import { useAuth } from "../context/AuthContext";
import { fieldClass, ghostBtn, primaryBtn, validEmail } from "../lib/ui";

export default function Login() {
  usePageTitle("Login");
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (!validEmail(form.email) || !form.password) {
      setError("Enter the email and password for your account.");
      return;
    }
    const result = login(form);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/");
  };

  return (
    <AuthSplit
      title={user ? `Hello, ${user.name.split(" ")[0]}` : "Welcome back"}
      subtitle={user ? "You are signed in on this browser." : "Sign in to keep a bag and a name on this device."}
    >
      {user ? (
        <div className="space-y-3">
          <p className="text-sm text-mist">{user.email}</p>
          <Link to="/products" className={`${primaryBtn} w-full`}>
            Continue shopping
          </Link>
          <button type="button" className={`${ghostBtn} w-full`} onClick={logout}>
            Log out
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="login-email" className="text-sm">Email</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className={`${fieldClass} mt-2`}
            />
          </div>
          <div>
            <label htmlFor="login-password" className="text-sm">Password</label>
            <div className="relative mt-2">
              <input
                id="login-password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                className={`${fieldClass} pr-16`}
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-mist" onClick={() => setShow((value) => !value)}>
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {error ? <p className="text-sm text-clay" role="alert">{error}</p> : null}
          <button type="submit" className={`${primaryBtn} w-full`}>
            Log in
          </button>
          <p className="text-sm text-mist">
            New here?{" "}
            <Link to="/signup" className="text-ink underline decoration-copper underline-offset-4">
              Create an account
            </Link>
          </p>
          <p className="rounded-2xl bg-sand/70 px-4 py-3 text-xs leading-relaxed text-mist">
            Demo account: demo@velune.com · listen123. Accounts stay in this browser only.
          </p>
        </form>
      )}
    </AuthSplit>
  );
}

export function AuthSplit({ title, subtitle, children }) {
  return (
    <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-6xl items-center gap-10 px-5 py-10 md:px-8 lg:grid-cols-2 lg:py-14">
      <div className="relative hidden min-h-[32rem] overflow-hidden rounded-[2rem] bg-ink lg:block">
        <img src="/products/case.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="absolute bottom-0 p-10 text-paper">
          <p className="font-serif text-4xl leading-tight">Quiet is a feature.</p>
          <p className="mt-3 max-w-sm text-sm text-paper/75">A small collection, tuned in one room, sold without a maze of models.</p>
        </div>
      </div>
      <div className="mx-auto w-full max-w-md">
        <h1 className="font-serif text-5xl tracking-tight">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-mist">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
