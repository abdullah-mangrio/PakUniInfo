import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #020617)",
        paddingBottom: "2rem",
      }}
    >
      <Navbar />

      <main
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "2rem 1.5rem 3rem",
          backgroundColor: "#f8fafc",
          borderRadius: "1.5rem 1.5rem 0 0",
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.45)",
        }}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
