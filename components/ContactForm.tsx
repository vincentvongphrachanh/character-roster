"use client";

import { useState } from "react";
import { contactFormEndpoint, socialLinks } from "@/lib/social-links";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full border border-black/20 rounded-sm px-3.5 py-3 text-[16px] bg-white text-black placeholder:text-black/30 focus:border-black outline-none transition-colors";

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
      <div className="border border-black/15 rounded-sm px-5 py-6 text-[15px] text-black">
        Thanks for reaching out — your message is on its way.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <div>
        <label className="block text-[17px] mb-2.5 text-black">Name</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label htmlFor="firstName" className="block text-[14px] mb-1.5 text-black/70">
              First Name <span className="text-black/50">(required)</span>
            </label>
            <input id="firstName" name="firstName" type="text" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-[14px] mb-1.5 text-black/70">
              Last Name <span className="text-black/50">(required)</span>
            </label>
            <input id="lastName" name="lastName" type="text" required className={inputClass} />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-[17px] mb-2.5 text-black">
          Email <span className="text-[14px] text-black/50">(required)</span>
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
        <label className="flex items-center gap-2.5 mt-3 text-[15px] text-black/80">
          <input type="checkbox" name="newsletter" className="w-4 h-4" />
          Sign up for news and updates
        </label>
      </div>

      <div>
        <label htmlFor="subject" className="block text-[17px] mb-2.5 text-black">
          Subject <span className="text-[14px] text-black/50">(required)</span>
        </label>
        <input id="subject" name="subject" type="text" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className="block text-[17px] mb-2.5 text-black">
          Message <span className="text-[14px] text-black/50">(required)</span>
        </label>
        <textarea id="message" name="message" required rows={6} className={inputClass} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start font-medium text-[15px] tracking-[0.04em] px-8 py-3.5 rounded-sm border border-black text-black transition-colors hover:bg-black hover:text-white disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>

      {status === "error" && (
        <p className="text-[14px] text-red-600">
          Something went wrong sending that — try again, or email directly.
        </p>
      )}
    </form>
  );
}
