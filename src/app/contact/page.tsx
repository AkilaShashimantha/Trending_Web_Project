import type { Metadata } from "next";
import { ContactFormClient } from "../../components/contact/ContactFormClient";

export const metadata: Metadata = {
  title: "Contact & Editorial Corrections",
  description:
    "Contact the TaxEstimator Online Research Desk to report IRS or state tax code updates, calculation feedback, privacy requests, or support inquiries.",
  alternates: {
    canonical: "https://taxestimator.online/contact",
  },
};

export default function ContactPage() {
  return <ContactFormClient />;
}
