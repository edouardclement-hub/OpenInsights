"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-foreground"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-lg border border-secondary px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-lg border border-secondary px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 block w-full rounded-lg border border-secondary px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-light disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "sent" && (
        <p className="text-sm text-green-600">
          Thank you! Your message has been sent.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
