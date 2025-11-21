import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getShortlist,
  removeFromShortlist,
} from "../utils/shortlist";

export default function Shortlist() {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    setUniversities(getShortlist());
  }, []);

  const handleRemove = (id) => {
    const updated = removeFromShortlist(id);
    setUniversities(updated);
  };

  const handleViewDetails = (id) => {
    navigate(`/universities/${id}`);
  };

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
          Saved Universities
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
          These are universities you&apos;ve added to your shortlist on this
          device.
        </p>
      </header>

      {universities.length === 0 ? (
        <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
          You haven&apos;t added any universities yet. Go to{" "}
          <button
            onClick={() => navigate("/universities")}
            style={{
              border: "none",
              background: "none",
              color: "#0f766e",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
              fontSize: "0.95rem",
            }}
          >
            Explore
          </button>{" "}
          and save some universities to see them here.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {universities.map((uni) => (
            <article
              key={uni._id}
              style={{
                borderRadius: "0.75rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#020617",
                color: "white",
                boxShadow: "0 8px 20px rgba(15,23,42,0.6)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  marginBottom: "0.4rem",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                }}
              >
                {uni.name || "Unnamed University"}
              </h2>

              <p style={{ margin: 0, fontSize: "0.9rem", color: "#cbd5f5" }}>
                Location:{" "}
                <span style={{ color: "#e5e7eb" }}>
                  {uni.location || uni.city || "Not specified"}
                  {uni.province ? `, ${uni.province}` : ""}
                </span>
              </p>

              <p style={{ margin: "0.15rem 0", fontSize: "0.9rem" }}>
                Ranking:{" "}
                <span style={{ fontWeight: 600 }}>
                  {uni.ranking != null ? uni.ranking : "N/A"}
                </span>
              </p>

              <p style={{ margin: "0.15rem 0 0.35rem", fontSize: "0.9rem" }}>
                Programs:{" "}
                {Array.isArray(uni.programs) && uni.programs.length > 0 ? (
                  <span>{uni.programs.join(", ")}</span>
                ) : (
                  <span>Not listed</span>
                )}
              </p>

              <div
                style={{
                  marginTop: "0.6rem",
                  display: "flex",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => handleViewDetails(uni._id)}
                  style={{
                    padding: "0.4rem 0.9rem",
                    borderRadius: "999px",
                    border: "1px solid #cbd5f5",
                    backgroundColor: "white",
                    color: "#0f172a",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  View details
                </button>

                <button
                  onClick={() => handleRemove(uni._id)}
                  style={{
                    padding: "0.4rem 0.9rem",
                    borderRadius: "999px",
                    border: "1px solid #fecaca",
                    backgroundColor: "#fee2e2",
                    color: "#b91c1c",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  Remove from shortlist
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
