import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addToShortlist,
  removeFromShortlist,
  isInShortlist,
} from "../utils/shortlist";

const PAGE_SIZE = 10;

// Simple static options for now – later you can fetch from backend.
const PROVINCES = ["Punjab", "Sindh", "KPK", "Balochistan", "Islamabad"];
const CITIES = ["Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta"];
const PROGRAMS = ["BSCS", "BSEE", "BSIT", "BBA", "MBBS"];

export default function ExploreUniversities() {
  const navigate = useNavigate();

  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [searchName, setSearchName] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [program, setProgram] = useState("");
  const [sort, setSort] = useState("ranking-desc");

  // Just to trigger re-render when shortlist changes
  const [shortlistTick, setShortlistTick] = useState(0);

  // Compare selection (max 3)
  const [compareList, setCompareList] = useState([]);

  // Build query string based on filters
  const buildQuery = () => {
    const params = new URLSearchParams();

    params.set("page", page.toString());
    params.set("limit", PAGE_SIZE.toString());

    if (searchName.trim()) params.set("name", searchName.trim());
    if (province) params.set("province", province);
    if (city) params.set("location", city);
    if (program) params.set("program", program);

    if (sort) {
      const [sortBy, sortOrder] = sort.split("-");
      params.set("sortBy", sortBy);
      params.set("sortOrder", sortOrder);
    }

    return params.toString();
  };

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        setError("");

        const queryString = buildQuery();

        const res = await fetch(
          `http://localhost:5000/api/universities?${queryString}`
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchName, province, city, program, sort]);

  const handlePrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNext = () => {
    setPage((p) => Math.min(totalPages, p + 1));
  };

  const handleClearFilters = () => {
    setSearchName("");
    setProvince("");
    setCity("");
    setProgram("");
    setSort("ranking-desc");
    setPage(1);
  };

  // Reset to page 1 when filters change (except page itself)
  const handleFilterChangeWrapper = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const handleToggleShortlist = (university, event) => {
    // prevent card click navigation
    event.stopPropagation();

    if (isInShortlist(university._id)) {
      removeFromShortlist(university._id);
    } else {
      addToShortlist({
        _id: university._id,
        name: university.name,
        location: university.location,
        city: university.city,
        province: university.province,
        ranking: university.ranking,
        programs: university.programs,
        website: university.website,
        description: university.description,
      });
    }

    // bump tick to force re-render so button text/color updates
    setShortlistTick((v) => v + 1);
  };

  const handleToggleCompare = (university, event) => {
    event.stopPropagation();
    setCompareList((prev) => {
      const exists = prev.some((u) => u._id === university._id);
      if (exists) {
        return prev.filter((u) => u._id !== university._id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 universities at a time.");
        return prev;
      }
      return [...prev, university];
    });
  };

  const handleOpenCompare = () => {
    if (compareList.length < 2) return;
    navigate("/compare", { state: { universities: compareList } });
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  return (
    <div style={{ position: "relative", paddingBottom: "3.5rem" }}>
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
          Search and filter universities across Pakistan by name, province, city
          and programs. Select up to three to compare side by side.
        </p>
      </header>

      {/* FILTER BAR */}
      <section
        style={{
          marginBottom: "1.4rem",
          padding: "1rem 1.25rem",
          borderRadius: "0.9rem",
          backgroundColor: "#e5e7eb",
          border: "1px solid #cbd5f5",
          boxShadow: "0 6px 16px rgba(148,163,184,0.5)",
        }}
      >
        {/* Search bar */}
        <div style={{ marginBottom: "0.9rem" }}>
          <input
            type="text"
            placeholder="Search by university name..."
            value={searchName}
            onChange={(e) =>
              handleFilterChangeWrapper(setSearchName)(e.target.value)
            }
            style={{
              width: "100%",
              padding: "0.65rem 0.85rem",
              borderRadius: "999px",
              border: "1px solid #cbd5f5",
              fontSize: "0.95rem",
            }}
          />
        </div>

        {/* Filter pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            alignItems: "center",
          }}
        >
          {/* Province */}
          <div
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "999px",
              backgroundColor: "white",
              border: "1px solid #cbd5f5",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
              Province
            </span>
            <select
              value={province}
              onChange={(e) =>
                handleFilterChangeWrapper(setProvince)(e.target.value)
              }
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "0.9rem",
              }}
            >
              <option value="">All</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "999px",
              backgroundColor: "white",
              border: "1px solid #cbd5f5",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>City</span>
            <select
              value={city}
              onChange={(e) =>
                handleFilterChangeWrapper(setCity)(e.target.value)
              }
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "0.9rem",
              }}
            >
              <option value="">All</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Program */}
          <div
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "999px",
              backgroundColor: "white",
              border: "1px solid #cbd5f5",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
              Program
            </span>
            <select
              value={program}
              onChange={(e) =>
                handleFilterChangeWrapper(setProgram)(e.target.value)
              }
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "0.9rem",
              }}
            >
              <option value="">All</option>
              {PROGRAMS.map((prog) => (
                <option key={prog} value={prog}>
                  {prog}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "999px",
              backgroundColor: "white",
              border: "1px solid #cbd5f5",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Sort</span>
            <select
              value={sort}
              onChange={(e) =>
                handleFilterChangeWrapper(setSort)(e.target.value)
              }
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "0.9rem",
              }}
            >
              <option value="ranking-desc">Ranking: High → Low</option>
              <option value="ranking-asc">Ranking: Low → High</option>
              <option value="name-asc">Name: A → Z</option>
              <option value="name-desc">Name: Z → A</option>
            </select>
          </div>

          {/* Clear filters */}
          <button
            onClick={handleClearFilters}
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: "999px",
              border: "1px solid #cbd5f5",
              backgroundColor: "white",
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            Clear filters
          </button>
        </div>
      </section>

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
          No universities found with these filters.
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
        {universities.map((uni) => {
          const saved = isInShortlist(uni._id);
          const inCompare = compareList.some((u) => u._id === uni._id);

          return (
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

              <div
                style={{
                  marginTop: "0.6rem",
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={(e) => handleToggleShortlist(uni, e)}
                  style={{
                    padding: "0.35rem 0.9rem",
                    borderRadius: "999px",
                    border: "1px solid #cbd5f5",
                    backgroundColor: saved ? "#22c55e" : "white",
                    color: saved ? "white" : "#0f172a",
                    fontSize: "0.82rem",
                    cursor: "pointer",
                  }}
                >
                  {saved ? "Remove from shortlist" : "Save to shortlist"}
                </button>

                <button
                  onClick={(e) => handleToggleCompare(uni, e)}
                  style={{
                    padding: "0.35rem 0.9rem",
                    borderRadius: "999px",
                    border: "1px solid #4f46e5",
                    backgroundColor: inCompare ? "#4f46e5" : "white",
                    color: inCompare ? "white" : "#0f172a",
                    fontSize: "0.82rem",
                    cursor: "pointer",
                  }}
                >
                  {inCompare ? "Remove from compare" : "Add to compare"}
                </button>

                <p
                  style={{
                    margin: 0,
                    fontSize: "0.8rem",
                    color: "#a5b4fc",
                  }}
                >
                  Click card to view full details →
                </p>
              </div>
            </article>
          );
        })}
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

      {/* COMPARE BAR */}
      {compareList.length >= 2 && (
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "0.6rem 1.5rem",
            background:
              "linear-gradient(to right, rgba(15,23,42,0.98), rgba(30,64,175,0.95))",
            color: "white",
            display: "flex",
            justifyContent: "center",
            zIndex: 40,
          }}
        >
          <div
            style={{
              maxWidth: "1120px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div style={{ fontSize: "0.9rem" }}>
              Selected{" "}
              <strong>{compareList.length}</strong> university
              {compareList.length > 1 ? "ies" : "y"} for comparison.
            </div>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              <button
                onClick={handleClearCompare}
                style={{
                  padding: "0.4rem 0.9rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(148,163,184,0.7)",
                  backgroundColor: "transparent",
                  color: "white",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
              <button
                onClick={handleOpenCompare}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "999px",
                  border: "none",
                  background:
                    "linear-gradient(to right, #4f46e5, #6366f1, #a855f7)",
                  color: "white",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 10px 24px rgba(79,70,229,0.7)",
                }}
              >
                Compare now →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
