import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem 1rem",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: 800,
          color: "#0f172a",
          marginBottom: "0.5rem",
        }}
      >
        404
      </h1>

      <p
        style={{
          fontSize: "1.2rem",
          color: "#475569",
          marginBottom: "1.2rem",
        }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "0.7rem 1.3rem",
            borderRadius: "999px",
            border: "none",
            background:
              "linear-gradient(to right, #16a34a, #22c55e, #4ade80)",
            color: "white",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(22,163,74,0.5)",
          }}
        >
          Go to Home
        </button>

        <button
          onClick={() => navigate("/universities")}
          style={{
            padding: "0.7rem 1.3rem",
            borderRadius: "999px",
            border: "1px solid #cbd5f5",
            backgroundColor: "white",
            color: "#0f172a",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          Explore Universities
        </button>
      </div>
    </div>
  );
}
