export default function ErrorMessage({ message, onRetry }) {
  return (
    <div
      style={{
        padding: "1.4rem 1.6rem",
        borderRadius: "1rem",
        backgroundColor: "#fee2e2",
        border: "1px solid #fecaca",
        color: "#b91c1c",
        marginTop: "1rem",
      }}
    >
      <p style={{ margin: 0, marginBottom: "0.6rem", fontSize: "0.95rem" }}>
        ⚠️ {message || "Something went wrong."}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: "0.45rem 1rem",
            borderRadius: "999px",
            border: "none",
            background:
              "linear-gradient(to right, #ef4444, #f87171, #fca5a5)",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 6px 16px rgba(239,68,68,0.35)",
          }}
        >
          Try again
        </button>
      )}
    </div>
  );
}
