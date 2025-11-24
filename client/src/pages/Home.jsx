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
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1.1fr)",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {/* Left: hero text */}
        <section>
          <p
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#10b981",
              marginBottom: "0.5rem",
            }}
          >
            Built for students in Pakistan
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

          <p
            style={{
              fontSize: "0.8rem",
              color: "#94a3b8",
              marginBottom: "1.6rem",
            }}
          >
            Built as a student project by{" "}
            <span style={{ fontWeight: 600, color: "#059669" }}>
              Abdullah Mangrio
            </span>
            , for students across Pakistan.
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
                boxShadow: "0 18px 40px rgba(22,163,74,0.55)",
              }}
            >
              Explore universities
            </button>

            <button
              onClick={() => navigate("/compare")}
              style={{
                padding: "0.75rem 1.4rem",
                borderRadius: "999px",
                border: "1px solid #cbd5f5",
                backgroundColor: "white",
                color: "#0f172a",
                fontWeight: 500,
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              Compare options
            </button>
          </div>

          {/* Small text */}
          <p
            style={{
              fontSize: "0.8rem",
              color: "#64748b",
              maxWidth: "32rem",
            }}
          >
            Start simple: filter by city or province, shortlist a few
            universities, and then compare details like programs offered and
            overall feel. Use this as a starting point alongside official
            university websites and counsellors.
          </p>
        </section>

        {/* Right: highlight card */}
        <aside
          style={{
            borderRadius: "1.25rem",
            padding: "1.25rem 1.4rem",
            background:
              "radial-gradient(circle at top left, #22c55e, #0f172a 60%, #020617)",
            color: "white",
            boxShadow: "0 20px 45px rgba(15,23,42,0.85)",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              margin: 0,
              marginBottom: "0.6rem",
              color: "#bbf7d0",
              fontWeight: 600,
            }}
          >
            What can you do here?
          </p>

          <ul
            style={{
              margin: 0,
              paddingLeft: "1.1rem",
              fontSize: "0.9rem",
              lineHeight: 1.7,
            }}
          >
            <li>
              <strong>Browse universities</strong> by city, province and
              programs.
            </li>
            <li>
              <strong>See details</strong> like description, basic fees and
              admission notes (where available).
            </li>
            <li>
              <strong>Shortlist</strong> interesting options and review them
              later.
            </li>
            <li>
              <strong>Compare universities</strong> side-by-side to understand
              differences.
            </li>
          </ul>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid rgba(226,232,240,0.2)",
              margin: "0.9rem 0",
            }}
          />

          <p
            style={{
              fontSize: "0.8rem",
              margin: 0,
              color: "#e5e7eb",
            }}
          >
            This isn&apos;t an official ranking or admissions portal — it&apos;s
            a helper tool to explore options. Always confirm final details with
            the university&apos;s official website.
          </p>

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
