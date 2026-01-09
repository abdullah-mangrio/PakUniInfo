// client/src/pages/AdminUniversities.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_LIMIT = 100; // show up to 100 in admin list

// Helper: parse "one cycle per line" text into objects
function parseAdmissionCycles(raw) {
  if (!raw || !raw.trim()) return undefined;

  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const cycles = [];

  for (const line of lines) {
    const parts = line.split("|").map((p) => p.trim());
    if (!parts[0]) continue;

    const [name, openDateStr, deadlineStr, notes] = parts;

    const cycle = { name };

    if (openDateStr) {
      const d = new Date(openDateStr);
      if (!Number.isNaN(d.getTime())) {
        cycle.applicationOpenDate = d.toISOString();
      }
    }

    if (deadlineStr) {
      const d = new Date(deadlineStr);
      if (!Number.isNaN(d.getTime())) {
        cycle.applicationDeadline = d.toISOString();
      }
    }

    if (notes) {
      cycle.notes = notes;
    }

    cycles.push(cycle);
  }

  return cycles.length > 0 ? cycles : undefined;
}

// Helper: format admissionCycles from DB into textarea lines
function formatAdmissionCycles(cycles) {
  if (!Array.isArray(cycles) || cycles.length === 0) return "";
  return cycles
    .map((c) => {
      const name = c.name || "";
      const open =
        c.applicationOpenDate instanceof Date
          ? c.applicationOpenDate
          : c.applicationOpenDate
          ? new Date(c.applicationOpenDate)
          : null;
      const deadline =
        c.applicationDeadline instanceof Date
          ? c.applicationDeadline
          : c.applicationDeadline
          ? new Date(c.applicationDeadline)
          : null;

      const openStr =
        open && !Number.isNaN(open.getTime())
          ? open.toISOString().slice(0, 10)
          : "";
      const deadlineStr =
        deadline && !Number.isNaN(deadline.getTime())
          ? deadline.toISOString().slice(0, 10)
          : "";
      const notes = c.notes || "";

      return [name, openStr, deadlineStr, notes].join(" | ").trim();
    })
    .join("\n");
}

