export default function LoadingSpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          border: "4px solid #e2e8f0",
          borderTop: "4px solid #22c55e",
          borderRadius: "50%",
          animation: "spin 0.9s linear infinite",
        }}
      />

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
