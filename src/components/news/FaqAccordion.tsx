"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NewsFAQ } from "../../models/news.model";

interface FaqAccordionProps {
  faqs: NewsFAQ[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="divide-y divide-[#EAEAE3] rounded-2xl border border-[#EAEAE3] bg-white overflow-hidden">
      {faqs.map((faq, idx) => {
        const isOpen = openIndices.includes(idx);
        return (
          <div key={idx} className="transition-colors">
            <button
              type="button"
              id={`faq-question-${idx}`}
              onClick={() => toggleIndex(idx)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-slate-900 hover:bg-[#FBFBF9] focus:outline-none focus:bg-[#FBFBF9]"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${idx}`}
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-emeraldTactile-700" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div
                id={`faq-answer-${idx}`}
                role="region"
                aria-labelledby={`faq-question-${idx}`}
                className="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-slate-600 bg-[#FBFBF9]/40"
              >
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
