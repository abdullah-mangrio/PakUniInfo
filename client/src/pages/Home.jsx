import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: "1.25rem",
          backgroundColor: "#f9fafb",
          padding: "2.5rem 2.75rem",
          boxShadow: "0 32px 80px rgba(15,23,42,0.75)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1.2fr)",
          gap: "2.25rem",
        }}
      >
        {/* LEFT SIDE – HERO COPY */}
        <section>
          <p
            style={{
              fontSize: "0.83rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#0f766e",
              fontWeight: 600,
              marginBottom: "0.55rem",
            }}
          >
            Pakistan University Guidance
          </p>

          <h1
            style={{
              fontSize: "2.4rem",
              lineHeight: 1.1,
              fontWeight: 800,
              color: "#020617",
              marginBottom: "0.9rem",
            }}
          >
            Find the right university for{" "}
            <span style={{ color: "#059669" }}>you</span> in Pakistan.
          </h1>

          <p
            style={{
              fontSize: "0.98rem",
              color: "#475569",
              lineHeight: 1.6,
              marginBottom: "1.6rem",
              maxWidth: "38rem",
            }}
          >
            PakUniInfo helps 1st &amp; 2nd year students, parents, and teachers
            explore universities across Pakistan — by city, province, programs
            and ranking. Shortlist options, compare them, and plan with
            confidence.
          </p>

          {/* CTA BUTTONS */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.9rem",
              marginBottom: "1.4rem",
            }}
          >
            <button
              onClick={() => navigate("/universities")}
              style={{
                padding: "0.75rem 1.6rem",
                borderRadius: "999px",
                border: "none",
                background:
                  "linear-gradient(to right, #16a34a, #22c55e, #4ade80)",
                color: "white",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
                boxShadow: "0 14px 30px rgba(22,163,74,0.6)",
              }}
            >
              Explore universities
            </button>

            <button
              onClick={() => navigate("/guidance")}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "999px",
                border: "1px solid #cbd5f5",
                backgroundColor: "white",
                color: "#0f172a",
                fontWeight: 500,
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              How PakUniInfo helps
            </button>
          </div>

          {/* LITTLE TAGS */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.4rem",
              fontSize: "0.85rem",
              color: "#64748b",
            }}
          >
            <span>🎓 For FSC, ICS &amp; A-level students</span>
            <span>👨‍👩‍👧 Built for parents &amp; teachers too</span>
          </div>
        </section>

        {/* RIGHT SIDE – WHY USE BOX */}
        <aside
          style={{
            borderRadius: "1.1rem",
            padding: "1.5rem 1.75rem",
            background:
              "radial-gradient(circle at 0% 0%, #e0f2fe 0, #1f2937 42%, #020617 100%)",
            color: "white",
            boxShadow: "0 26px 60px rgba(15,23,42,0.9)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
            }}
          >
            Why use PakUniInfo?
          </h2>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: "#e5e7eb",
            }}
          >
            <li>
              • Filter universities by{" "}
              <span style={{ fontWeight: 600 }}>province, city and programs</span>.
            </li>
            <li>
              • See{" "}
              <span style={{ fontWeight: 600 }}>rankings and key information</span>{" "}
              in one place.
            </li>
            <li>
              • Save options to a{" "}
              <span style={{ fontWeight: 600 }}>personal shortlist</span> and
              compare side by side.
            </li>
            <li>
              • Use the{" "}
              <span style={{ fontWeight: 600 }}>Guidance</span> page for
              AI-ready, rule-based recommendations.
            </li>
          </ul>

          <p
            style={{
              marginTop: "1.1rem",
              fontSize: "0.78rem",
              color: "#cbd5f5",
            }}
          >
            Future roadmap: richer data (fees, admission), smarter AI guidance,
            and auto-updated information for students across Pakistan.
          </p>
        </aside>
      </div>
    </div>
  );
}
