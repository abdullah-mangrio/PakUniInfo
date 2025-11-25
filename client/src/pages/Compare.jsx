import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getShortlist } from "../utils/shortlist";
import {
  getCompareList,
  addToCompare,
  removeFromCompare,
  clearCompare,
  isInCompareList,
} from "../utils/compare";

export default function Compare() {
  const navigate = useNavigate();

  const [compareUnis, setCompareUnis] = useState([]);
  const [shortlist, setShortlist] = useState([]);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    setCompareUnis(getCompareList());
    setShortlist(getShortlist());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRemoveFromCompare = (id) => {
    const updated = removeFromCompare(id);
    setCompareUnis(updated);
  };

  const handleClearCompare = () => {
    const confirmClear = window.confirm(
      "Clear all universities from comparison?"
    );
    if (!confirmClear) return;
    clearCompare();
    setCompareUnis([]);
  };

  const handleLoadFromShortlist = () => {
    if (!shortlist || shortlist.length === 0) return;
    const slice = shortlist.slice(0, 3);
    clearCompare();
    slice.forEach((uni) => addToCompare(uni));
    setCompareUnis(getCompareList());
  };

  const handleToggleCompareFromShortlist = (uni) => {
    if (isInCompareList(uni._id)) {
      const updated = removeFromCompare(uni._id);
      setCompareUnis(updated);
      return;
    }
    if (compareUnis.length >= 3) {
      alert("You can only compare up to 3 universities at once.");
      return;
    }
    addToCompare(uni);
    setCompareUnis(getCompareList());
  };

  const goToExplore = () => navigate("/universities");
  const goToShortlist = () => navigate("/shortlist");

  const attributeRow = (label, renderValue) => (
    <tr key={label}>
      <th
        style={{
          textAlign: "left",
          padding: "0.75rem 0.75rem",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "#0f172a",
          borderBottom: "1px solid #e5e7eb",
          width: "180px",
          backgroundColor: "#f9fafb",
          position: "sticky",
          left: 0,
          zIndex: 2,
        }}
      >
        {label}
      </th>
      {compareUnis.map((uni) => (
        <td
          key={uni._id}
          style={{
            padding: "0.75rem 0.75rem",
            fontSize: "0.85rem",
            color: "#1f2933",
            borderBottom: "1px solid #e5e7eb",
            verticalAlign: "top",
          }}
        >
          {renderValue(uni)}
        </td>
      ))}
    </tr>
  );

  return (
    <div
      style={{
        display: "grid",
        gap: "1.75rem",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={goToExplore}
            style={{
              padding: "0.45rem 1.05rem",
              borderRadius: "999px",
              border: "none",
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(37,99,235,0.95))",
              color: "white",
              fontSize: "0.8rem",
              fontWeight: 500,
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(15,23,42,0.45)",
            }}
          >
            ← Back to explore
          </button>

          <span
            style={{
              padding: "0.32rem 0.75rem",
              borderRadius: "999px",
              backgroundColor: "#eef2ff",
              border: "1px solid #c7d2fe",
              fontSize: "0.8rem",
              color: "#3730a3",
            }}
          >
            Compare up to 3 universities side by side
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            flexWrap: "wrap",
            gap: "0.9rem",
            justifyContent: "space-between",
            marginTop: "0.5rem",
          }}
        >
          <div style={{ display: "grid", gap: "0.25rem" }}>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#0f172a",
              }}
            >
              Compare universities
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: "0.95rem",
                color: "#64748b",
                maxWidth: "38rem",
              }}
            >
              Quickly see differences in ranking, location, programs and
              important details to help you shortlist the right universities.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <button
              onClick={goToShortlist}
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "999px",
                border: "1px solid #cbd5f5",
                backgroundColor: "white",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              Open shortlist
            </button>

            <button
              onClick={handleLoadFromShortlist}
              disabled={!shortlist || shortlist.length === 0}
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "999px",
                border: "none",
                background:
                  "linear-gradient(to right, #0f766e, #22c55e, #4ade80)",
                color: "white",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor:
                  !shortlist || shortlist.length === 0
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  !shortlist || shortlist.length === 0 ? 0.6 : 1,
                boxShadow: "0 10px 24px rgba(16, 185, 129, 0.45)",
              }}
            >
              Load first 3 from shortlist
            </button>

            {compareUnis.length > 0 && (
              <button
                onClick={handleClearCompare}
                style={{
                  padding: "0.45rem 0.9rem",
                  borderRadius: "999px",
                  border: "none",
                  backgroundColor: "#fee2e2",
                  color: "#b91c1c",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Clear comparison
              </button>
            )}
          </div>
        </div>
      </header>

      {/* EMPTY STATE */}
      {compareUnis.length === 0 && (
        <section
          style={{
            padding: "1.75rem 1.5rem",
            borderRadius: "1rem",
            border: "1px dashed #cbd5f5",
            backgroundColor: "#f8fafc",
            display: "grid",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            <div
              style={{
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "999px",
                background:
                  "radial-gradient(circle at 30% 20%, #4f46e5, #0f172a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "1.1rem",
              }}
            >
              🔍
            </div>
            <div>
              <h2
                style={{
                  margin: 0,
                  marginBottom: "0.15rem",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#0f172a",
                }}
              >
                No universities in comparison yet
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  color: "#64748b",
                }}
              >
                Go back to Explore and add up to 3 universities to compare, or
                quickly load from your shortlist.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              marginTop: "0.5rem",
            }}
          >
            <button
              onClick={goToExplore}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                border: "none",
                background:
                  "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(37,99,235,0.95))",
                color: "white",
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: "pointer",
                boxShadow: "0 5px 14px rgba(15,23,42,0.55)",
              }}
            >
              Browse universities
            </button>
            <button
              onClick={goToShortlist}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                border: "1px solid #cbd5f5",
                backgroundColor: "white",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              View shortlist
            </button>
          </div>
        </section>
      )}

      {/* COMPARISON TABLE */}
      {compareUnis.length > 0 && (
        <section
          style={{
            borderRadius: "1rem",
            border: "1px solid #e5e7eb",
            backgroundColor: "white",
            boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "0.9rem 1rem",
              borderBottom: "1px solid #e5e7eb",
              background:
                "linear-gradient(to right, #0f172a, #1e293b, #0f172a)",
              color: "white",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "0.75rem",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.8rem",
                  opacity: 0.85,
                  marginBottom: "0.15rem",
                }}
              >
                Comparison overview
              </div>
              <div
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                {compareUnis.length} selected{" "}
                {compareUnis.length === 1 ? "university" : "universities"}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.4rem",
                alignItems: "center",
                flexWrap: isMobile ? "nowrap" : "wrap",
                overflowX: isMobile ? "auto" : "visible",
                paddingBottom: isMobile ? "0.2rem" : 0,
              }}
            >
              {compareUnis.map((uni) => (
                <div
                  key={uni._id}
                  style={{
                    padding: "0.2rem 0.55rem",
                    borderRadius: "999px",
                    backgroundColor: "rgba(15,23,42,0.6)",
                    border: "1px solid rgba(148,163,184,0.6)",
                    fontSize: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "1.45rem",
                      height: "1.45rem",
                      borderRadius: "999px",
                      backgroundColor: "rgba(15,23,42,0.9)",
                      fontSize: "0.8rem",
                    }}
                  >
                    {uni.name?.charAt(0) || "U"}
                  </span>
                  <span
                    style={{
                      maxWidth: "8rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {uni.name}
                  </span>
                  <button
                    onClick={() => handleRemoveFromCompare(uni._id)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#f97373",
                      fontSize: "0.95rem",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "650px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.7rem 0.8rem",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#0f172a",
                      backgroundColor: "#f9fafb",
                      borderBottom: "1px solid #e5e7eb",
                      position: "sticky",
                      left: 0,
                      zIndex: 2,
                    }}
                  >
                    Attribute
                  </th>
                  {compareUnis.map((uni) => (
                    <th
                      key={uni._id}
                      style={{
                        textAlign: "left",
                        padding: "0.7rem 0.8rem",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "#0f172a",
                        backgroundColor: "#f9fafb",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              marginBottom: "0.1rem",
                            }}
                          >
                            {uni.name}
                          </div>
                          <div
                            style={{
                              fontSize: "0.78rem",
                              color: "#6b7280",
                            }}
                          >
                            {uni.city && uni.province
                              ? `${uni.city}, ${uni.province}`
                              : uni.location || "—"}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            navigate(`/universities/${uni._id}`)
                          }
                          style={{
                            padding: "0.3rem 0.7rem",
                            borderRadius: "999px",
                            border: "none",
                            fontSize: "0.75rem",
                            cursor: "pointer",
                            background:
                              "linear-gradient(to right, #0ea5e9, #6366f1)",
                            color: "white",
                            boxShadow:
                              "0 6px 16px rgba(59,130,246,0.55)",
                          }}
                        >
                          View
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attributeRow("Ranking", (uni) =>
                  typeof uni.ranking === "number"
                    ? `#${uni.ranking}`
                    : "Not available"
                )}
                {attributeRow("Location", (uni) =>
                  uni.city && uni.province
                    ? `${uni.city}, ${uni.province}`
                    : uni.location || "Not specified"
                )}
                {attributeRow("Programs", (uni) =>
                  Array.isArray(uni.programs) && uni.programs.length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.4rem",
                      }}
                    >
                      {uni.programs.map((prog) => (
                        <span
                          key={prog}
                          style={{
                            fontSize: "0.78rem",
                            padding: "0.2rem 0.55rem",
                            borderRadius: "999px",
                            backgroundColor: "#eff6ff",
                            border: "1px solid #bfdbfe",
                            color: "#1e40af",
                          }}
                        >
                          {prog}
                        </span>
                      ))}
                    </div>
                  ) : (
                    "Not listed"
                  )
                )}
                {attributeRow("Website", (uni) =>
                  uni.website ? (
                    <a
                      href={uni.website}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontSize: "0.82rem",
                        color: "#2563eb",
                        textDecoration: "underline",
                      }}
                    >
                      Visit official site ↗
                    </a>
                  ) : (
                    "Not provided"
                  )
                )}
                {attributeRow("Notes", () => "—")}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SHORTLIST HELPER SECTION */}
      <section
        style={{
          borderRadius: "1rem",
          border: "1px solid #e2e8f0",
          background:
            "radial-gradient(circle at top left, #eff6ff, #f8fafc 60%)",
          padding: "1.4rem 1.5rem",
          display: "grid",
          gap: "0.9rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "0.6rem",
            alignItems: isMobile ? "flex-start" : "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "2.1rem",
              height: "2.1rem",
              borderRadius: "999px",
              background:
                "radial-gradient(circle at 30% 20%, #4f46e5, #1d4ed8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.1rem",
            }}
          >
            ★
          </div>
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "1rem",
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              Use your shortlist to build comparisons
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "#64748b",
              }}
            >
              Toggle universities from your shortlist into the comparison. This
              way you can focus only on serious options.
            </p>
          </div>
        </div>

        {(!shortlist || shortlist.length === 0) && (
          <p
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "#64748b",
            }}
          >
            Your shortlist is empty. Go to the{" "}
            <button
              onClick={goToExplore}
              style={{
                border: "none",
                padding: 0,
                background: "none",
                color: "#2563eb",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              Explore
            </button>{" "}
            page and click &quot;Save to shortlist&quot; on any university you
            like.
          </p>
        )}

        {shortlist && shortlist.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "0.4rem",
            }}
          >
            {shortlist.map((uni) => {
              const inCompare = isInCompareList(uni._id);
              return (
                <div
                  key={uni._id}
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: "0.5rem",
                    padding: "0.55rem 0.75rem",
                    borderRadius: "0.75rem",
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.1rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: "#0f172a",
                      }}
                    >
                      {uni.name}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#6b7280",
                      }}
                    >
                      {uni.city && uni.province
                        ? `${uni.city}, ${uni.province}`
                        : uni.location || "Location not specified"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggleCompareFromShortlist(uni)}
                    style={{
                      padding: "0.35rem 0.9rem",
                      borderRadius: "999px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      background: inCompare
                        ? "#fee2e2"
                        : "linear-gradient(to right, #0f766e, #22c55e, #4ade80)",
                      color: inCompare ? "#b91c1c" : "white",
                      alignSelf: isMobile ? "stretch" : "auto",
                    }}
                  >
                    {inCompare ? "Remove from compare" : "Add to compare"}
                  </button>
                </div>
              );
            })}

            <button
              onClick={goToShortlist}
              style={{
                marginTop: "0.4rem",
                alignSelf: "flex-start",
                padding: "0.4rem 0.85rem",
                borderRadius: "999px",
                border: "1px dashed #cbd5f5",
                backgroundColor: "white",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              Go to shortlist page →
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
