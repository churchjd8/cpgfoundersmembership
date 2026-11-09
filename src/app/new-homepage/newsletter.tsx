"use client";

import { useState, type FormEvent } from "react";
import styles from "./page.module.css";

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ first_name: data.get("first_name"), email: data.get("email"), last_name: "" }) });
      if (!response.ok) throw new Error("Subscription failed");
      setStatus("success");
      form.reset();
    } catch { setStatus("error"); }
  }
  if (status === "success") return <div className={styles.signupSuccess} role="status"><span aria-hidden="true">✓</span><h3>You’re on the list.</h3><p>Thanks for joining. Look out for Jeff’s next note.</p></div>;
  return <form onSubmit={subscribe} className={styles.signup} aria-label="Subscribe to Jeff’s weekly insights"><div><label htmlFor="home-first-name">First name <span>(optional)</span></label><input id="home-first-name" name="first_name" autoComplete="given-name" placeholder="Your first name"/></div><div><label htmlFor="home-email">Email address</label><input id="home-email" name="email" type="email" autoComplete="email" placeholder="you@yourbrand.com" required/></div><button type="submit" disabled={status === "loading"}>{status === "loading" ? "Subscribing…" : "Get Jeff’s notes"}<span aria-hidden="true">↗</span></button><p className={styles.signupNote}>Unsubscribe anytime. No spam, ever.</p>{status === "error" && <p className={styles.signupError} role="alert">We couldn’t subscribe you. Please try again.</p>}</form>;
}
