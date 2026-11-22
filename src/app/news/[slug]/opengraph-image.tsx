import { ImageResponse } from "next/og";
import { getNewsArticleBySlug } from "../../../lib/data/newsArticles";

export const alt = "TaxEstimator Online Research Guide";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  const title = article?.headline || "Solopreneur Tax & Financial Modeling Guide";
  const category = article?.category || "Tax & Finance Research";
  const readTime = article?.readTime || "8 min read";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FBFBF9",
          padding: "48px 56px",
          border: "14px solid #16503E",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                backgroundColor: "#16503E",
                color: "#6EE7B7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: 800,
              }}
            >
              TE
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#0F172A",
                }}
              >
                TaxEstimator Online
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#475569",
                }}
              >
                TaxEstimator Online Research Desk
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: "#ECFDF5",
                color: "#065F46",
                border: "2px solid #A7F3D0",
                borderRadius: "999px",
                padding: "8px 18px",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              {category}
            </div>
            <div
              style={{
                backgroundColor: "#F4F4F0",
                color: "#334155",
                borderRadius: "999px",
                padding: "8px 16px",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              {readTime}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            marginTop: "12px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              fontSize: title.length > 90 ? "40px" : "46px",
              fontWeight: 800,
              lineHeight: 1.18,
              color: "#0F172A",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #EAEAE3",
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#16503E",
            }}
          >
            Primary-Source IRS, SSA, Federal Reserve &amp; State Code Models
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#059669",
            }}
          >
            taxestimator.online
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
