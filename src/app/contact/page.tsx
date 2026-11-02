"use client";

import React, { useState } from "react";
import { CheckCircle2, Mail, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Tax / Calculation Question",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-slate-800">
      <div className="border-b border-[#EAEAE3] pb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-spruce-50 px-3 py-1 text-xs font-semibold text-spruce-800 mb-3">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Support &amp; Feedback</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Contact CashPulse
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Have feedback on our calculation engines, spotted an IRS update, or interested in advertising partnerships? Reach out below.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          {submitted ? (
            <div className="rounded-2xl border border-emeraldTactile-200 bg-emeraldTactile-50/70 p-6 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emeraldTactile-600" />
              <h2 className="mt-3 text-base font-bold text-slate-900">Message Received</h2>
              <p className="mt-1 text-xs text-slate-600">
                Thank you for contacting the CashPulse team. Our engineering and editorial desks review all inquiries within 24-48 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-800">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-slate-900 focus:border-emeraldTactile focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@creatorstudio.com"
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-slate-900 focus:border-emeraldTactile focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800">Inquiry Topic</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-slate-900 focus:border-emeraldTactile focus:outline-none"
                >
                  <option value="Tax / Calculation Question">Tax / Calculation Question</option>
                  <option value="Payment Gateway Discrepancy">Payment Gateway Discrepancy</option>
                  <option value="Advertising & Sponsorship">Advertising &amp; Sponsorship</option>
                  <option value="General Inquiry">General Feedback</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details or feedback about your scenario..."
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-slate-900 focus:border-emeraldTactile focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-spruce-800 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-spruce-700"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6 md:col-span-5 text-xs text-slate-600">
          <div className="rounded-2xl border border-[#EAEAE3] bg-white p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm">Direct Contacts</h3>
            <div className="mt-4 space-y-3">
              <div>
                <span className="block font-semibold text-slate-800">Editorial &amp; Tax Modeling:</span>
                <span className="font-mono text-spruce-800">editorial@cashpulse.app</span>
              </div>
              <div>
                <span className="block font-semibold text-slate-800">Ad Partnerships:</span>
                <span className="font-mono text-spruce-800">sponsors@cashpulse.app</span>
              </div>
              <div>
                <span className="block font-semibold text-slate-800">Privacy &amp; Compliance:</span>
                <span className="font-mono text-spruce-800">privacy@cashpulse.app</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
