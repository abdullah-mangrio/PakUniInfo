import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PROVINCES = ["Any", "Punjab", "Sindh", "KPK", "Balochistan", "Islamabad"];
const CITIES = ["Any", "Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta"];
const PROGRAMS = ["Any", "BSCS", "BSEE", "BSIT", "BBA", "MBBS"];

export default function Guidance() {
  const navigate = useNavigate();

  const [province, setProvince] = useState("Any");
  const [city, setCity] = useState("Any");
  const [program, setProgram] = useState("Any");
  const [marksBand, setMarksBand] = useState("medium"); // low | medium | high

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [explanation, setExplanation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRecommendations([]);

    try {
      const params = new URLSearchParams();

      // Use filters from choices
      params.set("page", "1");
      params.set("limit", "20");

      if (province !== "Any") params.set("province", province);
      if (city !== "Any") params.set("location", city);
      if (program !== "Any") params.set("program", program);

      // Use marks band to decide sorting.
      // High marks → top ranked first
      // Medium → still ranking
      // Low → sort by name (more general)
      if (marksBand === "high" || marksBand === "medium") {
        params.set("sortBy", "ranking");
        params.set("sortOrder", "asc");
      } else {
        params.set("sortBy", "name");
        params.set("sortOrder", "asc");
      }

      const res = await fetch(
        `http://localhost:5000/api/universities?${params.toString()}`
      );

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      const results = data.results || [];
      setRecommendations(results);

      // Build explanation text
      let reason = "Based on your answers, we looked for universities ";
      const parts = [];

      if (program !== "Any") {
        parts.push(`offering **${program}** or similar programs`);
      }
      if (city !== "Any") {
        parts.push(`in **${city}**`);
      } else if (province !== "Any") {
        parts.push(`in **${province}** province`);
      }

      if (marksBand === "high") {
        parts.push("with **higher rankings** (you selected high marks)");
      } else if (marksBand === "medium") {
        parts.push("with **balanced rankings** (you selected medium marks)");
      } else {
        parts.push(
          "with a **wider spread of options** (you selected low/average marks)"
        );
      }

      if (parts.length > 0) {
        reason += parts.join(", ") + ".";
      } else {
        reason += "across Pakistan.";
      }

      setExplanation(reason);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError(err.message || "Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  // --- SHARED STYLES ---
  const outerCardStyle = {
    borderRadius: "1.25rem",
    background:
      "radial-gradient(circle at top left, #ffffff 0%, #f1f5f9 60%, #e2e8f0 100%)",
    padding: "2.4rem 2.6rem",
    boxShadow: "0 26px 70px rgba(15,23,42,0.7)",
    marginTop: "1.5rem",
  };

  const formCardStyle = {
    marginBottom: "1.9rem",
    padding: "1.25rem 1.5rem",
    borderRadius: "1rem",
    backgroundColor: "#e5e7eb",
    border: "1px solid #cbd5f5",
    boxShadow: "0 8px 20px rgba(148,163,184,0.6)",
  };

  const labelStyle = {
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "#0f172a",
  };

  const inputStyle = {
    padding: "0.55rem 0.7rem",
    borderRadius: "0.5rem",
    border: "1px solid #cbd5f5",
    fontSize: "0.9rem",
    backgroundColor: "white",
  };

  const primaryButtonStyle = {
    padding: "0.55rem 1.4rem",
    borderRadius: "999px",
    border: "none",
    background:
      "linear-gradient(to right, #0f766e, #22c55e, #4ade80)",
    color: "white",
    fontWeight: 600,
    fontSize: "0.9rem",
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(16, 185, 129, 0.55)",
  };

  const secondaryButtonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "999px",
    border: "1px solid #cbd5f5",
    backgroundColor: "white",
    fontSize: "0.9rem",
    cursor: "pointer",
    color: "#0f172a",
  };

  return (
    <div style={outerCardStyle}>
      {/* HEADER */}
      <header style={{ marginBottom: "1.6rem" }}>
        <p
          style={{
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "#0f766e",
            marginBottom: "0.3rem",
            fontWeight: 600,
          }}
        >
          AI guidance – v1 (rules based)
        </p>
        <h1
          style={{
            fontSize: "1.9rem",
            fontWeight: 800,
            marginBottom: "0.45rem",
            color: "#020617",
          }}
        >
          Find universities that match your profile.
        </h1>
        <p
          style={{
            color: "#64748b",
            fontSize: "0.95rem",
            maxWidth: "40rem",
          }}
        >
          Answer a few quick questions and we&apos;ll suggest universities that
          roughly match your location, program interest, and marks. In the
          future this flow can be powered by a real AI advisor.
        </p>
      </header>

      {/* FORM CARD */}
      <section style={formCardStyle}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {/* Province */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={labelStyle}>Preferred province</label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              style={inputStyle}
            >
              {PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={labelStyle}>Preferred city</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={inputStyle}
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Program */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={labelStyle}>
              Program you&apos;re interested in
            </label>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              style={inputStyle}
            >
              {PROGRAMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Marks band */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.35rem",
            }}
          >
            <label style={labelStyle}>
              Your current marks / expected grade
            </label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
                fontSize: "0.9rem",
                color: "#0f172a",
              }}
            >
              <label
                style={{
                  display: "flex",
                  gap: "0.4rem",
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  name="marksBand"
                  value="high"
                  checked={marksBand === "high"}
                  onChange={() => setMarksBand("high")}
                />
                85% or above / A grade
              </label>
              <label
                style={{
                  display: "flex",
                  gap: "0.4rem",
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  name="marksBand"
                  value="medium"
                  checked={marksBand === "medium"}
                  onChange={() => setMarksBand("medium")}
                />
                Around 70% – 85%
              </label>
              <label
                style={{
                  display: "flex",
                  gap: "0.4rem",
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  name="marksBand"
                  value="low"
                  checked={marksBand === "low"}
                  onChange={() => setMarksBand("low")}
                />
                Below 70% / unsure / mixed grades
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "0.4rem",
              gap: "0.6rem",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/universities")}
              style={secondaryButtonStyle}
            >
              Browse manually instead
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...primaryButtonStyle,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.85 : 1,
              }}
            >
              {loading ? "Finding universities..." : "Get recommendations"}
            </button>
          </div>
        </form>
      </section>

      {/* ERROR */}
      {error && (
        <p style={{ color: "crimson", fontSize: "0.95rem", marginBottom: "0.9rem" }}>
          {error}
        </p>
      )}

      {/* RESULTS */}
      {!loading && !error && recommendations.length > 0 && (
        <section>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#475569",
              marginBottom: "0.9rem",
            }}
          >
            {explanation}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {recommendations.map((uni) => (
              <article
                key={uni._id}
                onClick={() => navigate(`/universities/${uni._id}`)}
                style={{
                  borderRadius: "0.9rem",
                  padding: "1.1rem 1.3rem",
                  backgroundColor: "#020617",
                  color: "white",
                  boxShadow: "0 10px 24px rgba(15,23,42,0.8)",
                  cursor: "pointer",
                  border: "1px solid rgba(148,163,184,0.55)",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    marginBottom: "0.3rem",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                  }}
                >
                  {uni.name}
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.9rem",
                    color: "#cbd5f5",
                  }}
                >
                  {uni.location || uni.city || "Location not specified"}
                  {uni.province ? `, ${uni.province}` : ""}
                </p>
                <p
                  style={{
                    margin: "0.25rem 0 0.15rem",
                    fontSize: "0.88rem",
                  }}
                >
                  Ranking:{" "}
                  <span style={{ fontWeight: 600 }}>
                    {uni.ranking != null ? `#${uni.ranking}` : "N/A"}
                  </span>
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.88rem",
                  }}
                >
                  Programs:{" "}
                  {Array.isArray(uni.programs) && uni.programs.length > 0
                    ? uni.programs.join(", ")
                    : "Not listed"}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {!loading && !error && recommendations.length === 0 && (
        <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "0.4rem" }}>
          Fill the form above and click &quot;Get recommendations&quot; to see
          suggested universities.
        </p>
      )}
    </div>
  );
}
