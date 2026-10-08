import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePageTitle } from "../components/PageTitle";
import { useAuth } from "../context/AuthContext";
import { fieldClass, primaryBtn, validEmail } from "../lib/ui";
import { AuthSplit } from "./Login";

export default function Signup() {
  usePageTitle("Sign up");
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    if (form.name.trim().length < 2) {
      setError("Add the name you want on the account.");
      return;
    }
    if (!validEmail(form.email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Use at least 6 characters for the password.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Those passwords do not match.");
      return;
    }
    const result = signup(form);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/");
  };

  return (
    <AuthSplit
      title={user ? "You already have a seat" : "Create an account"}
      subtitle={user ? `${user.email} is signed in on this browser.` : "A name, an email, and a password. Stored only on this device."}
    >
      {user ? (
        <Link to="/products" className={`${primaryBtn} w-full`}>
          Continue shopping
        </Link>
      ) : (
        <form onSubmit={submit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="signup-name" className="text-sm">Name</label>
            <input id="signup-name" autoComplete="name" value={form.name} onChange={update("name")} className={`${fieldClass} mt-2`} />
          </div>
          <div>
            <label htmlFor="signup-email" className="text-sm">Email</label>
            <input id="signup-email" type="email" autoComplete="email" value={form.email} onChange={update("email")} className={`${fieldClass} mt-2`} />
          </div>
          <div>
            <label htmlFor="signup-password" className="text-sm">Password</label>
            <div className="relative mt-2">
              <input
                id="signup-password"
                type={show ? "text" : "password"}
                autoComplete="new-password"
                value={form.password}
                onChange={update("password")}
                className={`${fieldClass} pr-16`}
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-mist" onClick={() => setShow((value) => !value)}>
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="signup-confirm" className="text-sm">Confirm password</label>
            <input
              id="signup-confirm"
              type={show ? "text" : "password"}
              autoComplete="new-password"
              value={form.confirm}
              onChange={update("confirm")}
              className={`${fieldClass} mt-2`}
            />
          </div>
          {error ? <p className="text-sm text-clay" role="alert">{error}</p> : null}
          <button type="submit" className={`${primaryBtn} w-full`}>
            Create account
          </button>
          <p className="text-sm text-mist">
            Already listening?{" "}
            <Link to="/login" className="text-ink underline decoration-copper underline-offset-4">
              Log in
            </Link>
          </p>
        </form>
      )}
    </AuthSplit>
  );
}
