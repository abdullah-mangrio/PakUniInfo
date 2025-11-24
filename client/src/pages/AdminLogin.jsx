import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token
      localStorage.setItem("pakuni_admin_token", data.token);

      // Redirect to admin dashboard
      navigate("/admin/universities");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "1rem",
        backgroundColor: "#f1f5f9",
        boxShadow: "0 20px 45px rgba(15,23,42,0.4)",
      }}
    >
      <h1
        style={{
          fontSize: "1.6rem",
          fontWeight: 700,
          color: "#0f172a",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Admin Login
      </h1>

      {error && (
        <p style={{ color: "crimson", marginBottom: "0.8rem" }}>{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div>
          <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.65rem 0.8rem",
              borderRadius: "0.6rem",
              border: "1px solid #cbd5f5",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: "0.85rem", fontWeight: 500 }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.65rem 0.8rem",
              borderRadius: "0.6rem",
              border: "1px solid #cbd5f5",
              outline: "none",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "999px",
            border: "none",
            background:
              "linear-gradient(to right, #0f766e, #22c55e, #4ade80)",
            color: "white",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
