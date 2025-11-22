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
  const [saved, setSaved] = useState(false);
  const [savedTick, setSavedTick] = useState(0); // force re-check of shortlist

  // Helper: format fee nicely
  const formatFee = (min, max, currency = "PKR") => {
    if (!min && !max) return "Not available";
    const nf = new Intl.NumberFormat("en-PK", {
      maximumFractionDigits: 0,
    });

    if (min && max) {
      return `${currency} ${nf.format(min)} – ${nf.format(
        max
      )} per year (approx.)`;
    }
    if (min && !max) {
      return `${currency} ${nf.format(min)}+ per year (approx.)`;
    }
    if (!min && max) {
      return `Up to ${currency} ${nf.format(max)} per year (approx.)`;
    }
    return "Not available";
  };

  // Helper: format date
  const formatDate = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `http://localhost:5000/api/universities/${id}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch university details.");
        }

        const data = await res.json();
        setUniversity(data);
      } catch (err) {
        console.error(err);
        setError(
          err?.message || "Something went wrong while loading this university."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [id]);

  // Sync saved state from localStorage
  useEffect(() => {
    if (university && university._id) {
      setSaved(isInShortlist(university._id));
    }
  }, [university, savedTick]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleShortlist = () => {
    if (!university || !university._id) return;

    if (saved) {
      removeFromShortlist(university._id);
    } else {
      addToShortlist(university);
    }

    setSavedTick((v) => v + 1);
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "260px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.95rem",
          color: "#64748b",
        }}
      >
        Loading university details...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        <button
          onClick={handleBack}
          style={{
            alignSelf: "flex-start",
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            border: "none",
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(37,99,235,0.95))",
            color: "white",
            fontSize: "0.85rem",
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(15,23,42,0.4)",
          }}
        >
          ← Back
        </button>
        <div
          style={{
            padding: "1.5rem 1.75rem",
            borderRadius: "1.25rem",
            backgroundColor: "#fee2e2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            fontSize: "0.95rem",
          }}
        >
          {error}
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        <button
          onClick={handleBack}
          style={{
            alignSelf: "flex-start",
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            border: "none",
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(37,99,235,0.95))",
            color: "white",
            fontSize: "0.85rem",
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(15,23,42,0.4)",
          }}
        >
          ← Back
        </button>
        <p style={{ fontSize: "0.95rem", color: "#64748b" }}>
          University not found.
        </p>
      </div>
    );
  }

  const {
    name,
    location,
    city,
    province,
    ranking,
    programs,
    website,
    description,
    tuitionFeeMin,
    tuitionFeeMax,
    tuitionFeeCurrency,
    tuitionFeeNote,
    admissionCycles = [],
    admissionNotes,
    logoUrl,
    heroImageUrl,
    galleryImages = [],
  } = university;

  // sort admission cycles by deadline (ascending)
  const sortedCycles = [...admissionCycles].sort((a, b) => {
    const da = a.applicationDeadline ? new Date(a.applicationDeadline) : null;
    const db = b.applicationDeadline ? new Date(b.applicationDeadline) : null;
    if (!da && !db) return 0;
    if (!da) return 1;
    if (!db) return -1;
    return da - db;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* TOP BAR: BACK + SHORTLIST */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleBack}
          style={{
            padding: "0.5rem 1.1rem",
            borderRadius: "999px",
            border: "none",
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(37,99,235,0.95))",
            color: "white",
            fontSize: "0.85rem",
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(15,23,42,0.4)",
          }}
        >
          ← Back to results
        </button>

        <button
          onClick={handleToggleShortlist}
          style={{
            padding: "0.55rem 1.3rem",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            background: saved
              ? "linear-gradient(135deg, #22c55e, #16a34a)"
              : "white",
            color: saved ? "white" : "#0f172a",
            fontSize: "0.85rem",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            boxShadow: saved
              ? "0 8px 18px rgba(34,197,94,0.55)"
              : "0 5px 12px rgba(0,0,0,0.08)",
          }}
        >
          <span style={{ fontSize: "1rem" }}>{saved ? "★" : "☆"}</span>
          {saved ? "Saved to Shortlist" : "Save to Shortlist"}
        </button>
      </div>

      {/* HERO / HEADER */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "1.5rem",
          backgroundColor: "#0f172a",
          color: "white",
          minHeight: "210px",
          display: "flex",
          alignItems: "stretch",
          boxShadow: "0 16px 32px rgba(15,23,42,0.65)",
        }}
      >
        {heroImageUrl ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${heroImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.6)",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at top left, #1d4ed8, #020617 55%)",
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, rgba(15,23,42,0.85), rgba(15,23,42,0.15))",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flex: 1,
            padding: "1.75rem 1.75rem 1.75rem",
            gap: "1.75rem",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <div
            style={{
              flexShrink: 0,
              width: "88px",
              height: "88px",
              borderRadius: "1.5rem",
              backgroundColor: "rgba(15,23,42,0.85)",
              border: "1px solid rgba(148,163,184,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${name} logo`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <span
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#e5e7eb",
                }}
              >
                {name?.charAt(0) || "U"}
              </span>
            )}
          </div>

          {/* Main info */}
          <div style={{ display: "grid", gap: "0.4rem", flex: 1 }}>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              {name}
            </h1>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem",
                fontSize: "0.85rem",
                color: "#e5e7eb",
              }}
            >
              {(city || location) && (
                <span
                  style={{
                    padding: "0.2rem 0.7rem",
                    borderRadius: "999px",
                    backgroundColor: "rgba(15,23,42,0.65)",
                    border: "1px solid rgba(148,163,184,0.6)",
                  }}
                >
                  📍 {city ? `${city}${province ? `, ${province}` : ""}` : location}
                </span>
              )}
              {ranking && (
                <span
                  style={{
                    padding: "0.2rem 0.7rem",
                    borderRadius: "999px",
                    backgroundColor: "rgba(22,163,74,0.2)",
                    border: "1px solid rgba(34,197,94,0.7)",
                  }}
                >
                  🏆 Ranking: #{ranking}
                </span>
              )}
              {programs && programs.length > 0 && (
                <span
                  style={{
                    padding: "0.2rem 0.7rem",
                    borderRadius: "999px",
                    backgroundColor: "rgba(15,23,42,0.65)",
                    border: "1px solid rgba(148,163,184,0.6)",
                  }}
                >
                  🎓 {programs.slice(0, 2).join(" · ")}
                  {programs.length > 2 ? ` +${programs.length - 2} more` : ""}
                </span>
              )}
            </div>
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noreferrer"
                style={{
                  marginTop: "0.3rem",
                  fontSize: "0.85rem",
                  color: "#a5b4fc",
                  textDecoration: "underline",
                  width: "fit-content",
                }}
              >
                Visit official website ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* MAIN DETAILS LAYOUT */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1.25fr)",
          gap: "1.75rem",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT: DESCRIPTION, PROGRAMS, ADMISSIONS */}
        <div style={{ display: "grid", gap: "1.25rem" }}>
          {/* Overview */}
          <div
            style={{
              padding: "1.4rem 1.5rem",
              borderRadius: "1.25rem",
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              boxShadow: "0 8px 18px rgba(15,23,42,0.06)",
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                marginBottom: "0.75rem",
                color: "#0f172a",
              }}
            >
              Overview
            </h2>
            <p
              style={{
                fontSize: "0.93rem",
                color: "#475569",
                lineHeight: 1.6,
              }}
            >
              {description || "No detailed description has been added yet."}
            </p>
          </div>

          {/* Programs */}
          <div
            style={{
              padding: "1.4rem 1.5rem",
              borderRadius: "1.25rem",
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              boxShadow: "0 8px 18px rgba(15,23,42,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                marginBottom: "0.75rem",
                color: "#0f172a",
              }}
            >
              Offered Programs
            </h2>
            {programs && programs.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                {programs.map((prog) => (
                  <span
                    key={prog}
                    style={{
                      fontSize: "0.85rem",
                      padding: "0.3rem 0.7rem",
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
              <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                Programs are not listed yet.
              </p>
            )}
          </div>

          {/* Admission info */}
          <div
            style={{
              padding: "1.4rem 1.5rem 1.2rem",
              borderRadius: "1.25rem",
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              boxShadow: "0 8px 18px rgba(15,23,42,0.05)",
              display: "grid",
              gap: "0.9rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "0.75rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#0f172a",
                }}
              >
                Admission Timeline
              </h2>
              {admissionNotes && (
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#0f766e",
                    padding: "0.15rem 0.6rem",
                    borderRadius: "999px",
                    backgroundColor: "#ecfeff",
                    border: "1px solid #a5f3fc",
                  }}
                >
                  {admissionNotes}
                </span>
              )}
            </div>

            {sortedCycles.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gap: "0.7rem",
                  marginTop: "0.1rem",
                }}
              >
                {sortedCycles.map((cycle, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "0.7rem 0.9rem",
                      borderRadius: "0.9rem",
                      backgroundColor: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      display: "grid",
                      gap: "0.2rem",
                      fontSize: "0.86rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 600,
                          color: "#0f172a",
                        }}
                      >
                        {cycle.name || "Admission Cycle"}
                      </span>
                      <span
                        style={{
                          fontSize: "0.78rem",
                          color: "#6b7280",
                        }}
                      >
                        {cycle.applicationOpenDate
                          ? `Opens: ${formatDate(cycle.applicationOpenDate)}`
                          : "Opening date: —"}
                      </span>
                    </div>
                    <div style={{ color: "#374151" }}>
                      Deadline:{" "}
                      <span style={{ fontWeight: 500 }}>
                        {formatDate(cycle.applicationDeadline)}
                      </span>
                    </div>
                    {cycle.notes && (
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "#6b7280",
                          marginTop: "0.1rem",
                        }}
                      >
                        {cycle.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                No specific admission cycles have been added yet. Check the
                official website for the latest admission schedule.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT: QUICK FACTS / FEES / GALLERY */}
        <aside
          style={{
            display: "grid",
            gap: "1.25rem",
          }}
        >
          {/* Fee card */}
          <div
            style={{
              padding: "1.3rem 1.4rem",
              borderRadius: "1.25rem",
              background:
                "radial-gradient(circle at top left, #eff6ff, #f8fafc)",
              border: "1px solid #bfdbfe",
              boxShadow: "0 10px 20px rgba(15,23,42,0.08)",
              display: "grid",
              gap: "0.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#1e3a8a",
                marginBottom: "0.1rem",
              }}
            >
              Estimated Tuition Fee
            </h2>
            <div
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              {formatFee(tuitionFeeMin, tuitionFeeMax, tuitionFeeCurrency)}
            </div>
            {tuitionFeeNote && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#64748b",
                  lineHeight: 1.5,
                  marginTop: "0.25rem",
                }}
              >
                {tuitionFeeNote}
              </p>
            )}
            <p
              style={{
                fontSize: "0.78rem",
                color: "#94a3b8",
                marginTop: "0.35rem",
              }}
            >
              * These are approximate yearly tuition figures. Exact fee depends
              on program, semester load, and official notifications.
            </p>
          </div>

          {/* Quick facts */}
          <div
            style={{
              padding: "1.2rem 1.3rem",
              borderRadius: "1.25rem",
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              boxShadow: "0 8px 18px rgba(15,23,42,0.05)",
              display: "grid",
              gap: "0.55rem",
              fontSize: "0.9rem",
              color: "#475569",
            }}
          >
            <h2
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#0f172a",
                marginBottom: "0.25rem",
              }}
            >
              Quick Facts
            </h2>
            {location && (
              <div>
                <span style={{ fontWeight: 500 }}>Location: </span>
                <span>{location}</span>
              </div>
            )}
            {province && (
              <div>
                <span style={{ fontWeight: 500 }}>Province: </span>
                <span>{province}</span>
              </div>
            )}
            {ranking && (
              <div>
                <span style={{ fontWeight: 500 }}>Ranking: </span>
                <span>#{ranking}</span>
              </div>
            )}
            {website && (
              <div style={{ marginTop: "0.3rem" }}>
                <span style={{ fontWeight: 500 }}>Website: </span>
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#2563eb",
                    textDecoration: "underline",
                    wordBreak: "break-all",
                  }}
                >
                  {website}
                </a>
              </div>
            )}
          </div>

          {/* Gallery */}
          {galleryImages && galleryImages.length > 0 && (
            <div
              style={{
                padding: "1.1rem 1.2rem",
                borderRadius: "1.25rem",
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 18px rgba(15,23,42,0.05)",
              }}
            >
              <h2
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "#0f172a",
                  marginBottom: "0.7rem",
                }}
              >
                Campus Glimpse
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "0.5rem",
                }}
              >
                {galleryImages.slice(0, 4).map((img, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "0.9rem",
                      backgroundColor: "#e5e7eb",
                      height: "90px",
                    }}
                  >
                    <img
                      src={img}
                      alt={`${name} campus ${idx + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
              {galleryImages.length > 4 && (
                <p
                  style={{
                    marginTop: "0.5rem",
                    fontSize: "0.8rem",
                    color: "#94a3b8",
                  }}
                >
                  +{galleryImages.length - 4} more image
                  {galleryImages.length - 4 > 1 ? "s" : ""} available in admin.
                </p>
              )}
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}
