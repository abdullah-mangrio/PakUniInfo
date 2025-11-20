import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

export default function ExploreUniversities() {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `http://localhost:5000/api/universities?page=${page}&limit=${PAGE_SIZE}`
        );

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();

        setUniversities(data.results || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching universities:", err);
        setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, [page]);

  const handlePrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNext = () => {
    setPage((p) => Math.min(totalPages, p + 1));
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
          Explore Universities
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
          Browse universities from the PakUniInfo database. Soon you'll be able
          to filter by province, city, programs, and ranking.
        </p>
      </header>

      {/* STATUS SECTION */}
      {loading && (
        <p style={{ color: "#0f172a", fontSize: "0.95rem" }}>
          Loading universities...
        </p>
      )}

      {!loading && error && (
        <p style={{ color: "crimson", fontSize: "0.95rem" }}>{error}</p>
      )}

      {!loading && !error && universities.length === 0 && (
        <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
          No universities found. Try adding some using the backend.
        </p>
      )}

      {/* LIST OF UNIVERSITIES */}
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
            onClick={() => navigate(`/universities/${uni._id}`)}
            style={{
              borderRadius: "0.75rem",
              padding: "1.25rem 1.5rem",
              backgroundColor: "#020617",
              color: "white",
              boxShadow: "0 8px 20px rgba(15,23,42,0.6)",
              cursor: "pointer",
              transition: "transform 0.12s ease, box-shadow 0.12s ease",
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

            {uni.website && (
              <a
                href={uni.website}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "0.4rem",
                  fontSize: "0.88rem",
                  color: "#4ade80",
                  textDecoration: "underline",
                }}
                onClick={(e) => e.stopPropagation()} // so link click doesn't trigger card navigation
              >
                Visit Website
              </a>
            )}

            <p
              style={{
                marginTop: "0.6rem",
                fontSize: "0.8rem",
                color: "#a5b4fc",
              }}
            >
              Click card to view full details →
            </p>
          </article>
        ))}
      </div>

      {/* PAGINATION */}
      {!loading && !error && universities.length > 0 && (
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.9rem",
            color: "#475569",
          }}
        >
          <div>
            Page{" "}
            <span style={{ fontWeight: 600 }}>
              {page} / {totalPages}
            </span>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={handlePrev}
              disabled={page === 1}
              style={{
                padding: "0.4rem 0.9rem",
                borderRadius: "999px",
                border: "1px solid #cbd5f5",
                backgroundColor: page === 1 ? "#e5e7eb" : "white",
                cursor: page === 1 ? "not-allowed" : "pointer",
              }}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={page === totalPages}
              style={{
                padding: "0.4rem 0.9rem",
                borderRadius: "999px",
                border: "1px solid #cbd5f5",
                backgroundColor: page === totalPages ? "#e5e7eb" : "white",
                cursor: page === totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
