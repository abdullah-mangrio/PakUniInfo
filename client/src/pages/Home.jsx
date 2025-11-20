import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/universities");
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.3fr)",
        gap: "2.5rem",
        alignItems: "center",
      }}
    >
      {/* Left: Text content */}
      <section>
        <p
          style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#0f766e",
            marginBottom: "0.5rem",
          }}
        >
          Pakistan University Guidance
        </p>

        <h1
          style={{
            fontSize: "2.3rem",
            lineHeight: 1.2,
            fontWeight: 800,
            color: "#0f172a",
            marginBottom: "0.75rem",
          }}
        >
          Find the right university for{" "}
          <span style={{ color: "#0f766e" }}>you</span> in Pakistan.
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "#475569",
            marginBottom: "1.5rem",
            maxWidth: "34rem",
          }}
        >
          PakUniInfo helps 1st &amp; 2nd year students, parents, and teachers
          explore universities across Pakistan — by city, province, programs
          and ranking.
        </p>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "1.75rem" }}>
          <button
            onClick={handleExploreClick}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background:
                "linear-gradient(to right, #0f766e, #22c55e, #4ade80)",
              color: "white",
              fontWeight: 600,
              fontSize: "0.95rem",
              boxShadow: "0 10px 25px rgba(16, 185, 129, 0.45)",
            }}
          >
            Explore universities
          </button>

          <button
            onClick={handleAboutClick}
            style={{
              padding: "0.75rem 1.3rem",
              borderRadius: "999px",
              border: "1px solid #cbd5f5",
              backgroundColor: "white",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "0.95rem",
              color: "#0f172a",
            }}
          >
            How PakUniInfo helps
          </button>
        </div>

        <div
          style={{
            fontSize: "0.85rem",
            color: "#64748b",
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <span>🎓 For FSC, ICS &amp; A-level students</span>
          <span>👪 Built for parents &amp; teachers too</span>
        </div>
      </section>

      {/* Right: Simple stats / info block */}
      <aside
        style={{
          borderRadius: "1.25rem",
          padding: "1.5rem",
          background:
            "radial-gradient(circle at top left, #22c55e1a, #0f172a)",
          color: "white",
          border: "1px solid rgba(148, 163, 184, 0.4)",
        }}
      >
        <h2
          style={{
            fontSize: "1.05rem",
            fontWeight: 600,
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
            display: "grid",
            gap: "0.75rem",
            fontSize: "0.9rem",
            color: "#e5e7eb",
          }}
        >
          <li>• Filter universities by province, city and programs.</li>
          <li>• See rankings and key information in one place.</li>
          <li>• Shortlist options for students and discuss with parents.</li>
          <li>• Future: AI-based guidance and auto-updated information.</li>
        </ul>
      </aside>
    </div>
  );
}

export default Home;
