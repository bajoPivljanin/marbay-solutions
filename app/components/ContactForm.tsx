"use client";

import { useState } from "react";

export default function ContactForm({ dict }: { dict: any }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isSubmitting = status === "loading";
  const isSuccess = status === "success";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSuccess) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-4 py-8">
        <p className="font-body-md text-on-surface-variant leading-relaxed">
          {dict.pricing.form.success}
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      {status === "error" && (
        <p className="text-sm text-error bg-error-container/20 border border-error/30 px-4 py-3 rounded">
          {dict.pricing.form.error}
        </p>
      )}
      <div className="relative pt-4">
        <input 
          className="w-full bg-transparent border-0 border-b border-outline/40 py-2 focus:ring-0 focus:border-primary transition-colors peer text-on-surface focus:outline-none disabled:opacity-50" 
          id="contact-name" 
          placeholder=" " 
          required 
          type="text" 
          disabled={isSubmitting}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label 
          className="absolute left-0 top-6 font-label-caps text-label-caps text-on-surface-variant transition-all peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] uppercase pointer-events-none" 
          htmlFor="contact-name"
        >
          {dict.connect.name}
        </label>
      </div>
      <div className="relative pt-4">
        <input 
          className="w-full bg-transparent border-0 border-b border-outline/40 py-2 focus:ring-0 focus:border-primary transition-colors peer text-on-surface focus:outline-none disabled:opacity-50" 
          id="contact-email" 
          placeholder=" " 
          required 
          type="email" 
          disabled={isSubmitting}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label 
          className="absolute left-0 top-6 font-label-caps text-label-caps text-on-surface-variant transition-all peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] uppercase pointer-events-none" 
          htmlFor="contact-email"
        >
          {dict.connect.email}
        </label>
      </div>
      <div className="relative pt-4">
        <textarea 
          className="w-full bg-transparent border-0 border-b border-outline/40 py-2 focus:ring-0 focus:border-primary transition-colors peer text-on-surface resize-none focus:outline-none disabled:opacity-50" 
          id="contact-message" 
          placeholder=" " 
          required 
          rows={3} 
          disabled={isSubmitting}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <label 
          className="absolute left-0 top-6 font-label-caps text-label-caps text-on-surface-variant transition-all peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] uppercase pointer-events-none" 
          htmlFor="contact-message"
        >
          {dict.connect.details}
        </label>
      </div>
      <button 
        className="bg-primary text-on-primary font-label-caps text-label-caps uppercase px-8 py-4 rounded hover:bg-surface-tint transition-colors duration-300 w-full mt-4 disabled:opacity-60 disabled:cursor-not-allowed" 
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? dict.pricing.form.sending : dict.connect.submit}
      </button>
    </form>
  );
}
