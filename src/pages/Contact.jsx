import { useState } from "react";
import Container from "../components/Container";
import { usePageTitle } from "../components/PageTitle";
import { fieldClass, primaryBtn, validEmail } from "../lib/ui";

const topics = ["Order", "Product advice", "Press", "Something else"];

export default function Contact() {
  usePageTitle("Contact");
  const [form, setForm] = useState({ name: "", email: "", topic: "Order", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !validEmail(form.email) || form.message.trim().length < 8) {
      setError("Add your name, a valid email, and a short message.");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <div className="pb-20 pt-12 md:pb-28 md:pt-16">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-copper">Contact</p>
          <h1 className="mt-3 font-serif text-5xl tracking-tight md:text-6xl">Write the bench.</h1>
          <p className="mt-4 max-w-md text-mist leading-relaxed">
            Orders, fit questions, and press. We reply on weekdays. This form stays in your browser — nothing is sent to a server.
          </p>
          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-mist">Email</dt>
              <dd className="mt-1 text-lg">hello@velune.audio</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-mist">Studio</dt>
              <dd className="mt-1 text-lg">Nørrebro, Copenhagen</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-mist">Hours</dt>
              <dd className="mt-1 text-lg">Tuesday – Saturday, 10:00–18:00 CET</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-[1.8rem] bg-foam p-6 sm:p-8">
          {sent ? (
            <div>
              <h2 className="font-serif text-4xl">Message noted.</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                Thanks, {form.name.split(" ")[0]}. In this demo the note stays on the page. A real studio would write back to {form.email}.
              </p>
              <button
                type="button"
                className={`${primaryBtn} mt-8`}
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", topic: "Order", message: "" });
                }}
              >
                Write another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="contact-name" className="text-sm">Name</label>
                <input id="contact-name" value={form.name} onChange={update("name")} className={`${fieldClass} mt-2`} />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm">Email</label>
                <input id="contact-email" type="email" value={form.email} onChange={update("email")} className={`${fieldClass} mt-2`} />
              </div>
              <div>
                <label htmlFor="contact-topic" className="text-sm">Topic</label>
                <select id="contact-topic" value={form.topic} onChange={update("topic")} className={`${fieldClass} mt-2`}>
                  {topics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className="text-sm">Message</label>
                <textarea id="contact-message" rows="5" value={form.message} onChange={update("message")} className={`${fieldClass} mt-2 resize-y`} />
              </div>
              {error ? <p className="text-sm text-clay" role="alert">{error}</p> : null}
              <button type="submit" className={`${primaryBtn} w-full`}>
                Send message
              </button>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}
