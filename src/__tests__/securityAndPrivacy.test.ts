import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import nextConfig from "../../next.config";

describe("Security and Privacy Configuration", () => {
  it("enforces strict production security headers in next.config.ts", async () => {
    expect(nextConfig.headers).toBeDefined();
    const headersConfig = await nextConfig.headers!();
    expect(headersConfig).toHaveLength(1);

    const rootHeaderConfig = headersConfig[0];
    const headerMap = new Map(
      rootHeaderConfig.headers.map((h: { key: string; value: string }) => [h.key, h.value])
    );

    // Required headers
    expect(headerMap.get("X-Frame-Options")).toBe("DENY");
    expect(headerMap.get("X-Content-Type-Options")).toBe("nosniff");
    expect(headerMap.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(headerMap.get("Strict-Transport-Security")).toContain("max-age=63072000");
    expect(headerMap.get("Permissions-Policy")).toContain("camera=()");
    expect(headerMap.get("Permissions-Policy")).toContain("browsing-topics=()");

    // Content Security Policy audit
    const csp = headerMap.get("Content-Security-Policy") || "";
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("pagead2.googlesyndication.com");
    expect(csp).toContain("fundingchoicesmessages.google.com");
    expect(csp).toContain("*.googlesyndication.com");
    expect(csp).toContain("*.doubleclick.net");
    expect(csp).toContain("*.googleadservices.com");
    expect(csp).toContain("vitals.vercel-insights.com");
    expect(csp).toContain("va.vercel-scripts.com");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
  });

  it("provides valid multi-resolution tab icon and iOS touch icon files", () => {
    const publicIco = path.join(process.cwd(), "public", "favicon.ico");
    const appIco = path.join(process.cwd(), "src", "app", "favicon.ico");
    const publicSvg = path.join(process.cwd(), "public", "icon.svg");
    const appSvg = path.join(process.cwd(), "src", "app", "icon.svg");
    const appleTouchIcon = path.join(process.cwd(), "public", "apple-touch-icon.png");

    expect(fs.existsSync(publicIco)).toBe(true);
    expect(fs.existsSync(appIco)).toBe(true);
    expect(fs.existsSync(publicSvg)).toBe(true);
    expect(fs.existsSync(appSvg)).toBe(true);
    expect(fs.existsSync(appleTouchIcon)).toBe(true);

    // Validate ICO binary header (0x0000 0x0001)
    const icoBuf = fs.readFileSync(publicIco);
    expect(icoBuf.readUInt16LE(0)).toBe(0);
    expect(icoBuf.readUInt16LE(2)).toBe(1); // Type 1 = Icon
    expect(icoBuf.readUInt16LE(4)).toBe(3); // 3 images: 16x16, 32x32, 48x48

    // Validate PNG signature for Apple Touch Icon (89 50 4E 47 0D 0A 1A 0A)
    const pngBuf = fs.readFileSync(appleTouchIcon);
    const pngSig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    expect(pngBuf.subarray(0, 8).equals(pngSig)).toBe(true);

    // Validate SVG contains CashPulse brand colors
    const svgContent = fs.readFileSync(publicSvg, "utf8");
    expect(svgContent).toContain("#16503E"); // Spruce
    expect(svgContent).toContain("#059669"); // Emerald
    expect(svgContent).toContain("#D97706"); // Amber
  });

  it("ensures client preference cookies enforce SameSite=Lax with zero personal data leakage", () => {
    // Cookie module check
    const cookieUtilsPath = path.join(process.cwd(), "src", "lib", "utils", "cookieUtils.ts");
    expect(fs.existsSync(cookieUtilsPath)).toBe(true);
    const content = fs.readFileSync(cookieUtilsPath, "utf8");

    // Must mandate SameSite=Lax and Secure
    expect(content).toContain("SameSite=Lax");
    expect(content).toContain("Secure");
    expect(content).toContain("VALID_STATE_CODES");

    // Must not allow storing user financial details
    expect(content).not.toContain("gross1099Income");
    expect(content).not.toContain("w2Income");
    expect(content).not.toContain("netBusinessProfit");
    expect(content).not.toContain("ssn");
  });

  it("ensures sitemap.ts programmatically exposes all 51 US states + DC", async () => {
    const sitemapMod = await import("../app/sitemap");
    const sitemapFn = sitemapMod.default;
    const entries = sitemapFn();

    expect(entries.length).toBeGreaterThanOrEqual(51 + 8);

    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://taxestimator.online/tools/freelance-tax-estimator/california");
    expect(urls).toContain("https://taxestimator.online/tools/freelance-tax-estimator/texas");
    expect(urls).toContain("https://taxestimator.online/tools/freelance-tax-estimator/new-york");
    expect(urls).toContain("https://taxestimator.online/tools/freelance-tax-estimator/florida");
    expect(urls).toContain("https://taxestimator.online/tools/freelance-tax-estimator/district-of-columbia");
  });
});
