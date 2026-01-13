import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1120px",
          margin: "0 auto",
          padding: isMobile ? "1.8rem 1.2rem 2.4rem" : "2.6rem 2.2rem 3rem",
          display: "grid",
          gridTemplateColumns: isMobile
            ? "minmax(0, 1fr)"
            : "minmax(0, 1.6fr) minmax(0, 1.2fr)",
          gap: isMobile ? "1.75rem" : "2.25rem",
          alignItems: "stretch",
          boxSizing: "border-box",
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
            Pakistan universities · at a glance
          </p>

          <h1
            style={{
              fontSize: isMobile ? "2rem" : "2.4rem",
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
                padding: "0.8rem 1.7rem",
                borderRadius: "999px",
                border: "none",
                background:
                  "linear-gradient(to right, #0f766e, #22c55e, #4ade80)",
                color: "white",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
                boxShadow: "0 16px 40px rgba(16,185,129,0.65)",
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
              gap: "1.1rem",
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
            padding: isMobile ? "1.3rem 1.4rem" : "1.5rem 1.75rem",
            background:
              "radial-gradient(circle at 0% 0%, #e0f2fe 0, #1f2937 42%, #020617 100%)",
            color: "white",
            boxShadow: "0 26px 60px rgba(15,23,42,0.9)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: isMobile ? "0.3rem" : 0,
            boxSizing: "border-box",
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
            }}
          >
            <li style={{ marginBottom: "0.5rem" }}>
              ✅ <strong>Explore</strong> universities by city, province,
              program &amp; ranking.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              ⭐ <strong>Shortlist</strong> your favourite options to discuss
              with family.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              📊 <strong>Compare</strong> up to 3 universities side-by-side.
            </li>
            <li>
              🧭 <strong>Guidance</strong> page with simple tips for students,
              parents &amp; teachers.
            </li>
          </ul>

          <div
            style={{
              marginTop: "1.1rem",
              padding: "0.65rem 0.8rem",
              borderRadius: "0.9rem",
              backgroundColor: "rgba(15,23,42,0.8)",
              border: "1px solid rgba(148,163,184,0.6)",
              fontSize: "0.82rem",
              lineHeight: 1.6,
            }}
          >
            <p style={{ margin: 0 }}>
              Built as a student portfolio project using the MERN stack
              (MongoDB, Express, React, Node.js) — designed around how Pakistani
              students and parents actually search for universities.
            </p>
          </div>

          <p
            style={{
              marginTop: "1.1rem",
              fontSize: "0.78rem",
              color: "#cbd5f5",
            }}
          >
            Future roadmap: richer data (fees, admission), smarter AI Integrated guidance,
            and auto-updated information for students across Pakistan.
          </p>
        </aside>
      </div>
    </div>
  );
}
