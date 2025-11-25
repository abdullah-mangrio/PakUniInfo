import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import {
  addToShortlist,
  removeFromShortlist,
  isInShortlist,
} from "../utils/shortlist";
import {
  addToCompare,
  removeFromCompare,
  isInCompareList,
  getCompareList,
} from "../utils/compare";

const PAGE_SIZE = 10;

// Some example filter options – you can adjust or extend
const PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
];

const CITIES = [
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

  // Responsive breakpoint
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // re-render when shortlist / compare changes
  const [shortlistTick, setShortlistTick] = useState(0);
  const [compareTick, setCompareTick] = useState(0);

  // Build query string based on filters
  const buildQuery = () => {
    const params = new URLSearchParams();

    params.set("page", page.toString());
    params.set("limit", PAGE_SIZE.toString());

    if (searchName) params.set("search", searchName);
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
      });
    }

    setShortlistTick((v) => v + 1); // trigger re-render
  };

  const handleToggleCompare = (university, event) => {
    event.stopPropagation();

    if (isInCompareList(university._id)) {
      removeFromCompare(university._id);
      setCompareTick((v) => v + 1);
      return;
    }

    const current = getCompareList();
    if (current.length >= 3) {
      alert("You can compare up to 3 universities at a time.");
      return;
    }

    addToCompare(university);
    setCompareTick((v) => v + 1);
  };

  // ---------- STYLES ----------
  const outerCardStyle = {
    borderRadius: "1.25rem",
    background:
      "radial-gradient(circle at top left, #ffffff 0%, #f1f5f9 60%, #e2e8f0 100%)",
    padding: isMobile ? "1.6rem 1.4rem" : "2.4rem 2.6rem",
    boxShadow: "0 26px 70px rgba(15,23,42,0.7)",
    boxSizing: "border-box",
  };

  const pillContainerStyle = {
    padding: "0.35rem 0.75rem",
    borderRadius: "999px",
    backgroundColor: "white",
    border: "1px solid #cbd5f5",
    display: "flex",
    alignItems: isMobile ? "flex-start" : "center",
    gap: "0.4rem",
    flexDirection: isMobile ? "column" : "row",
    width: isMobile ? "100%" : "auto",
    boxSizing: "border-box", // ✅ prevent overflow
  };

  const pillLabelStyle = {
    fontSize: "0.8rem",
    color: "#64748b",
  };

  const pillSelectStyle = {
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "0.9rem",
    width: isMobile ? "100%" : "auto",
    boxSizing: "border-box",
  };

  return (
    <div>
      <div style={outerCardStyle}>
        {/* HEADER */}
        <header style={{ marginBottom: "1.6rem" }}>
          <p
            style={{
              fontSize: "0.78rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#0f766e",
              fontWeight: 600,
              marginBottom: "0.35rem",
            }}
          >
            Browse the PakUniInfo database
          </p>
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: 800,
              color: "#020617",
              letterSpacing: "-0.03em",
              marginBottom: "0.35rem",
            }}
          >
            Explore universities in Pakistan
          </h1>
          <p
            style={{
              color: "#64748b",
              fontSize: "0.95rem",
              maxWidth: "40rem",
            }}
          >
            Filter by city, province or program, then compare and shortlist
            universities that match your goals.
          </p>
        </header>

        {/* SEARCH INPUT */}
        <div style={{ marginBottom: "1.2rem" }}>
          <label
            htmlFor="search-name"
            style={{
              display: "block",
              marginBottom: "0.35rem",
              fontSize: "0.85rem",
              fontWeight: 500,
              color: "#0f172a",
            }}
          >
            Search by name
          </label>
          <div
            style={{
              borderRadius: "0.9rem",
              backgroundColor: "white",
              border: "1px solid #cbd5f5",
              padding: "0.2rem 0.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              boxSizing: "border-box",
            }}
          >
            <span style={{ paddingLeft: "0.6rem" }}>🔍</span>
            <input
              id="search-name"
              type="text"
              placeholder="Search by university name..."
              value={searchName}
              onChange={(e) =>
                handleFilterChangeWrapper(setSearchName)(e.target.value)
              }
              style={{
                width: "100%",
                padding: "0.8rem 1rem",
                borderRadius: "0.75rem",
                border: "none",
                fontSize: "0.95rem",
                boxSizing: "border-box",
                backgroundColor: "white",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Filter pills row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: isMobile ? "0.5rem" : "0.75rem",
            alignItems: isMobile ? "stretch" : "center",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {/* Province */}
          <div style={pillContainerStyle}>
            <span style={pillLabelStyle}>Province</span>
            <select
              value={province}
              onChange={(e) =>
                handleFilterChangeWrapper(setProvince)(e.target.value)
              }
              style={pillSelectStyle}
            >
              <option value="">All provinces</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div style={pillContainerStyle}>
            <span style={pillLabelStyle}>City</span>
            <select
              value={city}
              onChange={(e) =>
                handleFilterChangeWrapper(setCity)(e.target.value)
              }
              style={pillSelectStyle}
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
          <div style={pillContainerStyle}>
            <span style={pillLabelStyle}>Program</span>
            <select
              value={program}
              onChange={(e) =>
                handleFilterChangeWrapper(setProgram)(e.target.value)
              }
              style={pillSelectStyle}
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
          <div style={pillContainerStyle}>
            <span style={pillLabelStyle}>Sort by</span>
            <select
              value={sort}
              onChange={(e) =>
                handleFilterChangeWrapper(setSort)(e.target.value)
              }
              style={pillSelectStyle}
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
              width: isMobile ? "100%" : "auto",
              textAlign: "center",
              boxSizing: "border-box", // ✅ no overflow
            }}
          >
            Clear filters
          </button>

          {/* Open Compare */}
          <button
            onClick={() => navigate("/compare")}
            style={{
              padding: "0.45rem 1rem",
              borderRadius: "999px",
              border: "none",
              background:
                "linear-gradient(to right, #0f766e, #22c55e, #4ade80)",
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 10px 24px rgba(16, 185, 129, 0.55)",
              width: isMobile ? "100%" : "auto",
              textAlign: "center",
              boxSizing: "border-box", // ✅ no overflow
            }}
          >
            Open compare view
          </button>
        </div>

        {/* STATUS MESSAGES */}
        {loading && (
          <div style={{ marginTop: "1.2rem" }}>
            <LoadingSpinner label="Loading universities..." />
          </div>
        )}

        {!loading && error && (
          <div style={{ marginTop: "1.2rem" }}>
            <ErrorMessage message="We couldn’t load universities right now. Please try again in a moment." />
          </div>
        )}

        {!loading && !error && universities.length === 0 && (
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
            No universities found with these filters. Try clearing filters or
            searching with a different name.
          </p>
        )}

        {/* LIST OF UNIVERSITIES */}
        {!loading && !error && universities.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            {universities.map((uni) => {
              const savedShortlist = isInShortlist(uni._id);
              const inCompare = isInCompareList(uni._id);

              return (
                <article
                  key={uni._id}
                  onClick={() => navigate(`/universities/${uni._id}`)}
                  style={{
                    borderRadius: "0.9rem",
                    padding: "1.25rem 1.5rem",
                    backgroundColor: "#020617",
                    color: "white",
                    boxShadow: "0 10px 26px rgba(15,23,42,0.7)",
                    cursor: "pointer",
                    border: "1px solid rgba(148, 163, 184, 0.45)",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      marginBottom: "0.35rem",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                    }}
                  >
                    {uni.name || "Unnamed University"}
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.9rem",
                      color: "#cbd5f5",
                    }}
                  >
                    Location:{" "}
                    <span style={{ color: "#e5e7eb" }}>
                      {uni.location || uni.city || "Not specified"}
                      {uni.province ? `, ${uni.province}` : ""}
                    </span>
                  </p>

                  {uni.ranking != null && (
                    <p
                      style={{
                        margin: "0.2rem 0 0",
                        fontSize: "0.88rem",
                        color: "#facc15",
                      }}
                    >
                      Ranking:{" "}
                      <span style={{ fontWeight: 600 }}>#{uni.ranking}</span>
                    </p>
                  )}

                  {/* Programs */}
                  <p
                    style={{
                      margin: "0.35rem 0 0.2rem",
                      fontSize: "0.88rem",
                    }}
                  >
                    Programs:{" "}
                    {Array.isArray(uni.programs) && uni.programs.length > 0 ? (
                      <span>{uni.programs.join(", ")}</span>
                    ) : (
                      <span>Not listed</span>
                    )}
                  </p>

                  {/* Actions */}
                  <div
                    style={{
                      marginTop: "0.7rem",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Shortlist button */}
                    <button
                      onClick={(e) => handleToggleShortlist(uni, e)}
                      style={{
                        padding: "0.4rem 0.9rem",
                        borderRadius: "999px",
                        border: "1px solid #facc15",
                        backgroundColor: savedShortlist
                          ? "#facc15"
                          : "transparent",
                        color: savedShortlist ? "#0f172a" : "#facc15",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <span>{savedShortlist ? "★" : "☆"}</span>
                      <span>
                        {savedShortlist
                          ? "Saved to shortlist"
                          : "Save to shortlist"}
                      </span>
                    </button>

                    {/* Compare button */}
                    <button
                      onClick={(e) => handleToggleCompare(uni, e)}
                      style={{
                        padding: "0.4rem 0.9rem",
                        borderRadius: "999px",
                        border: "1px solid #93c5fd",
                        backgroundColor: inCompare ? "#93c5fd" : "transparent",
                        color: inCompare ? "#0f172a" : "#bfdbfe",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      {inCompare ? "In comparison" : "Add to compare"}
                    </button>

                    {/* View details hint */}
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

            {/* PAGINATION */}
            {!loading && !error && universities.length > 0 && (
              <div
                style={{
                  marginTop: "1.6rem",
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "0.75rem" : 0,
                  justifyContent: isMobile
                    ? "flex-start"
                    : "space-between",
                  alignItems: isMobile ? "flex-start" : "center",
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
                      backgroundColor:
                        page === totalPages ? "#e5e7eb" : "white",
                      cursor:
                        page === totalPages ? "not-allowed" : "pointer",
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
