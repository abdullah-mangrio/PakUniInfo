import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getShortlist,
  removeFromShortlist,
  clearShortlist,
} from "../utils/shortlist";
import {
  addToCompare,
  removeFromCompare,
  isInCompareList,
  getCompareList,
} from "../utils/compare";

export default function Shortlist() {
  const navigate = useNavigate();
  const [shortlist, setShortlist] = useState([]);
  const [tick, setTick] = useState(0); // to trigger re-render on changes

  useEffect(() => {
    setShortlist(getShortlist());
  }, [tick]);

  const refreshShortlist = () => {
    setShortlist(getShortlist());
    setTick((t) => t + 1);
  };

  const handleRemove = (id, e) => {
    e.stopPropagation();
    removeFromShortlist(id);
    refreshShortlist();
  };

  const handleClearAll = () => {
    if (shortlist.length === 0) return;
    if (!window.confirm("Remove all universities from your shortlist?")) return;
    clearShortlist();
    refreshShortlist();
  };

  const handleToggleCompare = (uni, e) => {
    e.stopPropagation();

    if (isInCompareList(uni._id)) {
      removeFromCompare(uni._id);
      setTick((t) => t + 1);
      return;
    }

    const current = getCompareList();
    if (current.length >= 3) {
      alert("You can compare up to 3 universities at a time.");
      return;
    }

    addToCompare(uni);
    setTick((t) => t + 1);
  };

  const outerCardStyle = {
    borderRadius: "1.25rem",
    background:
      "radial-gradient(circle at top left, #ffffff 0%, #f1f5f9 60%, #e2e8f0 100%)",
    padding: "2.4rem 2.6rem",
    boxShadow: "0 26px 70px rgba(15,23,42,0.7)",
    marginTop: "1.5rem",
  };

  return (
    <div>
      <div style={outerCardStyle}>
        {/* HEADER */}
        <header
          style={{
            marginBottom: "1.4rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}
        >
          <p
            style={{
              fontSize: "0.78rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#0f766e",
              fontWeight: 600,
            }}
          >
            Your saved choices
          </p>
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: 800,
              color: "#020617",
            }}
          >
            Shortlisted universities
          </h1>
          <p
            style={{ color: "#64748b", fontSize: "0.95rem", maxWidth: "40rem" }}
          >
            Use this list to discuss options with parents, teachers or friends.
            You can open details, compare up to 3 universities, or clear your
            shortlist and start again.
          </p>

          {/* top actions */}
          <div
            style={{
              marginTop: "0.6rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
            }}
          >
            <button
              onClick={() => navigate("/universities")}
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "999px",
                border: "1px solid #cbd5f5",
                backgroundColor: "white",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              ← Back to Explore
            </button>

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
              }}
            >
              Open compare
            </button>

            <button
              onClick={handleClearAll}
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "999px",
                border: "1px solid #fecaca",
                backgroundColor: "#fee2e2",
                color: "#b91c1c",
                fontSize: "0.85rem",
                cursor: shortlist.length ? "pointer" : "not-allowed",
                opacity: shortlist.length ? 1 : 0.6,
              }}
              disabled={shortlist.length === 0}
            >
              Clear shortlist
            </button>
          </div>
        </header>

        {/* EMPTY STATE */}
        {shortlist.length === 0 && (
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
              ⭐
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
                Your shortlist is empty
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
                Save universities you&apos;re interested in, and they&apos;ll
                appear here so you can revisit or compare them later.
              </p>
              <button
                type="button"
                onClick={() => navigate("/universities")}
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
                Start exploring
              </button>
            </div>
          </div>
        )}

        {/* SHORTLISTED CARDS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {shortlist.map((uni) => {
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "1rem",
                    marginBottom: "0.4rem",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        marginBottom: "0.2rem",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                      }}
                    >
                      {uni.name || "Unnamed University"}
                    </h2>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.88rem",
                        color: "#cbd5f5",
                      }}
                    >
                      📍 {uni.location || uni.city || "Location not specified"}
                      {uni.province ? `, ${uni.province}` : ""}
                    </p>
                    <p
                      style={{
                        margin: "0.2rem 0 0",
                        fontSize: "0.88rem",
                        color: "#facc15",
                      }}
                    >
                      Ranking:{" "}
                      <span style={{ fontWeight: 600 }}>
                        {uni.ranking != null ? `#${uni.ranking}` : "N/A"}
                      </span>
                    </p>
                  </div>

                  {/* remove button */}
                  <button
                    onClick={(e) => handleRemove(uni._id, e)}
                    style={{
                      borderRadius: "999px",
                      border: "1px solid #fecaca",
                      backgroundColor: "#fee2e2",
                      color: "#b91c1c",
                      fontSize: "0.78rem",
                      padding: "0.25rem 0.7rem",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>

                {/* programs */}
                <p
                  style={{
                    margin: "0.25rem 0 0.4rem",
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

                {/* website */}
                {uni.website && (
                  <a
                    href={uni.website}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: "inline-block",
                      marginTop: "0.25rem",
                      fontSize: "0.85rem",
                      color: "#38bdf8",
                      textDecoration: "underline",
                    }}
                  >
                    Visit website
                  </a>
                )}

                {/* actions */}
                <div
                  style={{
                    marginTop: "0.7rem",
                    display: "flex",
                    gap: "0.7rem",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={(e) => handleToggleCompare(uni, e)}
                    style={{
                      padding: "0.35rem 0.9rem",
                      borderRadius: "999px",
                      border: "1px solid #bfdbfe",
                      backgroundColor: inCompare ? "#3b82f6" : "#020617",
                      color: "white",
                      fontSize: "0.82rem",
                      cursor: "pointer",
                      fontWeight: 500,
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
      </div>
    </div>
  );
}
