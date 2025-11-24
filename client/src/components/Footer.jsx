export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        marginTop: "3rem",
        padding: "2.5rem 1.5rem 2rem",
        background: "radial-gradient(circle at top left, #0b1120, #020617)",
        color: "#cbd5f5",
        borderRadius: "1.5rem",
        maxWidth: "1120px",
        marginInline: "auto",
        boxShadow: "0 -12px 35px rgba(15,23,42,0.75)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1fr)",
          gap: "2.2rem",
          alignItems: "flex-start",
        }}
      >
        {/* BRAND + DESCRIPTION */}
        <div>
          <h2
            style={{
              margin: 0,
              marginBottom: "0.6rem",
              color: "white",
              fontSize: "1.4rem",
              fontWeight: 700,
            }}
          >
            PakUniInfo
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#a5b4fc",
              lineHeight: 1.7,
              maxWidth: "24rem",
            }}
          >
            Helping Pakistani students explore and compare universities with
            clear, trustworthy information — built as a student-led project.
          </p>

          {/* SOCIAL ICONS */}
          <div
            style={{
              display: "flex",
              gap: "0.7rem",
              marginTop: "0.9rem",
              flexWrap: "wrap",
            }}
          >
            <SocialIcon
              label="GitHub"
              href="https://github.com/your-username-or-repo"
            >
              {/* GitHub SVG */}
              <path d="M12 .297a12 12 0 0 0-3.794 23.398c.6.111.82-.261.82-.58 0-.287-.011-1.244-.016-2.255-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.311.469-2.382 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404 11.5 11.5 0 0 1 3.003.404c2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.839 1.235 1.91 1.235 3.221 0 4.61-2.807 5.624-5.48 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.901-.015 3.293 0 .322.217.697.825.579A12.004 12.004 0 0 0 12 .297z" />
            </SocialIcon>

            <SocialIcon
              label="LinkedIn"
              href="https://www.linkedin.com/in/your-profile"
            >
              {/* LinkedIn SVG */}
              <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4V8.5zm7.5 0h3.8v2.1h.1C12.6 9.3 14.3 8 16.9 8 22.1 8 23 11.3 23 15.6V24h-4v-7.1c0-1.7-.1-3.8-2.3-3.8-2.3 0-2.7 1.8-2.7 3.7V24h-4V8.5z" />
            </SocialIcon>

            <SocialIcon
              label="Twitter / X"
              href="https://x.com/your-handle"
            >
              {/* X / Twitter SVG */}
              <path d="M18.244 2H21.5l-7.26 8.29L22.5 22h-6.24l-4.35-5.26L6.9 22H3.64l7.77-8.86L2.5 2h6.33l3.93 4.8L18.24 2zm-1.1 17.01h1.77L7.92 4.9H6.03L17.14 19.01z" />
            </SocialIcon>
          </div>

          {/* PERSONAL CREDIT BADGE */}
          <div
            style={{
              marginTop: "1.2rem",
              padding: "0.55rem 0.9rem",
              background: "rgba(15,23,42,0.9)",
              borderRadius: "0.75rem",
              display: "inline-block",
              fontSize: "0.8rem",
              border: "1px solid rgba(148, 163, 184, 0.6)",
            }}
          >
            Made with <span style={{ color: "#f97316" }}>❤</span> by{" "}
            <span style={{ color: "#4ade80", fontWeight: 600 }}>
              Abdullah Mangrio
            </span>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3
            style={{
              fontSize: "1rem",
              marginBottom: "0.7rem",
              fontWeight: 600,
              color: "white",
            }}
          >
            Quick Links
          </h3>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              fontSize: "0.9rem",
              lineHeight: 1.7,
            }}
          >
            <li>
              <FooterLink href="/universities">Explore universities</FooterLink>
            </li>
            <li>
              <FooterLink href="/shortlist">Shortlist</FooterLink>
            </li>
            <li>
              <FooterLink href="/compare">Compare</FooterLink>
            </li>
            <li>
              <FooterLink href="/guidance">Guidance</FooterLink>
            </li>
            <li>
              <FooterLink href="/about">About PakUniInfo</FooterLink>
            </li>
          </ul>
        </div>

        {/* PROJECT INFO */}
        <div>
          <h3
            style={{
              fontSize: "1rem",
              marginBottom: "0.7rem",
              fontWeight: 600,
              color: "white",
            }}
          >
            Project
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              margin: 0,
              lineHeight: 1.7,
              color: "#e5e7eb",
            }}
          >
            PakUniInfo is a student-built tool to support university research,
            comparison and planning for students and families in Pakistan.
          </p>
          <p
            style={{
              fontSize: "0.8rem",
              marginTop: "0.9rem",
              color: "#64748b",
            }}
          >
            © {year} PakUniInfo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      style={{
        color: "#cbd5f5",
        textDecoration: "none",
        display: "inline-block",
        padding: "0.1rem 0",
        transition: "color 0.2s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#4ade80";
        e.currentTarget.style.transform = "translateX(2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#cbd5f5";
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      {children}
    </a>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      style={{
        width: "38px",
        height: "38px",
        borderRadius: "999px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 30% 0%, #22c55e, #0f172a 70%, #020617)",
        border: "1px solid rgba(148, 163, 184, 0.6)",
        boxShadow: "0 10px 20px rgba(22,163,74,0.6)",
        cursor: "pointer",
        transition:
          "transform 0.18s ease-out, box-shadow 0.18s ease-out, border-color 0.18s ease-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
        e.currentTarget.style.boxShadow = "0 14px 30px rgba(22,163,74,0.9)";
        e.currentTarget.style.borderColor = "#4ade80";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(22,163,74,0.6)";
        e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.6)";
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="#e5e7eb"
      >
        {children}
      </svg>
    </a>
  );
}
