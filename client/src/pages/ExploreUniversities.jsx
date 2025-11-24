import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

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

  // filters
  const [searchName, setSearchName] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [program, setProgram] = useState("");

  // sort
  const [sort, setSort] = useState("ranking-desc");

  // pagination
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // shortlist/compare triggers (for localStorage)
  const [shortlistTick, setShortlistTick] = useState(0);
  const [compareTick, setCompareTick] = useState(0);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      // Filters
      if (searchName.trim()) params.set("search", searchName.trim());
      if (city) params.set("city", city);
      if (province) params.set("province", province);
      if (program) params.set("program", program);

      // Sorting
      if (sort === "ranking-desc") {
        params.set("sortBy", "ranking");
        params.set("sortOrder", "desc");
      } else if (sort === "ranking-asc") {
        params.set("sortBy", "ranking");
        params.set("sortOrder", "asc");
      } else if (sort === "name-asc") {
        params.set("sortBy", "name");
        params.set("sortOrder", "asc");
      } else if (sort === "name-desc") {
        params.set("sortBy", "name");
        params.set("sortOrder", "desc");
      }

      // Pagination
      params.set("page", String(page));
      params.set("limit", String(PAGE_SIZE));

      const res = await fetch(
        `http://localhost:5000/api/universities?${params.toString()}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch universities.");
      }

      const data = await res.json();
      setUniversities(data.results || []);
      setTotalResults(data.total || 0);
    } catch (err) {
      console.error(err);
      setError(
        "We couldn’t load universities right now. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName, city, province, program, sort, page]);

  const totalPages = Math.ceil(totalResults / PAGE_SIZE) || 1;

  const handlePrevPage = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    setPage((p) => Math.min(totalPages, p + 1));
  };

  const handleFilterChangeWrapper = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchName("");
    setCity("");
    setProvince("");
    setProgram("");
    setSort("ranking-desc");
    setPage(1);
  };

  const handleToggleShortlist = (uni) => {
    if (isInShortlist(uni._id)) {
      removeFromShortlist(uni._id);
    } else {
      addToShortlist(uni);
    }
    setShortlistTick((x) => x + 1);
  };

  const handleToggleCompare = (uni) => {
    if (isInCompareList(uni._id)) {
      removeFromCompare(uni._id);
    } else {
      const currentCompare = getCompareList();
      if (currentCompare.length >= 3) {
        alert("You can only compare up to 3 universities at once.");
        return;
      }
      addToCompare(uni);
    }
    setCompareTick((x) => x + 1);
  };

  const compareCount = getCompareList().length;

  // Styles reused by filter pills
  const pillContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    minWidth: "180px",
  };

  const pillLabelStyle = {
    fontSize: "0.78rem",
    color: "#64748b",
    fontWeight: 500,
  };

  const pillSelectStyle = {
    padding: "0.45rem 0.7rem",
    borderRadius: "999px",
    border: "1px solid #cbd5f5",
    fontSize: "0.85rem",
    backgroundColor: "white",
    cursor: "pointer",
  };

  const pillInputStyle = {
    padding: "0.45rem 0.7rem",
    borderRadius: "999px",
    border: "1px solid #cbd5f5",
    fontSize: "0.85rem",
    backgroundColor: "white",
  };

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {/* HEADER SECTION */}
      <section style={{ display: "grid", gap: "0.6rem" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "grid", gap: "0.3rem" }}>
            <h1
              style={{
                fontSize: "1.6rem",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#0f172a",
              }}
            >
              Explore universities in Pakistan
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: "0.95rem",
                color: "#64748b",
                maxWidth: "40rem",
              }}
            >
              Filter by city, province and programs.{" "}
              <span style={{ fontWeight: 500 }}>
                Click on a card to see full details, admission info and fee
                breakdown.
              </span>
            </p>
          </div>

          {/* Compare count pill */}
          <button
            onClick={() => navigate("/compare")}
            style={{
              alignSelf: "flex-start",
              padding: "0.4rem 0.9rem",
              borderRadius: "999px",
              border: "none",
              background:
                compareCount > 0
                  ? "linear-gradient(to right, #0f172a, #1e293b)"
                  : "#e5e7eb",
              color: compareCount > 0 ? "white" : "#4b5563",
              fontSize: "0.8rem",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              gap: "0.4rem",
              alignItems: "center",
              boxShadow:
                compareCount > 0
                  ? "0 10px 24px rgba(15,23,42,0.55)"
                  : "none",
            }}
          >
            <span>Compare list</span>
            <span
              style={{
                minWidth: "1.4rem",
                height: "1.4rem",
                borderRadius: "999px",
                backgroundColor: compareCount > 0 ? "#22c55e" : "#d1d5db",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "white",
              }}
            >
              {compareCount}
            </span>
          </button>
        </header>

        {/* FILTERS SECTION */}
        <section
          style={{
            padding: "0.9rem 1rem",
            borderRadius: "0.9rem",
            border: "1px solid #e2e8f0",
            backgroundColor: "#f8fafc",
            display: "grid",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "0.75rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
              <strong>Tip:</strong> Start with a broad search, then narrow down
              by city and programs.
            </div>

            {totalResults > 0 && (
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#4b5563",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "999px",
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                }}
              >
                Showing {universities.length} of {totalResults} results
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            {/* Name search */}
            <div style={{ ...pillContainerStyle, flex: 1, minWidth: "220px" }}>
              <span style={pillLabelStyle}>Search by name</span>
              <input
                type="text"
                value={searchName}
                placeholder="e.g. LUMS, NUST, UET"
                onChange={(e) =>
                  handleFilterChangeWrapper(setSearchName)(e.target.value)
                }
                style={pillInputStyle}
              />
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
                <option value="">All cities</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

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
                <option value="">Any program</option>
                {PROGRAMS.map((prog) => (
                  <option key={prog} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div style={pillContainerStyle}>
              <span style={pillLabelStyle}>Sort</span>
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
                marginLeft: "auto",
              }}
            >
              Open compare
            </button>
          </div>
        </section>
      </section>

      {/* STATUS: LOADING / ERROR / EMPTY */}
      {loading && <LoadingSpinner />}

      {!loading && error && (
        <ErrorMessage message={error} onRetry={fetchUniversities} />
      )}

      {!loading && !error && universities.length === 0 && (
        <div
          style={{
            marginTop: "1.2rem",
            padding: "1.6rem 1.8rem",
            borderRadius: "1rem",
            backgroundColor: "#e5e7eb",
            border: "1px solid #cbd5f5",
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              lineHeight: 1,
            }}
          >
            🔍
          </div>
          <div>
            <h3
              style={{
                margin: 0,
                marginBottom: "0.4rem",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              No universities match these filters
            </h3>
            <p
              style={{
                margin: 0,
                marginBottom: "0.8rem",
                fontSize: "0.92rem",
                color: "#475569",
                lineHeight: 1.5,
              }}
            >
              We couldn&apos;t find any universities with the current search and
              filters. Try clearing some filters, removing the search text, or
              choosing a different city / province.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              style={{
                padding: "0.45rem 1.1rem",
                borderRadius: "999px",
                border: "none",
                background:
                  "linear-gradient(to right, #16a34a, #22c55e, #4ade80)",
                color: "white",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
                boxShadow: "0 10px 24px rgba(22,163,74,0.55)",
              }}
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}

      {/* LIST OF UNIVERSITIES */}
      {!loading && !error && universities.length > 0 && (
        <>
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
                      marginBottom: "0.2rem",
                      fontSize: "1.15rem",
                      fontWeight: 600,
                    }}
                  >
                    {uni.name}
                  </h2>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      alignItems: "center",
                      marginBottom: "0.4rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    {(uni.city || uni.location) && (
                      <span
                        style={{
                          padding: "0.25rem 0.65rem",
                          borderRadius: "999px",
                          backgroundColor: "rgba(15,23,42,0.8)",
                          border: "1px solid rgba(148,163,184,0.75)",
                        }}
                      >
                        📍{" "}
                        {uni.city
                          ? `${uni.city}${
                              uni.province ? `, ${uni.province}` : ""
                            }`
                          : uni.location}
                      </span>
                    )}

                    {typeof uni.ranking === "number" && (
                      <span
                        style={{
                          padding: "0.25rem 0.65rem",
                          borderRadius: "999px",
                          backgroundColor: "rgba(22,163,74,0.15)",
                          border: "1px solid rgba(34,197,94,0.75)",
                        }}
                      >
                        🏆 Ranking: #{uni.ranking}
                      </span>
                    )}

                    {Array.isArray(uni.programs) && uni.programs.length > 0 && (
                      <span
                        style={{
                          padding: "0.25rem 0.65rem",
                          borderRadius: "999px",
                          backgroundColor: "rgba(15,23,42,0.8)",
                          border: "1px solid rgba(148,163,184,0.75)",
                        }}
                      >
                        🎓{" "}
                        {uni.programs.slice(0, 2).join(" · ")}
                        {uni.programs.length > 2
                          ? ` +${uni.programs.length - 2} more`
                          : ""}
                      </span>
                    )}
                  </div>

                  {uni.description && (
                    <p
                      style={{
                        margin: "0.3rem 0 0.7rem",
                        fontSize: "0.9rem",
                        color: "#e5e7eb",
                        opacity: 0.9,
                        maxWidth: "50rem",
                      }}
                    >
                      {uni.description.length > 200
                        ? `${uni.description.slice(0, 200)}…`
                        : uni.description}
                    </p>
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginTop: "0.3rem",
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/universities/${uni._id}`);
                      }}
                      style={{
                        padding: "0.45rem 1rem",
                        borderRadius: "999px",
                        border: "none",
                        background:
                          "linear-gradient(to right, #3b82f6, #6366f1)",
                        color: "white",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        boxShadow: "0 8px 18px rgba(59,130,246,0.65)",
                      }}
                    >
                      View details →
                    </button>

                    <div
                      style={{
                        display: "flex",
                        gap: "0.45rem",
                        alignItems: "center",
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleShortlist(uni);
                        }}
                        style={{
                          padding: "0.35rem 0.9rem",
                          borderRadius: "999px",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          background: savedShortlist
                            ? "linear-gradient(to right, #22c55e, #16a34a)"
                            : "white",
                          color: savedShortlist ? "white" : "#0f172a",
                          boxShadow: savedShortlist
                            ? "0 8px 18px rgba(34,197,94,0.75)"
                            : "none",
                        }}
                      >
                        {savedShortlist ? "Saved" : "Save to shortlist"}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleCompare(uni);
                        }}
                        style={{
                          padding: "0.35rem 0.9rem",
                          borderRadius: "999px",
                          border: "1px solid rgba(148,163,184,0.8)",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          backgroundColor: inCompare
                            ? "rgba(15,23,42,0.8)"
                            : "transparent",
                          color: "white",
                        }}
                      >
                        {inCompare ? "In compare" : "Add to compare"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* PAGINATION */}
          {totalResults > PAGE_SIZE && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "#64748b",
                }}
              >
                Page {page} of {totalPages}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  style={{
                    padding: "0.4rem 0.9rem",
                    borderRadius: "999px",
                    border: "1px solid #cbd5f5",
                    backgroundColor: page === 1 ? "#e5e7eb" : "white",
                    fontSize: "0.85rem",
                    cursor: page === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  style={{
                    padding: "0.4rem 0.9rem",
                    borderRadius: "999px",
                    border: "1px solid #cbd5f5",
                    backgroundColor:
                      page === totalPages ? "#e5e7eb" : "white",
                    fontSize: "0.85rem",
                    cursor: page === totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
