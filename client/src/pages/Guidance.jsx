import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api"; // ✅ default export

const PROVINCES = [
  { label: "Any", value: "Any" },
  { label: "Punjab", value: "Punjab" },
  { label: "Sindh", value: "Sindh" },
  { label: "Khyber Pakhtunkhwa", value: "KPK" },
  { label: "Balochistan", value: "Balochistan" },
  { label: "Islamabad", value: "Islamabad" },
];

const CITIES = [
  "Any", // ✅ added
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Peshawar",
  "Quetta",
  "Faisalabad",
  "Multan",
];

const PROGRAMS = [
  "Any", // ✅ added (consistent)
  "BSCS",
  "BSSE",
  "BSIT",
  "BBA",
  "MBBS",
  "BDS",
  "PharmD",
  "LLB",
  "BS Psychology",
  "BS Economics",
];

export default function Guidance() {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    setExplanation("");

    try {
      const params = new URLSearchParams();
      params.set("page", "1");
      params.set("limit", "10"); // ✅ lighter for mobile

      // backend filters: province, city, program
      if (province !== "Any") params.set("province", province);
      if (city !== "Any") params.set("city", city);
      if (program !== "Any") params.set("program", program);

      // sorting rules based on marks
      if (marksBand === "high") {
        params.set("sortBy", "ranking");
        params.set("sortOrder", "asc");
      } else if (marksBand === "low") {
        params.set("sortBy", "ranking");
        params.set("sortOrder", "desc");
      } else {
        params.set("sortBy", "name");
        params.set("sortOrder", "asc");
      }

      const url = `${API_BASE_URL}/api/universities?${params.toString()}`;

      // ✅ timeout controller (prevents infinite hang on mobile / cold starts)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s

      let res;
      try {
        res = await fetch(url, { signal: controller.signal });
      } finally {
        clearTimeout(timeoutId);
      }

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      const results = data.results || [];

      const sliced = results.slice(0, 6);
      setRecommendations(sliced);

      // explanation
      let reason = "Based on your answers, we looked for universities ";
      const parts = [];

      if (program !== "Any") parts.push(`offering **${program}** or similar programs`);
      if (city !== "Any") parts.push(`in **${city}**`);
      else if (province !== "Any") parts.push(`in **${province}** province`);

      if (marksBand === "high") parts.push("with **higher rankings** (you selected high marks)");
      else if (marksBand === "medium") parts.push("with **balanced rankings** (you selected medium marks)");
      else parts.push("with a **wider spread of options** (you selected low/average marks)");

      reason += parts.length ? parts.join(", ") + "." : "across Pakistan.";
      setExplanation(reason);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      if (err?.name === "AbortError") {
        setError("Request timed out (mobile network / server cold start). Please try again.");
      } else {
        setError(err?.message || "Failed to fetch recommendations.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: isMobile ? "1.6rem 1.2rem 2rem" : "2rem 1.5rem 2.4rem",
        boxSizing: "border-box",
      }}
    >
      <header style={{ marginBottom: "1.5rem" }}>
        <p
          style={{
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#0f766e",
            marginBottom: "0.3rem",
            fontWeight: 600,
          }}
        >
          AI guidance – v1 (rules based)
        </p>
        <h1
          style={{
            fontSize: isMobile ? "1.4rem" : "1.7rem",
            fontWeight: 800,
            marginBottom: "0.4rem",
            color: "#0f172a",
          }}
        >
          Find universities that match your profile.
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
          Answer a few quick questions and we&apos;ll suggest universities that
          roughly match your location, program interest, and marks.
        </p>
      </header>

      {/* FORM */}
      <section
        style={{
          marginBottom: "1.8rem",
          padding: "1.2rem 1.4rem",
          borderRadius: "0.9rem",
          backgroundColor: "#e5e7eb",
          border: "1px solid #cbd5f5",
          boxShadow: "0 8px 20px rgba(148,163,184,0.6)",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: isMobile
              ? "minmax(0, 1fr)"
              : "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {/* Province */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
              Preferred province
            </label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              style={{
                padding: "0.55rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
              }}
            >
              {PROVINCES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
              Preferred city
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                padding: "0.55rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
              }}
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
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
              Program you&apos;re interested in
            </label>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              style={{
                padding: "0.55rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
              }}
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
              gridColumn: "1 / -1",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}
          >
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
              Your marks (overall)
            </label>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
              Rough guidance only — to adjust how selective recommendations should be.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.8rem",
                marginTop: "0.3rem",
              }}
            >
              <label style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                <input
                  type="radio"
                  name="marksBand"
                  value="high"
                  checked={marksBand === "high"}
                  onChange={() => setMarksBand("high")}
                />
                85% or above / A grade
              </label>

              <label style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                <input
                  type="radio"
                  name="marksBand"
                  value="medium"
                  checked={marksBand === "medium"}
                  onChange={() => setMarksBand("medium")}
                />
                Around 70% – 85%
              </label>

              <label style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
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
              justifyContent: isMobile ? "center" : "flex-end",
              alignItems: "center",
              marginTop: "0.4rem",
              gap: isMobile ? "0.5rem" : "0.6rem",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/universities")}
              style={{
                padding: isMobile ? "0.4rem 0.85rem" : "0.5rem 1rem",
                borderRadius: "999px",
                border: "1px solid #cbd5f5",
                backgroundColor: "white",
                fontSize: isMobile ? "0.82rem" : "0.9rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Browse manually instead
            </button>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: isMobile ? "0.45rem 1.1rem" : "0.55rem 1.4rem",
                borderRadius: "999px",
                border: "none",
                background: "linear-gradient(to right, #0f766e, #22c55e, #4ade80)",
                color: "white",
                fontWeight: 600,
                fontSize: isMobile ? "0.85rem" : "0.9rem",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 10px 24px rgba(16, 185, 129, 0.55)",
                whiteSpace: "nowrap",
              }}
            >
              {loading ? "Finding universities..." : "Get recommendations"}
            </button>
          </div>
        </form>
      </section>

      {/* RESULTS */}
      {error && <p style={{ color: "crimson", fontSize: "0.95rem" }}>{error}</p>}

      {!loading && !error && recommendations.length > 0 && (
        <section>
          <p style={{ fontSize: "0.9rem", color: "#475569", marginBottom: "0.9rem" }}>
            {explanation}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {recommendations.map((uni) => (
              <article
                key={uni._id}
                style={{
                  borderRadius: "0.85rem",
                  padding: "1rem 1.2rem",
                  backgroundColor: "#020617",
                  color: "white",
                  boxShadow: "0 10px 26px rgba(15,23,42,0.7)",
                  border: "1px solid rgba(148, 163, 184, 0.45)",
                }}
              >
                <h2 style={{ margin: 0, marginBottom: "0.2rem", fontSize: "1.05rem", fontWeight: 700 }}>
                  {uni.name}
                </h2>

                <p style={{ margin: 0, fontSize: "0.9rem", color: "#cbd5f5" }}>
                  {(uni.city || uni.location || "Location not specified")}
                  {uni.province ? `, ${uni.province}` : ""}
                </p>

                <p style={{ margin: "0.2rem 0", fontSize: "0.88rem" }}>
                  Ranking: <span style={{ fontWeight: 600 }}>{uni.ranking != null ? `#${uni.ranking}` : "N/A"}</span>
                </p>

                <p style={{ margin: 0, fontSize: "0.88rem" }}>
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
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
          Fill the form above and click &quot;Get recommendations&quot; to see suggested universities.
        </p>
      )}
    </div>
  );
}
