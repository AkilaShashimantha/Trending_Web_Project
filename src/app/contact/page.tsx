"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";

const SUPPORT_EMAIL = "support@taxestimator.online";

type SubmitStatus = "idle" | "submitting" | "sent" | "fallback" | "error";

interface ContactApiResponse {
  ok?: boolean;
  delivered?: boolean;
  status?: string;
  message?: string;
  error?: string;
  supportEmail?: string;
  mailtoUrl?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

function buildClientMailto(name: string, email: string, subject: string, message: string): string {
  const emailSubject = `[TaxEstimator Online] ${subject}`;
  const emailBody = `From: ${name} <${email}>\nTopic: ${subject}\n\n${message}`;
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
}

export default function ContactPage() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [mailtoUrl, setMailtoUrl] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Tax / Calculation Question",
    message: "",
    website: "", // Honeypot field
  });

  const handleCopyEmail = async (emailAddr = SUPPORT_EMAIL) => {
    try {
      await navigator.clipboard.writeText(emailAddr);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleCopyDraft = async () => {
    const draft = [
      `To: ${SUPPORT_EMAIL}`,
      `Subject: [TaxEstimator Online] ${formData.subject}`,
      `From: ${formData.name} <${formData.email}>`,
      "",
      formData.message,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(draft);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2500);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setStatusMessage("");
    setFieldErrors({});

    const fallbackMailto = buildClientMailto(
      formData.name,
      formData.email,
      formData.subject,
      formData.message
    );

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await response.json().catch(() => ({}))) as ContactApiResponse;

      if (response.ok && data.delivered === true) {
        setStatus("sent");
        setStatusMessage(
          data.message ||
            "Your inquiry has been delivered to our team. We review messages within 1-2 business days."
        );
        return;
      }

      if (
        response.status === 501 ||
        response.status === 502 ||
        data.status === "transport_not_configured" ||
        data.status === "transport_error"
      ) {
        setStatus("fallback");
        setMailtoUrl(data.mailtoUrl || fallbackMailto);
        setStatusMessage(
          data.message ||
            "Automated server mail delivery is not configured in this environment. Send your pre-filled inquiry directly via your email client below."
        );
        return;
      }

      if (response.status === 400) {
        const nextErrors: Record<string, string> = {};
        if (data.fieldErrors) {
          for (const [key, errs] of Object.entries(data.fieldErrors)) {
            if (errs && errs.length > 0) {
              nextErrors[key] = errs[0];
            }
          }
        }
        setFieldErrors(nextErrors);
        setStatus("error");
        setStatusMessage(data.error || "Please review the form fields and try again.");
        return;
      }

      setStatus("fallback");
      setMailtoUrl(fallbackMailto);
      setStatusMessage(
        "Unable to confirm server delivery right now. Please use the pre-filled email button below to send directly."
      );
    } catch {
      setStatus("fallback");
      setMailtoUrl(fallbackMailto);
      setStatusMessage(
        "Network error while contacting the server. Use the pre-filled email button or copy our support address below."
      );
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "Tax / Calculation Question",
      message: "",
      website: "",
    });
    setFieldErrors({});
    setStatus("idle");
    setStatusMessage("");
    setMailtoUrl("");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-slate-800">
      <div className="border-b border-[#EAEAE3] pb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-spruce-50 px-3 py-1 text-xs font-semibold text-spruce-800 mb-3">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Support &amp; Editorial Corrections</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Contact TaxEstimator Online
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Have feedback on our 2024–2026 calculation engines, spotted an IRS or state regulatory update, or need support? Reach out below.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          {status === "sent" ? (
            <div className="rounded-2xl border border-emeraldTactile-100 bg-emeraldTactile-50/70 p-6 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emeraldTactile-600" />
              <h2 className="mt-3 text-base font-bold text-slate-900">Message Delivered</h2>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{statusMessage}</p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-5 inline-flex items-center justify-center rounded-xl border border-[#DCDCD2] bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-[#F4F4F0]"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : status === "fallback" ? (
            <div className="rounded-2xl border border-amberWarm-100 bg-amberWarm-50/60 p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-amberWarm-700" />
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Complete Delivery via Direct Email
                  </h2>
                  <p className="mt-1 text-xs text-slate-700 leading-relaxed">{statusMessage}</p>
                </div>
              </div>

              <div className="rounded-xl border border-[#EAEAE3] bg-white p-4 space-y-3 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Support Desk Email
                    </span>
                    <span className="font-mono text-sm font-bold text-spruce-800">
                      {SUPPORT_EMAIL}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail(SUPPORT_EMAIL)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCDCD2] bg-[#FBFBF9] px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-[#F4F4F0]"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emeraldTactile-600" />
                        <span>Copied Email</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#F4F4F0]">
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center gap-2 rounded-xl bg-spruce-800 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-spruce-700"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Open Pre-Filled Email</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyDraft}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCDCD2] bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-[#F4F4F0]"
                  >
                    {copiedDraft ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emeraldTactile-600" />
                        <span>Copied Message Draft</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Message Draft</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-xs font-semibold text-slate-500 underline underline-offset-2 hover:text-slate-800 ml-auto"
                  >
                    Edit Message
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {status === "error" && statusMessage && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-800"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Honeypot field for bot filtering */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
              >
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="contact-name" className="text-xs font-semibold text-slate-800">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-slate-900 focus:border-emeraldTactile focus:outline-none"
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-[11px] text-red-600">{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="text-xs font-semibold text-slate-800">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@creatorstudio.com"
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-slate-900 focus:border-emeraldTactile focus:outline-none"
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-[11px] text-red-600">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-800">
                  Inquiry Topic
                </label>
                <select
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-slate-900 focus:border-emeraldTactile focus:outline-none"
                >
                  <option value="Tax / Calculation Question">Tax / Calculation Question</option>
                  <option value="IRS or State Data Correction">IRS or State Data Correction</option>
                  <option value="Payment Gateway Discrepancy">Payment Gateway Discrepancy</option>
                  <option value="Advertising & Sponsorship">Advertising &amp; Sponsorship</option>
                  <option value="Privacy & Data Inquiry">Privacy &amp; Data Inquiry</option>
                  <option value="General Inquiry">General Feedback</option>
                </select>
                {fieldErrors.subject && (
                  <p className="mt-1 text-[11px] text-red-600">{fieldErrors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="text-xs font-semibold text-slate-800">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details, feedback, or the statutory citation you would like our team to review..."
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-slate-900 focus:border-emeraldTactile focus:outline-none"
                />
                {fieldErrors.message && (
                  <p className="mt-1 text-[11px] text-red-600">{fieldErrors.message}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-spruce-800 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-spruce-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white"
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-xs font-medium text-slate-500 underline underline-offset-2 hover:text-spruce-800"
                >
                  Or email {SUPPORT_EMAIL} directly
                </a>
              </div>
            </form>
          )}
        </div>

        <div className="space-y-6 md:col-span-5 text-xs text-slate-600">
          <div className="rounded-2xl border border-[#EAEAE3] bg-white p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm">Direct Contacts</h3>
            <p className="mt-1 text-[11px] text-slate-500">
              Reach the appropriate TaxEstimator Online desk directly by email:
            </p>
            <div className="mt-4 space-y-3.5">
              <div>
                <span className="block font-semibold text-slate-800">General Support &amp; Feedback:</span>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="font-mono text-spruce-800 underline underline-offset-2 hover:text-emeraldTactile-700"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail(SUPPORT_EMAIL)}
                    className="inline-flex items-center gap-1 rounded border border-[#EAEAE3] px-2 py-0.5 text-[10px] font-medium text-slate-600 hover:bg-[#F4F4F0]"
                    aria-label="Copy support email"
                  >
                    {copiedEmail ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
              <div>
                <span className="block font-semibold text-slate-800">Editorial &amp; Tax Modeling:</span>
                <a
                  href="mailto:editorial@taxestimator.online"
                  className="font-mono text-spruce-800 underline underline-offset-2 hover:text-emeraldTactile-700"
                >
                  editorial@taxestimator.online
                </a>
              </div>
              <div>
                <span className="block font-semibold text-slate-800">Ad Partnerships:</span>
                <a
                  href="mailto:sponsors@taxestimator.online"
                  className="font-mono text-spruce-800 underline underline-offset-2 hover:text-emeraldTactile-700"
                >
                  sponsors@taxestimator.online
                </a>
              </div>
              <div>
                <span className="block font-semibold text-slate-800">Privacy &amp; Compliance:</span>
                <a
                  href="mailto:privacy@taxestimator.online"
                  className="font-mono text-spruce-800 underline underline-offset-2 hover:text-emeraldTactile-700"
                >
                  privacy@taxestimator.online
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#EAEAE3] bg-[#FBFBF9] p-5 text-[11px] leading-relaxed text-slate-600">
            <p className="font-semibold text-slate-800">Editorial &amp; Privacy Notice</p>
            <p className="mt-1">
              Do not send confidential tax returns, Social Security Numbers, or banking credentials through this contact form. Review our{" "}
              <Link href="/about#editorial-standards" className="font-semibold text-emeraldTactile-700 underline">
                Editorial Standards
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="font-semibold text-emeraldTactile-700 underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
