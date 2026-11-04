import { STATE_DATA_BY_CODE } from "../data/stateTaxData";

export const PREF_STATE_COOKIE_NAME = "cashpulse_pref_state";

const VALID_STATE_CODES = new Set(Object.keys(STATE_DATA_BY_CODE));

/**
 * Validates whether an input is a valid 2-letter US state or DC jurisdiction code.
 */
export function isValidStateCode(code: unknown): code is string {
  if (typeof code !== "string") return false;
  const upper = code.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(upper) && VALID_STATE_CODES.has(upper);
}

/**
 * Saves the user's preferred state jurisdiction into a secure client-side cookie.
 * 
 * SECURITY GUARANTEES:
 * 1. Strict Whitelist: Only verified 2-letter US State/DC codes are permitted.
 * 2. Injection Prevention: Disallows CRLF (\r, \n), semicolons, or script injection.
 * 3. Zero Personal Data Leakage: Strictly prohibits storing PII, income, SSN, expenses, or financial metrics.
 * 4. Hardened Flags: SameSite=Lax; Path=/; Max-Age=1 year; Secure flag added in HTTPS environments.
 */
export function saveStatePreference(stateCode: string): boolean {
  if (typeof document === "undefined") return false;

  const sanitized = (stateCode || "").trim().toUpperCase();
  if (!isValidStateCode(sanitized)) {
    return false;
  }

  const isHttps =
    typeof window !== "undefined" && window.location.protocol === "https:";
  const cookieParts = [
    `${PREF_STATE_COOKIE_NAME}=${encodeURIComponent(sanitized)}`,
    "path=/",
    "max-age=31536000", // 1 year retention
    "SameSite=Lax",
  ];

  if (isHttps) {
    cookieParts.push("Secure");
  }

  document.cookie = cookieParts.join("; ");
  return true;
}

/**
 * Retrieves and validates the user's preferred state code from secure cookies.
 * If tampered with, malicious, or invalid, returns null and purges the cookie.
 */
export function getStatePreference(): string | null {
  if (typeof document === "undefined") return null;

  try {
    const cookies = document.cookie ? document.cookie.split(/;\s*/) : [];
    for (const cookie of cookies) {
      const [name, ...valParts] = cookie.split("=");
      if (name.trim() === PREF_STATE_COOKIE_NAME) {
        const rawVal = decodeURIComponent(valParts.join("=")).trim().toUpperCase();
        if (isValidStateCode(rawVal)) {
          return rawVal;
        } else {
          // Purge corrupted/tampered cookie immediately
          clearStatePreference();
          return null;
        }
      }
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Clears the user preference cookie securely.
 */
export function clearStatePreference(): void {
  if (typeof document === "undefined") return;
  const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
  document.cookie = `${PREF_STATE_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax${isHttps ? "; Secure" : ""}`;
}
