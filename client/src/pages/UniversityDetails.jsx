import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
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

  // simple mobile breakpoint
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // fetch university
  const fetchUniversity = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`http://localhost:5000/api/universities/${id}`);
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const data = await res.json();
      setUniversity(data);
      setSaved(isInShortlist(data._id));
    } catch (err) {
      console.error("Error loading university:", err);
      setError(
        err.message ||
          "We couldn’t load this university right now. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBack = () => {
    // try going back; if nothing, go to explore
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/universities");
    }
  };

  const handleToggleShortlist = () => {
    if (!university) return;
    if (saved) {
      removeFromShortlist(university._id);
      setSaved(false);
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
      setSaved(true);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingSpinner label="Loading university details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <ErrorMessage message={error} />
        <button
          onClick={fetchUniversity}
          style={{
            padding: "0.55rem 1.4rem",
            borderRadius: "999px",
            border: "none",
            background:
              "linear-gradient(to right, #0f766e, #22c55e, #4ade80)",
            color: "white",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
        <button
          onClick={() => navigate("/universities")}
          style={{
            padding: "0.4rem 1rem",
            borderRadius: "999px",
            border: "1px solid #cbd5f5",
            backgroundColor: "white",
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          Back to Explore
        </button>
      </div>
    );
  }

  if (!university) return null;

  const {
    name,
    city,
    province,
    location,
    ranking,
    description,
    programs,
    tuitionFeeMin,
    tuitionFeeMax,
    tuitionFeeCurrency,
    tuitionFeeNote,
    admissionNotes,
    admissionCycles,
    website,
    logoUrl,
    heroImageUrl,
    galleryImages,
  } = university;

  const fullLocation =
    city && province
      ? `${city}, ${province}`
      : location || city || "Location not specified";

  const hasFees =
    typeof tuitionFeeMin === "number" || typeof tuitionFeeMax === "number";

  const formattedFeeRange = () => {
    const cur = tuitionFeeCurrency || "PKR";
    if (!tuitionFeeMin && !tuitionFeeMax) return "Not available";
    if (tuitionFeeMin && tuitionFeeMax) {
      return `${cur} ${tuitionFeeMin.toLocaleString("en-PK")} – ${tuitionFeeMax.toLocaleString(
        "en-PK"
      )} per year`;
    }
    if (tuitionFeeMin) {
      return `From ${cur} ${tuitionFeeMin.toLocaleString("en-PK")} per year`;
    }
    if (tuitionFeeMax) {
      return `Up to ${cur} ${tuitionFeeMax.toLocaleString("en-PK")} per year`;
    }
    return "Not available";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      style={{
        display: "grid",
        gap: "1.75rem",
        boxSizing: "border-box",
      }}
    >
      {/* BACK BUTTON */}
      <button
        onClick={handleBack}
        style={{
          marginBottom: "-0.5rem",
          alignSelf: "flex-start",
          padding: "0.4rem 0.9rem",
          borderRadius: "999px",
          border: "1px solid #cbd5f5",
          backgroundColor: "white",
          fontSize: "0.85rem",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      {/* HERO SECTION */}
      <section
        style={{
          borderRadius: "1.1rem",
          overflow: "hidden",
          backgroundColor: "#020617",
          color: "white",
          boxShadow: "0 18px 45px rgba(15,23,42,0.85)",
        }}
      >
        <div
          style={{
            position: "relative",
            minHeight: isMobile ? "180px" : "220px",
            overflow: "hidden",
          }}
        >
          {/* Background hero */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: heroImageUrl
                ? `url(${heroImageUrl})`
                : "radial-gradient(circle at 0% 0%, #22c55e 0, #0f172a 40%, #020617 85%)",
              backgroundSize: heroImageUrl ? "cover" : "auto",
              backgroundPosition: "center",
              filter: heroImageUrl ? "brightness(0.7)" : "none",
              transform: "scale(1.03)",
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(15,23,42,0.95), rgba(15,23,42,0.7), transparent)",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: isMobile ? "1.2rem 1.2rem 1.5rem" : "1.7rem 1.8rem",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              gap: "1.4rem",
              boxSizing: "border-box",
            }}
          >
            {/* Logo / initials */}
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "1rem",
                background:
                  "conic-gradient(from 210deg at 50% 50%, #22c55e, #22c55e, #0ea5e9, #6366f1, #22c55e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 12px 35px rgba(34,197,94,0.65)",
                flexShrink: 0,
              }}
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={`${name} logo`}
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "0.8rem",
                    objectFit: "cover",
                    backgroundColor: "#020617",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "0.8rem",
                    backgroundColor: "#020617",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#bbf7d0",
                  }}
                >
                  {name?.[0] || "U"}
                </div>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gap: "0.3rem",
                flex: 1,
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize: isMobile ? "1.25rem" : "1.7rem",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                }}
              >
                {name}
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  color: "#e5e7eb",
                }}
              >
                📍 {fullLocation}
              </p>
              {ranking != null && (
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.9rem",
                    color: "#facc15",
                  }}
                >
                  National ranking:{" "}
                  <span style={{ fontWeight: 700 }}>#{ranking}</span>
                </p>
              )}
              {Array.isArray(programs) && programs.length > 0 && (
                <p
                  style={{
                    margin: "0.25rem 0 0",
                    fontSize: "0.85rem",
                    color: "#cbd5f5",
                  }}
                >
                  Popular programs:{" "}
                  <span style={{ color: "white" }}>
                    {programs.slice(0, 3).join(", ")}
                    {programs.length > 3 ? " +" : ""}
                  </span>
                </p>
              )}
            </div>

            {/* Shortlist button */}
            <div
              style={{
                alignSelf: isMobile ? "stretch" : "center",
              }}
            >
              <button
                onClick={handleToggleShortlist}
                style={{
                  width: isMobile ? "100%" : "auto",
                  padding: "0.55rem 1.4rem",
                  borderRadius: "999px",
                  border: saved ? "none" : "1px solid #facc15",
                  background: saved
                    ? "linear-gradient(to right, #facc15, #f97316)"
                    : "rgba(15,23,42,0.65)",
                  color: saved ? "#0f172a" : "#facc15",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.35rem",
                  boxShadow: saved
                    ? "0 8px 18px rgba(250,204,21,0.55)"
                    : "0 6px 16px rgba(15,23,42,0.7)",
                }}
              >
                <span>{saved ? "★" : "☆"}</span>
                <span>
                  {saved ? "Saved to shortlist" : "Save to shortlist"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS LAYOUT */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "minmax(0, 1fr)"
            : "minmax(0, 1.7fr) minmax(0, 1.1fr)",
          gap: "1.75rem",
          alignItems: "flex-start",
          boxSizing: "border-box",
        }}
      >
        {/* MAIN COLUMN */}
        <div
          style={{
            display: "grid",
            gap: "1.25rem",
          }}
        >
          {/* Overview */}
          <article
            style={{
              borderRadius: "1rem",
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              padding: "1.1rem 1.25rem",
              boxShadow: "0 12px 26px rgba(15,23,42,0.08)",
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: "0.45rem",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Overview
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "0.93rem",
                color: "#4b5563",
                lineHeight: 1.6,
              }}
            >
              {description ||
                "No detailed description is available yet for this university."}
            </p>
          </article>

          {/* Programs */}
          <article
            style={{
              borderRadius: "1rem",
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              padding: "1.1rem 1.25rem",
              boxShadow: "0 12px 26px rgba(15,23,42,0.08)",
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: "0.5rem",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Major programs
            </h2>
            {Array.isArray(programs) && programs.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.45rem",
                }}
              >
                {programs.map((prog) => (
                  <span
                    key={prog}
                    style={{
                      fontSize: "0.82rem",
                      padding: "0.25rem 0.7rem",
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
              <p
                style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  color: "#6b7280",
                }}
              >
                Program information has not been added yet.
              </p>
            )}
          </article>

          {/* Admission info */}
          <article
            style={{
              borderRadius: "1rem",
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              padding: "1.1rem 1.25rem",
              boxShadow: "0 12px 26px rgba(15,23,42,0.08)",
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: "0.5rem",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Admission details
            </h2>
            {admissionNotes && (
              <p
                style={{
                  margin: "0 0 0.6rem",
                  fontSize: "0.9rem",
                  color: "#4b5563",
                }}
              >
                {admissionNotes}
              </p>
            )}
            {Array.isArray(admissionCycles) && admissionCycles.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gap: "0.6rem",
                }}
              >
                {admissionCycles.map((cycle, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "0.65rem 0.75rem",
                      borderRadius: "0.75rem",
                      backgroundColor: "#f9fafb",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                        marginBottom: "0.2rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          color: "#111827",
                        }}
                      >
                        {cycle.name || "Admission cycle"}
                      </span>
                      {cycle.applicationDeadline && (
                        <span
                          style={{
                            fontSize: "0.8rem",
                            padding: "0.15rem 0.55rem",
                            borderRadius: "999px",
                            backgroundColor: "#fee2e2",
                            color: "#b91c1c",
                          }}
                        >
                          Deadline: {formatDate(cycle.applicationDeadline)}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "#4b5563",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      {cycle.applicationOpenDate && (
                        <span>Opens: {formatDate(cycle.applicationOpenDate)}</span>
                      )}
                      {cycle.notes && (
                        <span
                          style={{
                            borderLeft: "1px solid #e5e7eb",
                            paddingLeft: "0.5rem",
                          }}
                        >
                          {cycle.notes}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p
                style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  color: "#6b7280",
                }}
              >
                Admission cycle details have not been added yet.
              </p>
            )}
          </article>

          {/* Gallery */}
          {Array.isArray(galleryImages) &&
            galleryImages.length > 0 && (
              <article
                style={{
                  borderRadius: "1rem",
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  padding: "1.1rem 1.25rem 1.2rem",
                  boxShadow: "0 12px 26px rgba(15,23,42,0.08)",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    marginBottom: "0.5rem",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  Campus snapshots
                </h2>
                <div
                  style={{
                    display: "grid",
                    gap: "0.6rem",
                    gridTemplateColumns: isMobile
                      ? "minmax(0, 1fr)"
                      : "repeat(3, minmax(0, 1fr))",
                  }}
                >
                  {galleryImages.map((url, idx) => (
                    <div
                      key={`${url}-${idx}`}
                      style={{
                        borderRadius: "0.75rem",
                        overflow: "hidden",
                        border: "1px solid #e5e7eb",
                        backgroundColor: "#f1f5f9",
                      }}
                    >
                      <img
                        src={url}
                        alt={`${name} campus ${idx + 1}`}
                        style={{
                          width: "100%",
                          height: 140,
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </article>
            )}
        </div>

        {/* SIDEBAR COLUMN */}
        <aside
          style={{
            display: "grid",
            gap: "1.1rem",
          }}
        >
          {/* Quick facts */}
          <article
            style={{
              borderRadius: "1rem",
              backgroundColor: "#020617",
              color: "white",
              padding: "1.1rem 1.25rem",
              boxShadow: "0 16px 36px rgba(15,23,42,0.9)",
              border: "1px solid rgba(148,163,184,0.55)",
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: "0.45rem",
                fontSize: "1.02rem",
                fontWeight: 700,
              }}
            >
              Quick facts
            </h2>
            <dl
              style={{
                margin: 0,
                display: "grid",
                rowGap: "0.45rem",
                columnGap: "0.5rem",
                gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1.4fr)",
                fontSize: "0.86rem",
              }}
            >
              <dt style={{ color: "#9ca3af" }}>Location</dt>
              <dd style={{ margin: 0, color: "#e5e7eb" }}>{fullLocation}</dd>

              <dt style={{ color: "#9ca3af" }}>Ranking</dt>
              <dd style={{ margin: 0, color: "#fde68a" }}>
                {ranking != null ? `#${ranking}` : "Not listed"}
              </dd>

              <dt style={{ color: "#9ca3af" }}>Programs</dt>
              <dd style={{ margin: 0, color: "#e5e7eb" }}>
                {Array.isArray(programs) && programs.length > 0
                  ? `${programs.length} program${
                      programs.length === 1 ? "" : "s"
                    }`
                  : "Not available"}
              </dd>

              <dt style={{ color: "#9ca3af" }}>Fee range</dt>
              <dd style={{ margin: 0, color: "#bbf7d0" }}>
                {hasFees ? formattedFeeRange() : "Not available"}
              </dd>
            </dl>

            {tuitionFeeNote && (
              <p
                style={{
                  margin: "0.75rem 0 0",
                  fontSize: "0.8rem",
                  color: "#9ca3af",
                }}
              >
                {tuitionFeeNote}
              </p>
            )}
          </article>

          {/* Website card */}
          <article
            style={{
              borderRadius: "1rem",
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              padding: "1rem 1.15rem",
              boxShadow: "0 12px 26px rgba(15,23,42,0.08)",
              fontSize: "0.9rem",
              color: "#4b5563",
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: "0.4rem",
                fontSize: "0.98rem",
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              Official website
            </h3>
            {website ? (
              <>
                <p style={{ margin: 0, marginBottom: "0.4rem" }}>
                  Visit the official website for detailed admission criteria,
                  updated fee structures and announcements.
                </p>
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "0.15rem",
                    padding: "0.4rem 0.9rem",
                    borderRadius: "999px",
                    border: "none",
                    background:
                      "linear-gradient(to right, #0ea5e9, #6366f1)",
                    color: "white",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 10px 24px rgba(59,130,246,0.55)",
                  }}
                >
                  Visit website ↗
                </a>
              </>
            ) : (
              <p style={{ margin: 0 }}>
                Website information is not available for this university yet.
              </p>
            )}
          </article>
        </aside>
      </section>
    </div>
  );
}
