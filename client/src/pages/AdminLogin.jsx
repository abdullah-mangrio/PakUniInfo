// client/src/pages/AdminLogin.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // If token already exists, send to admin panel
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/universities");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    // ✅ Timeout protection
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
        signal: controller.signal,
      });

      // Try read JSON if possible, otherwise keep empty
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Login failed. Check your details.");
      }

      if (!data.token) {
        throw new Error("Login response did not contain a token.");
      }

      localStorage.setItem("adminToken", data.token);
      navigate("/admin/universities");
    } catch (err) {
      console.error("Admin login error:", err);

      if (err?.name === "AbortError") {
        setError("Server is waking up or your network is slow. Please retry.");
      } else if (
        String(err?.message || "")
          .toLowerCase()
          .includes("failed to fetch")
      ) {
        setError(
          "Couldn’t reach the server. Please check your connection and try again."
        );
      } else {
        setError(err?.message || "Unable to login right now.");
      }
    } finally {
      clearTimeout(timeoutId);
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "center",
        padding: isMobile ? "1.8rem 1.2rem 2.4rem" : "3rem 2rem 3.2rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          borderRadius: "1.25rem",
          padding: isMobile ? "1.6rem 1.4rem" : "2rem 1.9rem",
          background:
            "radial-gradient(circle at top left, #0f172a 0, #020617 45%, #020617 100%)",
          boxShadow: "0 26px 70px rgba(15,23,42,0.9)",
          color: "white",
        }}
      >
        {/* Header */}
        <header style={{ marginBottom: "1.4rem" }}>
          <p
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#a5b4fc",
              marginBottom: "0.35rem",
              fontWeight: 600,
            }}
          >
            Admin area
          </p>
          <h1
            style={{
              fontSize: isMobile ? "1.4rem" : "1.6rem",
              fontWeight: 800,
              marginBottom: "0.4rem",
            }}
          >
            Sign in to manage universities
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "#e5e7eb",
            }}
          >
            This panel is only for the site owner. Students and parents don&apos;t
            need an account – they can simply browse the site.
          </p>
        </header>

        {/* Error */}
        {error && (
          <div
            style={{
              marginBottom: "0.9rem",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.75rem",
              backgroundColor: "rgba(248,113,113,0.12)",
              border: "1px solid rgba(248,113,113,0.7)",
              fontSize: "0.85rem",
              color: "#fecaca",
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: "0.95rem",
          }}
        >
          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label
              htmlFor="admin-email"
              style={{ fontSize: "0.85rem", fontWeight: 500, color: "#e5e7eb" }}
            >
              Admin email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@pakuniinfo.local"
              autoComplete="username"
              style={{
                padding: "0.55rem 0.75rem",
                borderRadius: "0.65rem",
                border: "1px solid rgba(148,163,184,0.7)",
                fontSize: "0.9rem",
                outline: "none",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label
              htmlFor="admin-password"
              style={{ fontSize: "0.85rem", fontWeight: 500, color: "#e5e7eb" }}
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoComplete="current-password"
              style={{
                padding: "0.55rem 0.75rem",
                borderRadius: "0.65rem",
                border: "1px solid rgba(148,163,184,0.7)",
                fontSize: "0.9rem",
                outline: "none",
              }}
            />
          </div>

          {/* Helper note */}
          <p
            style={{
              margin: "0.2rem 0 0.4rem",
              fontSize: "0.78rem",
              color: "#9ca3af",
            }}
          >
            If you&apos;re testing locally, make sure the backend is running and
            that <code style={{ fontSize: "0.78rem" }}>.env</code> has the same
            admin email &amp; password as you type here.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              marginTop: "0.4rem",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/")}
              style={{
                padding: isMobile ? "0.45rem 0.95rem" : "0.5rem 1.1rem",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.8)",
                backgroundColor: "transparent",
                color: "#e5e7eb",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              Back to site
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: isMobile ? "0.5rem 1.3rem" : "0.55rem 1.5rem",
                borderRadius: "999px",
                border: "none",
                background:
                  "linear-gradient(to right, #22c55e, #16a34a, #4ade80)",
                color: "white",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: submitting ? "not-allowed" : "pointer",
                boxShadow: "0 14px 32px rgba(34,197,94,0.75)",
              }}
            >
              {submitting ? "Signing in..." : "Sign in as admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
