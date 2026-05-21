"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, from }),
      });
      if (res.ok) {
        const data = await res.json();
        router.replace(data.from || "/");
        router.refresh();
      } else {
        setError("Incorrect password.");
        setPassword("");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-card">
      <div className="login-eyebrow">Energy Policy Monitor</div>
      <h1>Site under preview</h1>
      <p>
        This site is in private review. Enter the access password to continue.
      </p>
      <form onSubmit={onSubmit}>
        <label htmlFor="pw" className="visually-hidden">
          Password
        </label>
        <input
          id="pw"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={submitting || !password}>
          {submitting ? "Checking…" : "Enter"}
        </button>
        {error && <p className="login-error">{error}</p>}
      </form>
      <p className="login-footer">
        For access, contact <a href="mailto:deven@openinsights.ca">deven@openinsights.ca</a>.
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="login-page">
      <Suspense fallback={<div className="login-card">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
