import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5000/api";

function ExploreUniversities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/universities?page=${currentPage}&limit=10`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch universities");
        }

        const data = await response.json();

        // Our backend returns { currentPage, totalPages, results: [...] }
        setUniversities(data.results || []);
        setCurrentPage(data.currentPage || 1);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <h2>Explore Universities</h2>
      <p>Listing universities from your backend API.</p>

      {loading && <p>Loading universities...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && universities.length === 0 && (
        <p>No universities found.</p>
      )}

      <div style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
        {universities.map((uni) => (
          <div
            key={uni._id}
            style={{
              border: "1px solid #1f2937",
              borderRadius: "0.5rem",
              padding: "1rem",
              backgroundColor: "#020617",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>{uni.name}</h3>
            <p style={{ margin: "0.2rem 0" }}>
              <strong>Location:</strong> {uni.location}, {uni.province}
            </p>
            {uni.ranking && (
              <p style={{ margin: "0.2rem 0" }}>
                <strong>Ranking:</strong> {uni.ranking}
              </p>
            )}
            {uni.programs && uni.programs.length > 0 && (
              <p style={{ margin: "0.2rem 0" }}>
                <strong>Programs:</strong> {uni.programs.join(", ")}
              </p>
            )}
            {uni.website && (
              <p style={{ margin: "0.2rem 0" }}>
                <a
                  href={uni.website}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#38bdf8" }}
                >
                  Visit Website
                </a>
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Simple pagination controls */}
      {!loading && !error && totalPages > 1 && (
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            style={{ padding: "0.5rem 1rem" }}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{ padding: "0.5rem 1rem" }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ExploreUniversities;
