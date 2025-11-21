import { NavLink } from "react-router-dom";

const baseLinkStyle = {
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "0.98rem",
  color: "#e5e7eb",
};

const activeExtra = {
  borderBottom: "2px solid #22c55e",
  color: "#ffffff",
};

export default function Navbar() {
  return (
    <header
      style={{
        padding: "0.9rem 1.5rem",
        borderBottom: "1px solid rgba(148, 163, 184, 0.35)",
        backdropFilter: "blur(10px)",
        background:
          "linear-gradient(to right, rgba(15,23,42,0.95), rgba(15,23,42,0.85))",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <nav
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "1.15rem" }}>PakUniInfo</div>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive
                ? { ...baseLinkStyle, ...activeExtra }
                : baseLinkStyle
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/universities"
            style={({ isActive }) =>
              isActive
                ? { ...baseLinkStyle, ...activeExtra }
                : baseLinkStyle
            }
          >
            Explore
          </NavLink>

          <NavLink
            to="/shortlist"
            style={({ isActive }) =>
              isActive
                ? { ...baseLinkStyle, ...activeExtra }
                : baseLinkStyle
            }
          >
            Shortlist
          </NavLink>

          <NavLink
            to="/about"
            style={({ isActive }) =>
              isActive
                ? { ...baseLinkStyle, ...activeExtra }
                : baseLinkStyle
            }
          >
            About
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
