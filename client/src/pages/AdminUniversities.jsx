import { useEffect, useState } from "react";

const PAGE_LIMIT = 100; // show up to 100 in admin list

export default function AdminUniversities() {
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
  });
  const [updating, setUpdating] = useState(false);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `http://localhost:5000/api/universities?page=1&limit=${PAGE_LIMIT}&sortBy=name&sortOrder=asc`
      );

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
  }, []);

  const resetCreateForm = () => {
    setName("");
    setCity("");
    setProvince("");
    setLocation("");
    setRanking("");
    setWebsite("");
    setPrograms("");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    if (!location.trim()) {
      alert("Location is required");
      return;
    }

    const payload = {
      name: name.trim(),
      city: city.trim() || undefined,
      province: province.trim() || undefined,
      location: location.trim() || undefined,
      website: website.trim() || undefined,
    };

    if (ranking.trim()) {
      const num = Number(ranking.trim());
      if (!Number.isNaN(num)) {
        payload.ranking = num;
      }
    }

    if (programs.trim()) {
      payload.programs = programs
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
    }

    try {
      setSubmitting(true);
      setError("");

      const res = await fetch("http://localhost:5000/api/universities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Request failed with status ${res.status}`);
      }

      // Refresh list
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this university?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/universities/${id}`,
        {
          method: "DELETE",
        }
      );

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
    });
  };

  const closeEditModal = () => {
    setEditId(null);
    setUpdating(false);
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editId) return;

    if (!editForm.name.trim()) {
      alert("Name is required");
      return;
    }
    if (!editForm.location.trim()) {
      alert("Location is required");
      return;
    }

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
      if (!Number.isNaN(num)) {
        payload.ranking = num;
      }
    }

    if (editForm.programs.trim()) {
      payload.programs = editForm.programs
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
    }

    try {
      setUpdating(true);
      const res = await fetch(
        `http://localhost:5000/api/universities/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Update failed with status ${res.status}`);
      }

      const updated = await res.json();

      setUniversities((prev) =>
        prev.map((u) => (u._id === updated._id ? updated : u))
      );

      closeEditModal();
    } catch (err) {
      console.error("Error updating university:", err);
      alert(err.message || "Failed to update university.");
      setUpdating(false);
    }
  };

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
          Admin – Manage Universities
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
          Create, view, edit and delete universities in the PakUniInfo database.
          (Admin panel – no authentication yet, local use only.)
        </p>
      </header>

      {/* CREATE FORM */}
      <section
        style={{
          marginBottom: "2rem",
          padding: "1.25rem 1.5rem",
          borderRadius: "0.9rem",
          backgroundColor: "#e5e7eb",
          border: "1px solid #cbd5f5",
          boxShadow: "0 8px 18px rgba(148,163,184,0.6)",
        }}
      >
        <h2
          style={{
            fontSize: "1.05rem",
            fontWeight: 600,
            marginBottom: "0.8rem",
            color: "#0f172a",
          }}
        >
          Add a new university
        </h2>

        <form
          onSubmit={handleCreate}
          style={{
            display: "grid",
            gap: "0.75rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
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
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
              Location *
            </label>
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
            <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
              Ranking (number)
            </label>
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

          {/* Submit */}
          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "flex-end",
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
                background:
                  "linear-gradient(to right, #0f766e, #22c55e, #4ade80)",
                color: "white",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: submitting ? "not-allowed" : "pointer",
                boxShadow: "0 10px 24px rgba(16, 185, 129, 0.55)",
              }}
            >
              {submitting ? "Adding..." : "Add university"}
            </button>
          </div>
        </form>
      </section>

      {/* LIST SECTION */}
      <section>
        <h2
          style={{
            fontSize: "1.1rem",
            fontWeight: 600,
            marginBottom: "0.6rem",
            color: "#0f172a",
          }}
        >
          Existing universities ({universities.length})
        </h2>

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
            No universities found yet. Add one using the form above.
          </p>
        )}

        <div
          style={{
            marginTop: "0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
          }}
        >
          {universities.map((uni) => (
            <article
              key={uni._id}
              style={{
                borderRadius: "0.6rem",
                padding: "0.85rem 1rem",
                backgroundColor: "#020617",
                color: "white",
                boxShadow: "0 6px 14px rgba(15,23,42,0.7)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    marginBottom: "0.2rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  {uni.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.85rem",
                    color: "#cbd5f5",
                  }}
                >
                  {uni.city || uni.location || "Location not set"}
                  {uni.province ? `, ${uni.province}` : ""}
                </p>
                <p
                  style={{
                    margin: "0.15rem 0 0",
                    fontSize: "0.8rem",
                    color: "#e5e7eb",
                  }}
                >
                  Ranking:{" "}
                  <span style={{ fontWeight: 600 }}>
                    {uni.ranking != null ? uni.ranking : "N/A"}
                  </span>{" "}
                  · Programs:{" "}
                  {Array.isArray(uni.programs) && uni.programs.length > 0
                    ? uni.programs.join(", ")
                    : "Not set"}
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
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
                  }}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
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
              width: "min(640px, 95vw)",
              maxHeight: "90vh",
              overflowY: "auto",
              borderRadius: "1rem",
              backgroundColor: "white",
              padding: "1.25rem 1.5rem",
              boxShadow: "0 25px 60px rgba(15,23,42,0.8)",
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
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#0f172a",
                }}
              >
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
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              }}
            >
              {/* Name */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
              >
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Name *
                </label>
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
              <div
                style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
              >
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  City
                </label>
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
              <div
                style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
              >
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Province
                </label>
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
              <div
                style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
              >
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Location *
                </label>
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
              <div
                style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
              >
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Ranking
                </label>
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
              <div
                style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
              >
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Website
                </label>
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
                <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Description
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    handleEditChange("description", e.target.value)
                  }
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

              {/* Buttons */}
              <div
                style={{
                  gridColumn: "1 / -1",
                  display: "flex",
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
                    background:
                      "linear-gradient(to right, #0f766e, #22c55e, #4ade80)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    cursor: updating ? "not-allowed" : "pointer",
                    boxShadow: "0 10px 24px rgba(16, 185, 129, 0.55)",
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
