"use client";

import React, { useEffect, useRef } from "react";

interface AdSlotProps {
  slotId?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  responsive?: boolean;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export function AdSlot({
  slotId = "1234567890",
  format = "auto",
  className = "",
  responsive = true,
  label = "Sponsor Advertisement",
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-0000000000000000";

  useEffect(() => {
    // Standard Google AdSense queue initialization with React StrictMode guard
    if (typeof window !== "undefined" && adRef.current && !pushedRef.current) {
      try {
        if (process.env.NODE_ENV === "production") {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushedRef.current = true;
        }
      } catch (err) {
        console.warn("AdSense push initialization error:", err);
      }
    }
  }, []);

  // Standard CLS prevention heights based on format
  const heightClasses = {
    horizontal: "min-h-[90px] sm:min-h-[120px] md:min-h-[250px]",
    rectangle: "min-h-[250px] sm:min-h-[280px]",
    vertical: "min-h-[600px]",
    auto: "min-h-[100px] sm:min-h-[250px]",
  }[format];

  return (
    <div
      className={`my-8 w-full overflow-hidden rounded-xl border border-dashed border-[#DCDCD2] bg-[#F4F4F0]/60 p-3 transition-all ${heightClasses} ${className}`}
    >
      <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium tracking-wider uppercase text-slate-400">
        <span>{label}</span>
        <span className="text-[10px] text-slate-400/80">Google AdSense Certified</span>
      </div>

      <div className="relative flex min-h-[90px] w-full items-center justify-center">
        {/* Production AdSense Script Container */}
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />

        {/* Development & Staging Layout Preservation Fallback */}
        {process.env.NODE_ENV !== "production" && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-[#EAEAE3]/40 p-4 text-center">
            <div className="flex items-center gap-2 text-xs font-semibold text-spruce-800">
              <span className="inline-block h-2 w-2 rounded-full bg-emeraldTactile"></span>
              <span>AdSense Responsive Unit (#{slotId})</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Format: <span className="font-mono">{format}</span> &bull; Zero CLS Layout Reserved
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
