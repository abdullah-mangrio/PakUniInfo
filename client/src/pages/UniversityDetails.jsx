import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToShortlist,
  removeFromShortlist,
  isInShortlist,
} from "../utils/shortlist";

export default function UniversityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // to re-render when shortlist changes
  const [savedTick, setSavedTick] = useState(0);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`http://localhost:5000/api/universities/${id}`);

        if (!res.ok) {
          if (res.status === 404) throw new Error("University not found.");
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

  const handleBack = () => navigate(-1);

  const handleToggleShortlist = () => {
    if (!university) return;

    if (isInShortlist(university._id)) {
      removeFromShortlist(university._id);
    } else {
      addToShortlist(university);
    }

    setSavedTick((v) => v + 1);
  };

  if (loading) return <p>Loading university details...</p>;

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

  if (!university) return null;

  const saved = isInShortlist(university._id);

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
        ← Back
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
          {name}
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
          {location || city || "Location not specified"}
          {province ? `, ${province}` : ""}
        </p>
      </header>

      {/* SAVE / REMOVE SHORTLIST BUTTON */}
      <button
        onClick={handleToggleShortlist}
        style={{
          marginBottom: "1.5rem",
          padding: "0.55rem 1.25rem",
          borderRadius: "999px",
          border: "1px solid #cbd5f5",
          backgroundColor: saved ? "#22c55e" : "white",
          color: saved ? "white" : "#0f172a",
          cursor: "pointer",
          fontSize: "0.9rem",
          fontWeight: 600,
          boxShadow: saved
            ? "0 8px 18px rgba(34,197,94,0.55)"
            : "0 5px 12px rgba(0,0,0,0.08)",
        }}
      >
        {saved ? "★ Saved to Shortlist" : "☆ Save to Shortlist"}
      </button>

      {/* DETAILS LAYOUT */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1.2fr)",
          gap: "1.75rem",
          alignItems: "flex-start",
        }}
      >
        {/* Overview */}
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
              "No detailed description is available yet. Visit the official university website for more."}
          </p>

          {/* Programs */}
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
                gap: "0.45rem",
              }}
            >
              {programs.map((p) => (
                <span
                  key={p}
                  style={{
                    padding: "0.3rem 0.7rem",
                    borderRadius: "999px",
                    fontSize: "0.83rem",
                    backgroundColor: "#e0f2fe",
                    border: "1px solid #bae6fd",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Not listed.</p>
          )}
        </div>

        {/* Quick Info */}
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

          <p>
            <strong>Ranking:</strong>{" "}
            {ranking != null ? `#${ranking}` : "N/A"}
          </p>

          <p>
            <strong>Location:</strong> {location || city || "Not specified"}
            {province ? `, ${province}` : ""}
          </p>

          {website && (
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={website}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#4ade80", textDecoration: "underline" }}
              >
                Visit Website
              </a>
            </p>
          )}
        </aside>
      </section>
    </div>
  );
}
