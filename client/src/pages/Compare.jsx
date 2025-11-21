import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getShortlist,
} from "../utils/shortlist";
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

  useEffect(() => {
    setCompareUnis(getCompareList());
    setShortlist(getShortlist());
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
    const updated = clearCompare();
    setCompareUnis(updated);
  };

  const handleLoadFromShortlist = () => {
    if (!shortlist || shortlist.length === 0) return;
    const selected = shortlist.slice(0, 3);
    clearCompare();
    selected.forEach((u) => addToCompare(u));
    setCompareUnis(getCompareList());
  };

  const handleAddShortlistedToCompare = (uni) => {
    if (isInCompareList(uni._id)) {
      const updated = removeFromCompare(uni._id);
      setCompareUnis(updated);
      return;
    }

    const current = getCompareList();
    if (current.length >= 3) {
      alert("You can compare up to 3 universities.");
      return;
    }

    const updated = addToCompare(uni);
    setCompareUnis(updated);
  };

  const headers = [
    "Name",
    "Location",
    "Province",
    "Ranking",
    "Programs",
    "Website",
  ];

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
          Compare Universities
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
          Select up to three universities to view them side by side. You can
          add universities from the Explore page or load them from your
          shortlist.
        </p>
      </header>

      {/* Top actions */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => navigate("/universities")}
          style={{
            padding: "0.45rem 1rem",
            borderRadius: "999px",
            border: "1px solid #cbd5f5",
            backgroundColor: "white",
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          ← Back to Explore
        </button>

        {shortlist.length > 0 && (
          <button
            onClick={handleLoadFromShortlist}
            style={{
              padding: "0.45rem 1rem",
              borderRadius: "999px",
              border: "none",
              background:
                "linear-gradient(to right, #0f766e, #22c55e, #4ade80)",
              color: "white",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Load from shortlist
          </button>
        )}

        {compareUnis.length > 0 && (
          <button
            onClick={handleClearCompare}
            style={{
              padding: "0.45rem 1rem",
              borderRadius: "999px",
              border: "1px solid #fecaca",
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Clear comparison
          </button>
        )}
      </div>

      {/* Compare grid */}
      {compareUnis.length === 0 ? (
        <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
          No universities selected for comparison yet. Go to{" "}
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
          and use the <strong>Add to compare</strong> button, or load from your
          shortlist.
        </p>
      ) : (
        <section
          style={{
            borderRadius: "1rem",
            overflowX: "auto",
            border: "1px solid #cbd5f5",
            boxShadow: "0 16px 35px rgba(15,23,42,0.4)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `150px repeat(${compareUnis.length}, minmax(220px, 1fr))`,
              backgroundColor: "#0f172a",
              color: "white",
            }}
          >
            {/* Header left empty cell */}
            <div
              style={{
                padding: "0.8rem",
                borderRight: "1px solid rgba(148,163,184,0.4)",
                fontWeight: 600,
              }}
            >
              Field
            </div>

            {compareUnis.map((uni) => (
              <div
                key={uni._id}
                style={{
                  padding: "0.8rem",
                  borderLeft: "1px solid rgba(148,163,184,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                }}
              >
                <span style={{ fontWeight: 700 }}>{uni.name}</span>
                <button
                  onClick={() => handleRemoveFromCompare(uni._id)}
                  style={{
                    padding: "0.25rem 0.65rem",
                    borderRadius: "999px",
                    border: "1px solid #fecaca",
                    backgroundColor: "#fee2e2",
                    color: "#b91c1c",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            {headers.map((label) => (
              <React.Fragment key={label}>
                <div
                  style={{
                    padding: "0.7rem 0.8rem",
                    borderTop: "1px solid rgba(148,163,184,0.3)",
                    borderRight: "1px solid rgba(148,163,184,0.3)",
                    backgroundColor: "#020617",
                    color: "#e5e7eb",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  {label}
                </div>
                {compareUnis.map((uni) => {
                  let value;
                  switch (label) {
                    case "Name":
                      value = uni.name;
                      break;
                    case "Location":
                      value = uni.location || uni.city || "Not specified";
                      break;
                    case "Province":
                      value = uni.province || "Not specified";
                      break;
                    case "Ranking":
                      value =
                        uni.ranking != null ? `#${uni.ranking}` : "N/A";
                      break;
                    case "Programs":
                      value =
                        Array.isArray(uni.programs) && uni.programs.length > 0
                          ? uni.programs.join(", ")
                          : "Not listed";
                      break;
                    case "Website":
                      value = uni.website || "Not provided";
                      break;
                    default:
                      value = "";
                  }

                  return (
                    <div
                      key={uni._id + label}
                      style={{
                        padding: "0.7rem 0.8rem",
                        borderTop: "1px solid rgba(148,163,184,0.3)",
                        borderLeft: "1px solid rgba(148,163,184,0.3)",
                        backgroundColor: "#020617",
                        color: "#e5e7eb",
                        fontSize: "0.85rem",
                      }}
                    >
                      {label === "Website" && uni.website ? (
                        <a
                          href={uni.website}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: "#4ade80",
                            textDecoration: "underline",
                          }}
                        >
                          Visit site
                        </a>
                      ) : (
                        value
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </section>
      )}

      {/* Shortlist helper section */}
      {shortlist.length > 0 && (
        <section style={{ marginTop: "1.75rem" }}>
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              marginBottom: "0.6rem",
              color: "#0f172a",
            }}
          >
            Your shortlist (add or remove from comparison)
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.8rem",
            }}
          >
            {shortlist.map((uni) => {
              const inCompare = isInCompareList(uni._id);

              return (
                <div
                  key={uni._id}
                  style={{
                    borderRadius: "0.75rem",
                    padding: "0.75rem 0.9rem",
                    backgroundColor: "#020617",
                    color: "white",
                    boxShadow: "0 6px 16px rgba(15,23,42,0.6)",
                    minWidth: "220px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "0.4rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "0.95rem",
                        fontWeight: 600,
                      }}
                    >
                      {uni.name}
                    </h3>
                    <button
                      onClick={() => handleAddShortlistedToCompare(uni)}
                      style={{
                        padding: "0.25rem 0.7rem",
                        borderRadius: "999px",
                        border: "1px solid #bfdbfe",
                        backgroundColor: inCompare ? "#3b82f6" : "#0b1120",
                        color: "white",
                        fontSize: "0.76rem",
                        cursor: "pointer",
                      }}
                    >
                      {inCompare ? "In compare" : "Add to compare"}
                    </button>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.8rem",
                      color: "#cbd5f5",
                    }}
                  >
                    {uni.city || uni.location || "Location not set"}
                    {uni.province ? `, ${uni.province}` : ""}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
