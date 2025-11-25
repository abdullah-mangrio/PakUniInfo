// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [menuOpen, setMenuOpen] = useState(false);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setMenuOpen(false); // close menu when going back to desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  const linkBaseStyle = {
    fontSize: "0.88rem",
    fontWeight: 500,
    textDecoration: "none",
    padding: "0.4rem 0.8rem",
    borderRadius: "999px",
    transition: "background-color 0.15s ease, color 0.15s ease",
  };

  const desktopNavLinks = (
    <nav
      style={{
        display: "flex",
        gap: "0.35rem",
        alignItems: "center",
      }}
    >
      <NavLink
        to="/"
        style={{
          ...linkBaseStyle,
          color: isActive("/") ? "#0f172a" : "#e5e7eb",
          backgroundColor: isActive("/") ? "#e5e7eb" : "transparent",
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/universities"
        style={{
          ...linkBaseStyle,
          color: isActive("/universities") ? "#0f172a" : "#e5e7eb",
          backgroundColor: isActive("/universities")
            ? "#e5e7eb"
            : "transparent",
        }}
      >
        Explore
      </NavLink>
      <NavLink
        to="/compare"
        style={{
          ...linkBaseStyle,
          color: isActive("/compare") ? "#0f172a" : "#e5e7eb",
          backgroundColor: isActive("/compare") ? "#e5e7eb" : "transparent",
        }}
      >
        Compare
      </NavLink>
      <NavLink
        to="/shortlist"
        style={{
          ...linkBaseStyle,
          color: isActive("/shortlist") ? "#0f172a" : "#e5e7eb",
          backgroundColor: isActive("/shortlist") ? "#e5e7eb" : "transparent",
        }}
      >
        Shortlist
      </NavLink>
      <NavLink
        to="/guidance"
        style={{
          ...linkBaseStyle,
          color: isActive("/guidance") ? "#0f172a" : "#e5e7eb",
          backgroundColor: isActive("/guidance") ? "#e5e7eb" : "transparent",
        }}
      >
        Guidance
      </NavLink>
      <NavLink
        to="/about"
        style={{
          ...linkBaseStyle,
          color: isActive("/about") ? "#0f172a" : "#e5e7eb",
          backgroundColor: isActive("/about") ? "#e5e7eb" : "transparent",
        }}
      >
        About
      </NavLink>
    </nav>
  );

  const desktopActions = (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
      }}
    >
      <Link
        to="/shortlist"
        style={{
          ...linkBaseStyle,
          backgroundColor: "rgba(15,23,42,0.15)",
          color: "#e5e7eb",
          border: "1px solid rgba(148,163,184,0.5)",
        }}
      >
        ★ My shortlist
      </Link>
      <Link
        to="/admin"
        style={{
          ...linkBaseStyle,
          background:
            "linear-gradient(to right, #22c55e, #16a34a, #4ade80)",
          color: "white",
          boxShadow: "0 8px 18px rgba(34,197,94,0.65)",
        }}
      >
        Admin
      </Link>
    </div>
  );

  const mobileMenu = menuOpen && (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        zIndex: 40,
        padding: "0.75rem 1rem 1rem",
        background:
          "linear-gradient(to bottom, rgba(15,23,42,0.96), rgba(15,23,42,0.98))",
        borderBottomLeftRadius: "1rem",
        borderBottomRightRadius: "1rem",
        borderTop: "1px solid rgba(148,163,184,0.5)",
        boxShadow: "0 18px 40px rgba(15,23,42,0.9)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          style={{
            ...linkBaseStyle,
            display: "block",
            color: isActive("/") ? "#0f172a" : "#e5e7eb",
            backgroundColor: isActive("/") ? "#e5e7eb" : "transparent",
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/universities"
          onClick={() => setMenuOpen(false)}
          style={{
            ...linkBaseStyle,
            display: "block",
            color: isActive("/universities") ? "#0f172a" : "#e5e7eb",
            backgroundColor: isActive("/universities")
              ? "#e5e7eb"
              : "transparent",
          }}
        >
          Explore
        </NavLink>
        <NavLink
          to="/compare"
          onClick={() => setMenuOpen(false)}
          style={{
            ...linkBaseStyle,
            display: "block",
            color: isActive("/compare") ? "#0f172a" : "#e5e7eb",
            backgroundColor: isActive("/compare") ? "#e5e7eb" : "transparent",
          }}
        >
          Compare
        </NavLink>
        <NavLink
          to="/shortlist"
          onClick={() => setMenuOpen(false)}
          style={{
            ...linkBaseStyle,
            display: "block",
            color: isActive("/shortlist") ? "#0f172a" : "#e5e7eb",
            backgroundColor: isActive("/shortlist")
              ? "#e5e7eb"
              : "transparent",
          }}
        >
          Shortlist
        </NavLink>
        <NavLink
          to="/guidance"
          onClick={() => setMenuOpen(false)}
          style={{
            ...linkBaseStyle,
            display: "block",
            color: isActive("/guidance") ? "#0f172a" : "#e5e7eb",
            backgroundColor: isActive("/guidance")
              ? "#e5e7eb"
              : "transparent",
          }}
        >
          Guidance
        </NavLink>
        <NavLink
          to="/about"
          onClick={() => setMenuOpen(false)}
          style={{
            ...linkBaseStyle,
            display: "block",
            color: isActive("/about") ? "#0f172a" : "#e5e7eb",
            backgroundColor: isActive("/about") ? "#e5e7eb" : "transparent",
          }}
        >
          About
        </NavLink>
      </div>

      <div
        style={{
          marginTop: "0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
        }}
      >
        <Link
          to="/shortlist"
          onClick={() => setMenuOpen(false)}
          style={{
            ...linkBaseStyle,
            display: "block",
            textAlign: "center",
            backgroundColor: "rgba(15,23,42,0.85)",
            color: "#e5e7eb",
            border: "1px solid rgba(148,163,184,0.7)",
          }}
        >
          ★ My shortlist
        </Link>
        <Link
          to="/admin"
          onClick={() => setMenuOpen(false)}
          style={{
            ...linkBaseStyle,
            display: "block",
            textAlign: "center",
            background:
              "linear-gradient(to right, #22c55e, #16a34a, #4ade80)",
            color: "white",
            boxShadow: "0 8px 18px rgba(34,197,94,0.65)",
          }}
        >
          Admin
        </Link>
      </div>
    </div>
  );

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        background:
          "linear-gradient(to bottom, rgba(15,23,42,0.95), rgba(15,23,42,0.85))",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(148,163,184,0.35)",
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: isMobile ? "0.7rem 1.1rem" : "0.9rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          position: "relative",
        }}
      >
        {/* LEFT: LOGO / BRAND */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "0.9rem",
              background:
                "conic-gradient(from 210deg at 50% 50%, #22c55e, #22c55e, #0ea5e9, #6366f1, #22c55e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(34,197,94,0.5)",
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "0.75rem",
                backgroundColor: "#020617",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#bbf7d0",
              }}
            >
              PU
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.1,
            }}
          >
            <span
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#f9fafb",
              }}
            >
              PakUniInfo
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                color: "#cbd5f5",
              }}
            >
              Find your next campus
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        {!isMobile && (
          <>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {desktopNavLinks}
            </div>
            {desktopActions}
          </>
        )}

        {/* MOBILE: HAMBURGER BUTTON */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "#e5e7eb",
              cursor: "pointer",
              padding: "0.25rem",
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(15,23,42,0.8)",
              }}
            >
              {menuOpen ? (
                <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>✕</span>
              ) : (
                <span style={{ fontSize: "1.15rem", lineHeight: 1 }}>☰</span>
              )}
            </div>
          </button>
        )}

        {/* MOBILE DROPDOWN */}
        {isMobile && mobileMenu}
      </div>
    </header>
  );
}
