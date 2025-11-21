import { useLocation, useNavigate } from "react-router-dom";

export default function Compare() {
  const location = useLocation();
  const navigate = useNavigate();

  const universities = location.state?.universities || [];

  if (!universities || universities.length === 0) {
    return (
      <div>
        <h1
          style={{
            fontSize: "1.6rem",
            fontWeight: 700,
            marginBottom: "0.75rem",
            color: "#0f172a",
          }}
        >
          Compare Universities
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
          You haven&apos;t selected any universities to compare yet.
        </p>
        <button
          onClick={() => navigate("/universities")}
          style={{
            marginTop: "0.75rem",
            padding: "0.5rem 1.2rem",
            borderRadius: "999px",
            border: "1px solid #cbd5f5",
            backgroundColor: "white",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          ← Go to Explore and select universities
        </button>
      </div>
    );
  }

  return (
    <div>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1
          style={{
            fontSize: "1.6rem",
            fontWeight: 700,
            marginBottom: "0.35rem",
            color: "#0f172a",
          }}
        >
          Compare Universities
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
          Comparing {universities.length} selected university
          {universities.length > 1 ? "ies" : "y"} side by side.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `160px repeat(${universities.length}, minmax(0, 1fr))`,
          gap: "0.75rem",
          alignItems: "stretch",
          fontSize: "0.9rem",
        }}
      >
        {/* Left labels */}
        <div style={{ fontWeight: 600, color: "#0f172a" }}>
          <div style={{ padding: "0.7rem 0.5rem" }}>Name</div>
          <div style={{ padding: "0.7rem 0.5rem" }}>Location</div>
          <div style={{ padding: "0.7rem 0.5rem" }}>Province</div>
          <div style={{ padding: "0.7rem 0.5rem" }}>Ranking</div>
          <div style={{ padding: "0.7rem 0.5rem" }}>Programs</div>
          <div style={{ padding: "0.7rem 0.5rem" }}>Website</div>
          <div style={{ padding: "0.7rem 0.5rem" }}>Description</div>
        </div>

        {/* Columns per university */}
        {universities.map((uni) => (
          <div
            key={uni._id}
            style={{
              borderRadius: "0.9rem",
              backgroundColor: "#020617",
              color: "white",
              boxShadow: "0 10px 24px rgba(15,23,42,0.8)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "0.7rem 0.9rem",
                borderBottom: "1px solid rgba(148,163,184,0.35)",
                fontWeight: 600,
                fontSize: "0.98rem",
              }}
            >
              {uni.name || "Unnamed University"}
            </div>

            <div style={{ padding: "0.7rem 0.9rem", borderBottom: "1px solid rgba(148,163,184,0.25)" }}>
              {uni.location || uni.city || "Not specified"}
            </div>

            <div style={{ padding: "0.7rem 0.9rem", borderBottom: "1px solid rgba(148,163,184,0.25)" }}>
              {uni.province || "Not specified"}
            </div>

            <div style={{ padding: "0.7rem 0.9rem", borderBottom: "1px solid rgba(148,163,184,0.25)" }}>
              {uni.ranking != null ? `#${uni.ranking}` : "N/A"}
            </div>

            <div style={{ padding: "0.7rem 0.9rem", borderBottom: "1px solid rgba(148,163,184,0.25)" }}>
              {Array.isArray(uni.programs) && uni.programs.length > 0
                ? uni.programs.join(", ")
                : "Not listed"}
            </div>

            <div style={{ padding: "0.7rem 0.9rem", borderBottom: "1px solid rgba(148,163,184,0.25)" }}>
              {uni.website ? (
                <a
                  href={uni.website}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#4ade80", textDecoration: "underline" }}
                >
                  Visit website
                </a>
              ) : (
                "Not provided"
              )}
            </div>

            <div style={{ padding: "0.7rem 0.9rem" }}>
              {uni.description ||
                "No detailed description available yet."}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/universities")}
        style={{
          marginTop: "1.25rem",
          padding: "0.5rem 1.3rem",
          borderRadius: "999px",
          border: "1px solid #cbd5f5",
          backgroundColor: "white",
          cursor: "pointer",
          fontSize: "0.9rem",
        }}
      >
        ← Back to Explore
      </button>
    </div>
  );
}
