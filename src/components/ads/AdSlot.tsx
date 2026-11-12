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

const VALID_ADSENSE_SLOT_REGEX = /^\d{8,}$/;

export function AdSlot({
  slotId = "",
  format = "auto",
  className = "",
  responsive = true,
  label,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  const slotsEnabled = process.env.NEXT_PUBLIC_ADSENSE_SLOTS_ENABLED === "true";
  const isValidSlotId = VALID_ADSENSE_SLOT_REGEX.test(slotId);
  const shouldRender = slotsEnabled && isValidSlotId;
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-3164350596356343";

  useEffect(() => {
    if (!shouldRender) return;

    if (typeof window !== "undefined" && adRef.current && !pushedRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch (err) {
        console.warn("AdSense push initialization error:", err);
      }
    }
  }, [shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`my-8 w-full overflow-hidden ${className}`}
      aria-label={label || "Advertisement"}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