export default function AdminUniversities() {
  const navigate = useNavigate();

  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // create form state
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [location, setLocation] = useState("");
  const [ranking, setRanking] = useState("");
  const [website, setWebsite] = useState("");
  const [programs, setPrograms] = useState("");
  const [description, setDescription] = useState("");

  const [tuitionFeeMin, setTuitionFeeMin] = useState("");
  const [tuitionFeeMax, setTuitionFeeMax] = useState("");
  const [tuitionFeeCurrency, setTuitionFeeCurrency] = useState("PKR");
  const [tuitionFeeNote, setTuitionFeeNote] = useState("");

  const [admissionNotes, setAdmissionNotes] = useState("");
  const [admissionCyclesRaw, setAdmissionCyclesRaw] = useState("");

  const [logoUrl, setLogoUrl] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [galleryImages, setGalleryImages] = useState("");

  const [submitting, setSubmitting] = useState(false);

  // edit modal state
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    city: "",
    province: "",
    location: "",
    ranking: "",
    website: "",
    programs: "",
    description: "",
    tuitionFeeMin: "",
    tuitionFeeMax: "",
    tuitionFeeCurrency: "PKR",
    tuitionFeeNote: "",
    admissionNotes: "",
    admissionCyclesRaw: "",
    logoUrl: "",
    heroImageUrl: "",
    galleryImages: "",
  });
  const [updating, setUpdating] = useState(false);

  // simple mobile breakpoint
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ===== AUTH HELPERS =====
  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // Redirect to login if no token at all
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `http://localhost:5000/api/universities?page=1&limit=${PAGE_LIMIT}&sortBy=name&sortOrder=asc`,
        { headers: getAuthHeaders() }
      );

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setUniversities(data.results || []);
    } catch (err) {
      console.error("Error fetching universities (admin):", err);
      setError(err.message || "Failed to fetch universities.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetCreateForm = () => {
    setName("");
    setCity("");
    setProvince("");
    setLocation("");
    setRanking("");
    setWebsite("");
    setPrograms("");
    setDescription("");
    setTuitionFeeMin("");
    setTuitionFeeMax("");
    setTuitionFeeCurrency("PKR");
    setTuitionFeeNote("");
    setAdmissionNotes("");
    setAdmissionCyclesRaw("");
    setLogoUrl("");
    setHeroImageUrl("");
    setGalleryImages("");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Name is required");
    if (!location.trim()) return alert("Location is required");

    const payload = {
      name: name.trim(),
      city: city.trim() || undefined,
      province: province.trim() || undefined,
      location: location.trim() || undefined,
      website: website.trim() || undefined,
      description: description.trim() || undefined,
    };

    if (ranking.trim()) {
      const num = Number(ranking.trim());
      if (!Number.isNaN(num)) payload.ranking = num;
    }

    if (programs.trim()) {
      payload.programs = programs
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
    }

    if (tuitionFeeMin.trim()) {
      const num = Number(tuitionFeeMin.trim());
      if (!Number.isNaN(num)) payload.tuitionFeeMin = num;
    }
    if (tuitionFeeMax.trim()) {
      const num = Number(tuitionFeeMax.trim());
      if (!Number.isNaN(num)) payload.tuitionFeeMax = num;
    }
    if (tuitionFeeCurrency.trim()) payload.tuitionFeeCurrency = tuitionFeeCurrency.trim();
    if (tuitionFeeNote.trim()) payload.tuitionFeeNote = tuitionFeeNote.trim();

    if (admissionNotes.trim()) payload.admissionNotes = admissionNotes.trim();
    const cycles = parseAdmissionCycles(admissionCyclesRaw);
    if (cycles) payload.admissionCycles = cycles;

    if (logoUrl.trim()) payload.logoUrl = logoUrl.trim();
    if (heroImageUrl.trim()) payload.heroImageUrl = heroImageUrl.trim();
    if (galleryImages.trim()) {
      payload.galleryImages = galleryImages
        .split(",")
        .map((u) => u.trim())
        .filter(Boolean);
    }

    try {
      setSubmitting(true);
      setError("");

      const res = await fetch("http://localhost:5000/api/universities", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Request failed with status ${res.status}`);
      }

      await fetchUniversities();
      resetCreateForm();
    } catch (err) {
      console.error("Error creating university:", err);
      setError(err.message || "Failed to create university.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this university?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/universities/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Delete failed with status ${res.status}`);
      }

      setUniversities((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Error deleting university:", err);
      alert(err.message || "Failed to delete university.");
    }
  };

  // ----- EDIT MODAL LOGIC -----
  const openEditModal = (uni) => {
    setEditId(uni._id);
    setEditForm({
      name: uni.name || "",
      city: uni.city || "",
      province: uni.province || "",
      location: uni.location || "",
      ranking:
        typeof uni.ranking === "number" && !Number.isNaN(uni.ranking)
          ? String(uni.ranking)
          : "",
      website: uni.website || "",
      programs:
        Array.isArray(uni.programs) && uni.programs.length > 0
          ? uni.programs.join(", ")
          : "",
      description: uni.description || "",
      tuitionFeeMin: typeof uni.tuitionFeeMin === "number" ? String(uni.tuitionFeeMin) : "",
      tuitionFeeMax: typeof uni.tuitionFeeMax === "number" ? String(uni.tuitionFeeMax) : "",
      tuitionFeeCurrency: uni.tuitionFeeCurrency || "PKR",
      tuitionFeeNote: uni.tuitionFeeNote || "",
      admissionNotes: uni.admissionNotes || "",
      admissionCyclesRaw: formatAdmissionCycles(uni.admissionCycles),
      logoUrl: uni.logoUrl || "",
      heroImageUrl: uni.heroImageUrl || "",
      galleryImages:
        Array.isArray(uni.galleryImages) && uni.galleryImages.length > 0
          ? uni.galleryImages.join(", ")
          : "",
    });
  };

  const closeEditModal = () => {
    setEditId(null);
    setUpdating(false);
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editId) return;

    if (!editForm.name.trim()) return alert("Name is required");
    if (!editForm.location.trim()) return alert("Location is required");

    const payload = {
      name: editForm.name.trim(),
      city: editForm.city.trim() || undefined,
      province: editForm.province.trim() || undefined,
      location: editForm.location.trim() || undefined,
      website: editForm.website.trim() || undefined,
      description: editForm.description.trim() || undefined,
    };

    if (editForm.ranking.trim()) {
      const num = Number(editForm.ranking.trim());
      if (!Number.isNaN(num)) payload.ranking = num;
    }

    if (editForm.programs.trim()) {
      payload.programs = editForm.programs
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
    }

    if (editForm.tuitionFeeMin.trim()) {
      const num = Number(editForm.tuitionFeeMin.trim());
      if (!Number.isNaN(num)) payload.tuitionFeeMin = num;
    } else payload.tuitionFeeMin = undefined;

    if (editForm.tuitionFeeMax.trim()) {
      const num = Number(editForm.tuitionFeeMax.trim());
      if (!Number.isNaN(num)) payload.tuitionFeeMax = num;
    } else payload.tuitionFeeMax = undefined;

    if (editForm.tuitionFeeCurrency.trim()) payload.tuitionFeeCurrency = editForm.tuitionFeeCurrency.trim();
    else payload.tuitionFeeCurrency = undefined;

    if (editForm.tuitionFeeNote.trim()) payload.tuitionFeeNote = editForm.tuitionFeeNote.trim();
    else payload.tuitionFeeNote = undefined;

    if (editForm.admissionNotes.trim()) payload.admissionNotes = editForm.admissionNotes.trim();
    else payload.admissionNotes = undefined;

    const cycles = parseAdmissionCycles(editForm.admissionCyclesRaw);
    payload.admissionCycles = cycles ? cycles : [];

    if (editForm.logoUrl.trim()) payload.logoUrl = editForm.logoUrl.trim();
    else payload.logoUrl = undefined;

    if (editForm.heroImageUrl.trim()) payload.heroImageUrl = editForm.heroImageUrl.trim();
    else payload.heroImageUrl = undefined;

    if (editForm.galleryImages.trim()) {
      payload.galleryImages = editForm.galleryImages
        .split(",")
        .map((u) => u.trim())
        .filter(Boolean);
    } else payload.galleryImages = [];

    try {
      setUpdating(true);
      const res = await fetch(`http://localhost:5000/api/universities/${editId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Update failed with status ${res.status}`);
      }

      const updated = await res.json();
      setUniversities((prev) => prev.map((u) => (u._id === updated._id ? updated : u)));
      closeEditModal();
    } catch (err) {
      console.error("Error updating university:", err);
      alert(err.message || "Failed to update university.");
      setUpdating(false);
    }
  };

  return (
    <div>
      <header
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
        }}
      >
        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#0f172a" }}>
          Admin – Manage Universities
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.95rem", maxWidth: "40rem" }}>
          Create, view, edit and delete universities in the PakUniInfo database.
          This panel supports fees, admission info and images.
        </p>
      </header>

      {/* CREATE FORM */}
      <section
        style={{
          marginBottom: "2rem",
          padding: isMobile ? "1.1rem 1.1rem" : "1.25rem 1.5rem",
          borderRadius: "0.9rem",
          backgroundColor: "#e5e7eb",
          border: "1px solid #cbd5f5",
          boxShadow: "0 8px 18px rgba(148,163,184,0.6)",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.8rem", color: "#0f172a" }}>
          Add a new university
        </h2>

        {error && (
          <div
            style={{
              marginBottom: "0.75rem",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.75rem",
              backgroundColor: "rgba(248,113,113,0.12)",
              border: "1px solid rgba(248,113,113,0.7)",
              fontSize: "0.85rem",
              color: "#991b1b",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleCreate}
          style={{
            display: "grid",
            gap: "0.75rem",
            gridTemplateColumns: isMobile
              ? "minmax(0, 1fr)"
              : "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {/* Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
              }}
            />
          </div>

          {/* City */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
              }}
            />
          </div>

          {/* Province */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Province</label>
            <input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              placeholder="e.g. Sindh"
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
              }}
            />
          </div>

          {/* Location */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Location *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Area / campus"
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
              }}
            />
          </div>

          {/* Ranking */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Ranking (number)</label>
            <input
              type="number"
              value={ranking}
              onChange={(e) => setRanking(e.target.value)}
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
              }}
            />
          </div>

          {/* Website */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Website</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://..."
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
              }}
            />
          </div>

          {/* Programs */}
          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
              Programs (comma-separated)
            </label>
            <input
              type="text"
              value={programs}
              onChange={(e) => setPrograms(e.target.value)}
              placeholder="e.g. BSCS, BBA, MBBS"
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
              }}
            />
          </div>

          {/* Description */}
          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Description / overview</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
                resize: "vertical",
              }}
            />
          </div>

          {/* FEES */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Fee (min, per year)</label>
            <input
              type="number"
              value={tuitionFeeMin}
              onChange={(e) => setTuitionFeeMin(e.target.value)}
              placeholder="e.g. 150000"
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Fee (max, per year)</label>
            <input
              type="number"
              value={tuitionFeeMax}
              onChange={(e) => setTuitionFeeMax(e.target.value)}
              placeholder="e.g. 350000"
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Fee currency</label>
            <input
              type="text"
              value={tuitionFeeCurrency}
              onChange={(e) => setTuitionFeeCurrency(e.target.value)}
              placeholder="PKR"
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
              }}
            />
          </div>

          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Fee note (optional)</label>
            <textarea
              value={tuitionFeeNote}
              onChange={(e) => setTuitionFeeNote(e.target.value)}
              rows={2}
              placeholder="e.g. Varies by program, excludes hostel..."
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
                resize: "vertical",
              }}
            />
          </div>

          {/* ADMISSION */}
          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>General admission notes</label>
            <textarea
              value={admissionNotes}
              onChange={(e) => setAdmissionNotes(e.target.value)}
              rows={2}
              placeholder="e.g. NTS required, apply via HEC portal..."
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
                resize: "vertical",
              }}
            />
          </div>

          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
              Admission cycles (one per line)
            </label>
            <textarea
              value={admissionCyclesRaw}
              onChange={(e) => setAdmissionCyclesRaw(e.target.value)}
              rows={4}
              placeholder={`Example:\nFall 2025 | 2025-01-15 | 2025-04-30 | NTS required\nSpring 2026 | 2025-09-01 | 2025-11-30 | Online applications only`}
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
                resize: "vertical",
                whiteSpace: "pre-wrap",
              }}
            />
          </div>

          {/* IMAGES */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Logo URL</label>
            <input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://... small logo"
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Hero / banner image URL</label>
            <input
              type="url"
              value={heroImageUrl}
              onChange={(e) => setHeroImageUrl(e.target.value)}
              placeholder="https://... large cover image"
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
              }}
            />
          </div>

          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
              Gallery image URLs (comma-separated)
            </label>
            <input
              type="text"
              value={galleryImages}
              onChange={(e) => setGalleryImages(e.target.value)}
              placeholder="https://image1.jpg, https://image2.jpg"
              style={{
                padding: "0.5rem 0.7rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5f5",
                fontSize: "0.9rem",
              }}
            />
          </div>

          {/* Submit */}
          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: isMobile ? "stretch" : "flex-end",
              marginTop: "0.4rem",
            }}
          >
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "0.55rem 1.4rem",
                borderRadius: "999px",
                border: "none",
                background: "linear-gradient(to right, #0f766e, #22c55e, #4ade80)",
                color: "white",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: submitting ? "not-allowed" : "pointer",
                boxShadow: "0 10px 24px rgba(16, 185, 129, 0.55)",
                width: isMobile ? "100%" : "auto",
              }}
            >
              {submitting ? "Adding..." : "Add university"}
            </button>
          </div>
        </form>
      </section>

      {/* LIST SECTION */}
      <section>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.6rem", color: "#0f172a" }}>
          Existing universities ({universities.length})
        </h2>

        {loading && (
          <p style={{ color: "#0f172a", fontSize: "0.95rem" }}>Loading universities...</p>
        )}

        {!loading && error && <p style={{ color: "crimson", fontSize: "0.95rem" }}>{error}</p>}

        {!loading && !error && universities.length === 0 && (
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
            No universities found yet. Add one using the form above.
          </p>
        )}

        <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {universities.map((uni) => {
            const hasFee =
              typeof uni.tuitionFeeMin === "number" ||
              typeof uni.tuitionFeeMax === "number";

            return (
              <article
                key={uni._id}
                style={{
                  borderRadius: "0.6rem",
                  padding: "0.85rem 1rem",
                  backgroundColor: "#020617",
                  color: "white",
                  boxShadow: "0 6px 14px rgba(15,23,42,0.7)",
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                  border: "1px solid rgba(148,163,184,0.6)",
                }}
              >
                <div>
                  <h3 style={{ margin: 0, marginBottom: "0.2rem", fontSize: "1rem", fontWeight: 600 }}>
                    {uni.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#cbd5f5" }}>
                    {uni.city || uni.location || "Location not set"}
                    {uni.province ? `, ${uni.province}` : ""}
                  </p>
                  <p style={{ margin: "0.15rem 0 0", fontSize: "0.8rem", color: "#e5e7eb" }}>
                    Ranking:{" "}
                    <span style={{ fontWeight: 600 }}>
                      {uni.ranking != null ? uni.ranking : "N/A"}
                    </span>{" "}
                    · Programs:{" "}
                    {Array.isArray(uni.programs) && uni.programs.length > 0
                      ? uni.programs.join(", ")
                      : "Not set"}
                  </p>
                  {hasFee && (
                    <p style={{ margin: "0.1rem 0 0", fontSize: "0.8rem", color: "#facc15" }}>
                      Fee approx: {uni.tuitionFeeCurrency || "PKR"}{" "}
                      {uni.tuitionFeeMin ? uni.tuitionFeeMin.toLocaleString("en-PK") : "?"}
                      {uni.tuitionFeeMax ? ` – ${uni.tuitionFeeMax.toLocaleString("en-PK")}` : ""}{" "}
                      / year
                    </p>
                  )}
                </div>

                <div style={{ display: "flex", gap: "0.5rem", alignSelf: isMobile ? "stretch" : "auto" }}>
                  <button
                    onClick={() => openEditModal(uni)}
                    style={{
                      padding: "0.35rem 0.85rem",
                      borderRadius: "999px",
                      border: "1px solid #cbd5f5",
                      backgroundColor: "white",
                      color: "#0f172a",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      flex: isMobile ? 1 : "none",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(uni._id)}
                    style={{
                      padding: "0.35rem 0.85rem",
                      borderRadius: "999px",
                      border: "1px solid #fecaca",
                      backgroundColor: "#fee2e2",
                      color: "#b91c1c",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      flex: isMobile ? 1 : "none",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* EDIT MODAL */}
      {editId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15,23,42,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
          onClick={closeEditModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(700px, 95vw)",
              maxHeight: "90vh",
              overflowY: "auto",
              borderRadius: "1rem",
              backgroundColor: "white",
              padding: isMobile ? "1rem 1.1rem" : "1.25rem 1.5rem",
              boxShadow: "0 25px 60px rgba(15,23,42,0.8)",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.9rem",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600, color: "#0f172a" }}>
                Edit university
              </h2>
              <button
                onClick={closeEditModal}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  color: "#64748b",
                }}
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleUpdate}
              style={{
                display: "grid",
                gap: "0.75rem",
                gridTemplateColumns: isMobile
                  ? "minmax(0, 1fr)"
                  : "repeat(auto-fit, minmax(220px, 1fr))",
              }}
            >
              {/* Name */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Name *</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              {/* City */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>City</label>
                <input
                  type="text"
                  value={editForm.city}
                  onChange={(e) => handleEditChange("city", e.target.value)}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              {/* Province */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Province</label>
                <input
                  type="text"
                  value={editForm.province}
                  onChange={(e) => handleEditChange("province", e.target.value)}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              {/* Location */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Location *</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => handleEditChange("location", e.target.value)}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              {/* Ranking */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Ranking</label>
                <input
                  type="number"
                  value={editForm.ranking}
                  onChange={(e) => handleEditChange("ranking", e.target.value)}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              {/* Website */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Website</label>
                <input
                  type="url"
                  value={editForm.website}
                  onChange={(e) => handleEditChange("website", e.target.value)}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              {/* Programs */}
              <div
                style={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Programs (comma-separated)
                </label>
                <input
                  type="text"
                  value={editForm.programs}
                  onChange={(e) => handleEditChange("programs", e.target.value)}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              {/* Description */}
              <div
                style={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => handleEditChange("description", e.target.value)}
                  rows={3}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Fees */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Fee (min)</label>
                <input
                  type="number"
                  value={editForm.tuitionFeeMin}
                  onChange={(e) => handleEditChange("tuitionFeeMin", e.target.value)}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Fee (max)</label>
                <input
                  type="number"
                  value={editForm.tuitionFeeMax}
                  onChange={(e) => handleEditChange("tuitionFeeMax", e.target.value)}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Fee currency</label>
                <input
                  type="text"
                  value={editForm.tuitionFeeCurrency}
                  onChange={(e) => handleEditChange("tuitionFeeCurrency", e.target.value)}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div
                style={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Fee note</label>
                <textarea
                  value={editForm.tuitionFeeNote}
                  onChange={(e) => handleEditChange("tuitionFeeNote", e.target.value)}
                  rows={2}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Admission */}
              <div
                style={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  General admission notes
                </label>
                <textarea
                  value={editForm.admissionNotes}
                  onChange={(e) => handleEditChange("admissionNotes", e.target.value)}
                  rows={2}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                    resize: "vertical",
                  }}
                />
              </div>

              <div
                style={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Admission cycles (one per line)
                </label>
                <textarea
                  value={editForm.admissionCyclesRaw}
                  onChange={(e) => handleEditChange("admissionCyclesRaw", e.target.value)}
                  rows={4}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                    resize: "vertical",
                    whiteSpace: "pre-wrap",
                  }}
                />
              </div>

              {/* Images */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Logo URL</label>
                <input
                  type="url"
                  value={editForm.logoUrl}
                  onChange={(e) => handleEditChange("logoUrl", e.target.value)}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>Hero image URL</label>
                <input
                  type="url"
                  value={editForm.heroImageUrl}
                  onChange={(e) => handleEditChange("heroImageUrl", e.target.value)}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div
                style={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Gallery image URLs (comma-separated)
                </label>
                <input
                  type="text"
                  value={editForm.galleryImages}
                  onChange={(e) => handleEditChange("galleryImages", e.target.value)}
                  style={{
                    padding: "0.5rem 0.7rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5f5",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              {/* Buttons */}
              <div
                style={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "flex-end",
                  gap: "0.5rem",
                  marginTop: "0.4rem",
                }}
              >
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={updating}
                  style={{
                    padding: "0.5rem 1.1rem",
                    borderRadius: "999px",
                    border: "1px solid #cbd5f5",
                    backgroundColor: "white",
                    fontSize: "0.9rem",
                    cursor: updating ? "not-allowed" : "pointer",
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  style={{
                    padding: "0.5rem 1.4rem",
                    borderRadius: "999px",
                    border: "none",
                    background: "linear-gradient(to right, #0f766e, #22c55e, #4ade80)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    cursor: updating ? "not-allowed" : "pointer",
                    boxShadow: "0 10px 24px rgba(16, 185, 129, 0.55)",
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  {updating ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
