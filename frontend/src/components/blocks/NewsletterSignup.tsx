// components/blocks/NewsletterSignup.tsx
//
// Footer signup: the visitor enters their email, a pop-up collects a few
// more details and the consent checkbox, then the form posts to
// /api/subscribe.
//
//   <NewsletterSignup />
//
// Pass lang="fr" on a French page. The visitor is not asked to pick a
// language — the page they signed up on decides what goes to Mailchimp.
//
// Styling follows the site's convention: global classes defined in
// src/app/epm.css (NEWSLETTER SIGNUP section), built on the EPM tokens.

"use client";

import { FormEvent, type Ref, useEffect, useId, useRef, useState } from "react";
import { COPY, ROLE_VALUES, type Lang } from "@/lib/newsletter-copy";

type Phase = "idle" | "details" | "submitting" | "done";
type ErrorKey = keyof (typeof COPY)["en"]["errors"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ── Shared state and submit ─────────────────────────────── */

function useNewsletter(lang: Lang) {
  const t = COPY[lang];
  const [phase, setPhase] = useState<Phase>("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<ErrorKey | null>(null);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    role: "",
    language: lang as Lang, // set by the page, not chosen by the visitor
    consent: false, // CASL: never pre-ticked
    website: "", // honeypot
  });

  function reset() {
    setEmail("");
    setForm((f) => ({ ...f, firstName: "", lastName: "", organization: "", role: "", consent: false }));
  }

  // Returns false when the form should stay open for the visitor to fix.
  async function send(): Promise<boolean> {
    if (!EMAIL_RE.test(email.trim())) {
      setError("invalid_email");
      return false;
    }
    if (!form.consent) {
      setError("consent_required");
      return false;
    }
    setError(null);
    setPhase("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), ...form }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        const key = (data.error as ErrorKey) in t.errors ? (data.error as ErrorKey) : "generic";
        setError(key);
        return false;
      }
      setAlreadySubscribed(data.status === "subscribed");
      setPhase("done");
      return true;
    } catch {
      setError("generic");
      return false;
    }
  }

  const update = (field: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return { t, phase, setPhase, email, setEmail, error, setError, alreadySubscribed, form, setForm, update, send, reset };
}

type Fields = ReturnType<typeof useNewsletter>;

/* ── Shared fields: name, org, role, consent, sender ─────── */

function NewsletterFields({
  id,
  state,
  firstFieldRef,
}: {
  id: string;
  state: Fields;
  firstFieldRef?: Ref<HTMLInputElement>;
}) {
  const { t, form, setForm, update } = state;
  return (
    <>
      <div className="nl-row">
        <div className="nl-field">
          <label htmlFor={`${id}-fname`}>{t.firstName}</label>
          <input
            ref={firstFieldRef}
            id={`${id}-fname`}
            autoComplete="given-name"
            className="nl-input"
            value={form.firstName}
            onChange={update("firstName")}
          />
        </div>
        <div className="nl-field">
          <label htmlFor={`${id}-lname`}>
            {t.lastName} <span className="nl-muted">({t.optional})</span>
          </label>
          <input
            id={`${id}-lname`}
            autoComplete="family-name"
            className="nl-input"
            value={form.lastName}
            onChange={update("lastName")}
          />
        </div>
      </div>

      <div className="nl-field">
        <label htmlFor={`${id}-org`}>
          {t.organization} <span className="nl-muted">({t.optional})</span>
        </label>
        <input
          id={`${id}-org`}
          autoComplete="organization"
          className="nl-input"
          value={form.organization}
          onChange={update("organization")}
        />
      </div>

      <div className="nl-field">
        <label htmlFor={`${id}-role`}>
          {t.role} <span className="nl-muted">({t.optional})</span>
        </label>
        <select id={`${id}-role`} className="nl-input" value={form.role} onChange={update("role")}>
          <option value="">{t.roleSelect}</option>
          {ROLE_VALUES.map((value, i) => (
            <option key={value} value={value}>
              {t.roles[i]}
            </option>
          ))}
        </select>
      </div>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div className="nl-honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={update("website")}
        />
      </div>

      <label className="nl-consent">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
          required
        />
        <span>{t.consent}</span>
      </label>
      <p className="nl-sender">{t.sender}</p>
    </>
  );
}

/* ── Footer: email field + details pop-up ────────────────── */

export function NewsletterSignup({ lang = "en" }: { lang?: Lang }) {
  const state = useNewsletter(lang);
  const { t, phase, setPhase, email, setEmail, error, setError, alreadySubscribed, send, reset } = state;
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (phase === "details" && !dialog.open) {
      dialog.showModal();
      firstFieldRef.current?.focus();
    }
    if (phase === "idle" && dialog.open) dialog.close();
  }, [phase]);

  function openDetails(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("invalid_email");
      return;
    }
    setError(null);
    setPhase("details");
  }

  function closeDialog() {
    if (phase === "done") reset();
    setError(null);
    setPhase("idle");
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    const ok = await send();
    if (!ok) setPhase("details");
  }

  return (
    <section className="nl-signup" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="nl-heading">
        {t.heading}
      </h2>
      <p className="nl-intro">{t.intro}</p>

      <form className="nl-inline" onSubmit={openDetails} noValidate>
        <label htmlFor={`${id}-email`} className="nl-visually-hidden">
          {t.emailLabel}
        </label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          placeholder={t.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input nl-inline-input"
          aria-invalid={phase === "idle" && error ? true : undefined}
          aria-describedby={phase === "idle" && error ? `${id}-inline-error` : undefined}
          required
        />
        <button type="submit" className="signup-btn">
          {t.subscribe}
        </button>
      </form>
      {phase === "idle" && error && (
        <p id={`${id}-inline-error`} className="nl-error nl-error-on-navy" role="alert">
          {t.errors[error]}
        </p>
      )}

      <dialog
        ref={dialogRef}
        className="nl-dialog"
        aria-labelledby={`${id}-dialog-title`}
        onClose={() => phase !== "idle" && closeDialog()}
      >
        {phase === "done" ? (
          <div className="nl-dialog-body">
            <h3 id={`${id}-dialog-title`} className="nl-dialog-title">
              {alreadySubscribed ? t.heading : t.successTitle}
            </h3>
            <p className="nl-dialog-text">{alreadySubscribed ? t.alreadyBody : t.successBody}</p>
            <div className="nl-actions">
              <button type="button" className="btn-primary" onClick={closeDialog}>
                {t.close}
              </button>
            </div>
          </div>
        ) : (
          <form className="nl-dialog-body" onSubmit={submit} noValidate>
            <h3 id={`${id}-dialog-title`} className="nl-dialog-title">
              {t.dialogTitle}
            </h3>
            <p className="nl-muted">{t.dialogIntro}</p>
            <p className="nl-email-echo">{email.trim()}</p>

            <NewsletterFields id={id} state={state} firstFieldRef={firstFieldRef} />

            {error && (
              <p className="nl-error" role="alert">
                {t.errors[error]}
              </p>
            )}

            <div className="nl-actions">
              <button type="button" className="nl-btn-cancel" onClick={closeDialog}>
                {t.cancel}
              </button>
              <button type="submit" className="btn-primary" disabled={phase === "submitting"}>
                {phase === "submitting" ? t.submitting : t.submit}
              </button>
            </div>
          </form>
        )}
      </dialog>
    </section>
  );
}
