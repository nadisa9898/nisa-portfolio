"use client";

import { useState } from "react";
import { contactLimits, validateContact, type ContactErrors } from "@/lib/validation";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-2xl border-2 border-navy bg-white px-4 py-3 text-base text-navy outline-offset-2 placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-blue";

/** Validated contact form posting to /api/contact. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    const result = validateContact(payload);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { error?: string; errors?: ContactErrors };
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      if (json.errors) setErrors(json.errors);
      setMessage(json.error ?? "Something went wrong.");
      setStatus("error");
    } catch {
      setMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form method="post" action="/api/contact" onSubmit={onSubmit} noValidate className="flex flex-col gap-3.5" aria-label="Send a message">
      <p className="font-mono text-xs tracking-[.14em] text-ink-muted uppercase">Or drop me a line</p>

      {(["name", "email"] as const).map((key) => (
        <div key={key}>
          <label htmlFor={`contact-${key}`} className="sr-only">
            {key === "name" ? "Your name" : "Your email"}
          </label>
          <input
            id={`contact-${key}`}
            name={key}
            type={key === "email" ? "email" : "text"}
            autoComplete={key}
            maxLength={contactLimits[key]}
            placeholder={key === "name" ? "Your name" : "Your email"}
            aria-invalid={Boolean(errors[key])}
            aria-describedby={errors[key] ? `contact-${key}-error` : undefined}
            className={field}
          />
          {errors[key] && (
            <p id={`contact-${key}-error`} className="mt-1 text-sm font-semibold text-[#B4236F]">
              {errors[key]}
            </p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="contact-message" className="sr-only">
          Your message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          maxLength={contactLimits.message}
          placeholder="Tell me about your project"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${field} resize-y`}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1 text-sm font-semibold text-[#B4236F]">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start rounded-full border-2 border-navy bg-yellow px-6 py-3 text-base font-bold text-navy shadow-hard-4 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <p role="status" aria-live="polite" className="min-h-6 text-sm font-semibold">
        {status === "sent" && <span className="text-navy">Thanks! Your message is on its way.</span>}
        {status === "error" && <span className="text-[#B4236F]">{message}</span>}
      </p>
    </form>
  );
}
