import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UniversityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `http://localhost:5000/api/universities/${id}`
        );

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("University not found.");
          }
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        setUniversity(data);
      } catch (err) {
        console.error("Error fetching university:", err);
        setError(err.message || "Failed to fetch university details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // back to previous page
  };

  if (loading) {
    return <p>Loading university details...</p>;
  }

  if (error) {
    return (
      <div>
        <button
          onClick={handleBack}
          style={{
            marginBottom: "1rem",
            padding: "0.35rem 0.9rem",
            borderRadius: "999px",
            border: "1px solid #cbd5f5",
            backgroundColor: "white",
            cursor: "pointer",
            fontSize: "0.85rem",
          }}
        >
          ← Back
        </button>
        <p style={{ color: "crimson" }}>{error}</p>
      </div>
    );
  }

  if (!university) {
    return (
      <div>
        <button
          onClick={handleBack}
          style={{
            marginBottom: "1rem",
            padding: "0.35rem 0.9rem",
            borderRadius: "999px",
            border: "1px solid #cbd5f5",
            backgroundColor: "white",
            cursor: "pointer",
            fontSize: "0.85rem",
          }}
        >
          ← Back
        </button>
        <p>University details not available.</p>
      </div>
    );
  }

  const {
    name,
    location,
    city,
    province,
    ranking,
    programs,
    website,
    description,
  } = university;

  return (
    <div>
      <button
        onClick={handleBack}
        style={{
          marginBottom: "1rem",
          padding: "0.35rem 0.9rem",
          borderRadius: "999px",
          border: "1px solid #cbd5f5",
          backgroundColor: "white",
          cursor: "pointer",
          fontSize: "0.85rem",
        }}
      >
        ← Back to results
      </button>

      <header style={{ marginBottom: "1rem" }}>
        <h1
          style={{
            fontSize: "1.7rem",
            fontWeight: 700,
            marginBottom: "0.35rem",
            color: "#0f172a",
          }}
        >
          {name || "University"}
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
          {location || city || "Location not specified"}
          {province ? `, ${province}` : ""}
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1.2fr)",
          gap: "1.75rem",
          alignItems: "flex-start",
        }}
      >
        {/* Left: description and programs */}
        <div>
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              marginBottom: "0.4rem",
              color: "#0f172a",
            }}
          >
            Overview
          </h2>
          <p
            style={{
              fontSize: "0.94rem",
              color: "#475569",
              marginBottom: "1rem",
              lineHeight: 1.5,
            }}
          >
            {description ||
              "No detailed description is available yet. Please visit the official website or contact the university for more information."}
          </p>

          <h3
            style={{
              fontSize: "0.98rem",
              fontWeight: 600,
              marginBottom: "0.35rem",
              color: "#0f172a",
            }}
          >
            Programs
          </h3>
          {Array.isArray(programs) && programs.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.4rem",
                marginBottom: "1rem",
              }}
            >
              {programs.map((p) => (
                <span
                  key={p}
                  style={{
                    fontSize: "0.8rem",
                    padding: "0.25rem 0.6rem",
                    borderRadius: "999px",
                    backgroundColor: "#e0f2fe",
                    color: "#0f172a",
                    border: "1px solid #bae6fd",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
              Programs not listed yet.
            </p>
          )}
        </div>

        {/* Right: quick info card */}
        <aside
          style={{
            borderRadius: "0.9rem",
            padding: "1rem 1.25rem",
            background: "linear-gradient(135deg, #0f172a, #020617)",
            color: "white",
            boxShadow: "0 16px 30px rgba(15,23,42,0.7)",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: "0.75rem",
            }}
          >
            Quick Info
          </h2>

          <dl
            style={{
              margin: 0,
              display: "grid",
              rowGap: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <dt style={{ color: "#cbd5f5" }}>Location</dt>
              <dd style={{ margin: 0 }}>
                {location || city || "Not specified"}
                {province ? `, ${province}` : ""}
              </dd>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <dt style={{ color: "#cbd5f5" }}>Ranking</dt>
              <dd style={{ margin: 0 }}>
                {ranking != null ? `#${ranking}` : "N/A"}
              </dd>
            </div>

            {website && (
              <div style={{ marginTop: "0.4rem" }}>
                <dt
                  style={{
                    color: "#cbd5f5",
                    marginBottom: "0.15rem",
                  }}
                >
                  Official Website
                </dt>
                <dd style={{ margin: 0 }}>
                  <a
                    href={website}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "#4ade80",
                      fontSize: "0.88rem",
                      textDecoration: "underline",
                    }}
                  >
                    Visit Website
                  </a>
                </dd>
              </div>
            )}
          </dl>

          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.78rem",
              color: "#e5e7eb",
              lineHeight: 1.4,
            }}
          >
            Always confirm admission details, fee structure, and updated
            programs from the official university website or admissions office.
          </p>
        </aside>
      </section>
    </div>
  );
}
