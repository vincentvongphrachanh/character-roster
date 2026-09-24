"use client";

import { useState } from "react";
import { contactFormEndpoint, socialLinks } from "@/lib/social-links";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full border rounded-sm px-3.5 py-2.5 text-[15px] bg-[var(--char-secondary,#f4f3f0)]/10 focus:bg-transparent outline-none transition-colors";
const inputStyle = { borderColor: "rgba(243,241,236,0.22)" };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("firstName") || "");
    const lastName = String(data.get("lastName") || "");
    const email = String(data.get("email") || "");
    const subject = String(data.get("subject") || "");
    const message = String(data.get("message") || "");
    const newsletter = data.get("newsletter") ? "Yes" : "No";

    if (!contactFormEndpoint) {
      // No Formspree endpoint configured yet -- fall back to a mailto link
      // so the form still does something useful.
      const body = `From: ${firstName} ${lastName} (${email})\nSign up for updates: ${newsletter}\n\n${message}`;
      window.location.href = `${socialLinks.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(contactFormEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border rounded-sm px-5 py-6 text-[15px]" style={inputStyle}>
        Thanks for reaching out — your message is on its way.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <div>
        <label className="block font-display text-base mb-2.5">Name</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label htmlFor="firstName" className="block text-[13px] mb-1.5" style={{ color: "rgba(243,241,236,0.62)" }}>
              First Name <span style={{ color: "var(--char-accent)" }}>(required)</span>
            </label>
            <input id="firstName" name="firstName" type="text" required className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-[13px] mb-1.5" style={{ color: "rgba(243,241,236,0.62)" }}>
              Last Name <span style={{ color: "var(--char-accent)" }}>(required)</span>
            </label>
            <input id="lastName" name="lastName" type="text" required className={inputClass} style={inputStyle} />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block font-display text-base mb-2.5">
          Email <span className="text-[13px] font-body" style={{ color: "rgba(243,241,236,0.62)" }}>(required)</span>
        </label>
        <input id="email" name="email" type="email" required className={inputClass} style={inputStyle} />
        <label className="flex items-center gap-2.5 mt-3 text-[14px]" style={{ color: "rgba(243,241,236,0.85)" }}>
          <input type="checkbox" name="newsletter" className="w-4 h-4" />
          Sign up for news and updates
        </label>
      </div>

      <div>
        <label htmlFor="subject" className="block font-display text-base mb-2.5">
          Subject <span className="text-[13px] font-body" style={{ color: "rgba(243,241,236,0.62)" }}>(required)</span>
        </label>
        <input id="subject" name="subject" type="text" required className={inputClass} style={inputStyle} />
      </div>

      <div>
        <label htmlFor="message" className="block font-display text-base mb-2.5">
          Message <span className="text-[13px] font-body" style={{ color: "rgba(243,241,236,0.62)" }}>(required)</span>
        </label>
        <textarea id="message" name="message" required rows={6} className={inputClass} style={inputStyle} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start font-semibold text-sm tracking-wide px-7 py-3 rounded-sm border transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        style={{ borderColor: "var(--char-text)", color: "var(--char-text)" }}
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>

      {status === "error" && (
        <p className="text-[13px]" style={{ color: "#e08a8a" }}>
          Something went wrong sending that — try again, or email directly.
        </p>
      )}
    </form>
  );
}
