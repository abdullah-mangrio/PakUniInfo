export default function About() {
  const outerCardStyle = {
    borderRadius: "1.25rem",
    background:
      "radial-gradient(circle at top left, #ffffff 0%, #f1f5f9 60%, #e2e8f0 100%)",
    padding: "2.4rem 2.6rem",
    boxShadow: "0 26px 70px rgba(15,23,42,0.7)",
    marginTop: "1.5rem",
  };

  const sectionHeadingStyle = {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "0.5rem",
  };

  const bodyTextStyle = {
    fontSize: "0.98rem",
    color: "#475569",
    lineHeight: 1.65,
    marginBottom: "1rem",
  };

  const listStyle = {
    paddingLeft: "1.1rem",
    margin: "0 0 1.4rem",
    color: "#475569",
    fontSize: "0.95rem",
    lineHeight: 1.6,
  };

  return (
    <div style={outerCardStyle}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1.1fr)",
          gap: "2.1rem",
          alignItems: "flex-start",
        }}
      >
        {/* Left: main content */}
        <section>
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#0f766e",
              marginBottom: "0.4rem",
            }}
          >
            About PakUniInfo
          </p>

          <h1
            style={{
              fontSize: "1.9rem",
              fontWeight: 800,
              color: "#020617",
              marginBottom: "0.8rem",
            }}
          >
            A simple way to explore universities in Pakistan.
          </h1>

          <p style={bodyTextStyle}>
            PakUniInfo is a personal project built to help students, parents,
            and teachers quickly explore universities across Pakistan. Instead
            of jumping between dozens of tabs and websites, you can search,
            filter, and review key information in one place.
          </p>

          <p style={bodyTextStyle}>
            The focus is on early-stage guidance for 1st and 2nd year students
            (FSc, ICS, A-levels) who are still discovering options. It&apos;s
            not an official ranking or admissions portal — it&apos;s a helper
            tool to start the conversation about &quot;Where could I study
            next?&quot;
          </p>

          <h2 style={sectionHeadingStyle}>What you can do here</h2>

          <ul style={listStyle}>
            <li>Browse universities with clean, readable cards.</li>
            <li>
              Filter by name, province, city, and programs (e.g. BSCS, BBA,
              MBBS).
            </li>
            <li>Sort by ranking or by name to quickly scan the list.</li>
            <li>Open a detailed page for each university.</li>
            <li>
              Save universities to a personal shortlist on your device to
              compare later.
            </li>
            <li>
              Use the Guidance page for a first version of AI-style
              recommendations based on marks and interests.
            </li>
          </ul>

          <h2 style={sectionHeadingStyle}>Who this is for</h2>

          <ul style={listStyle}>
            <li>
              <strong>Students</strong> who want a quick way to see relevant
              universities and programs.
            </li>
            <li>
              <strong>Parents</strong> who want clearer information to discuss
              options with their children.
            </li>
            <li>
              <strong>Teachers &amp; counselors</strong> who need a simple place
              to point students toward when talking about higher education.
            </li>
          </ul>
        </section>

        {/* Right: project / tech info */}
        <aside
          style={{
            borderRadius: "1.1rem",
            padding: "1.4rem 1.6rem",
            background:
              "radial-gradient(circle at 0% 0%, #e0f2fe 0, #1f2937 42%, #020617 100%)",
            color: "white",
            boxShadow: "0 22px 55px rgba(15,23,42,0.9)",
          }}
        >
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              marginBottom: "0.75rem",
            }}
          >
            Project details
          </h2>

          <p
            style={{
              fontSize: "0.9rem",
              color: "#e5e7eb",
              marginBottom: "0.7rem",
              lineHeight: 1.55,
            }}
          >
            This is a student-built project and my first full-stack application.
            The goal is to learn how real products are designed and developed
            while creating something helpful for Pakistani students.
          </p>

          <div
            style={{
              marginBottom: "0.85rem",
              fontSize: "0.88rem",
              color: "#e5e7eb",
            }}
          >
            <p
              style={{
                margin: "0 0 0.35rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "0.78rem",
                color: "#a5b4fc",
              }}
            >
              Tech stack
            </p>
            <ul style={{ margin: 0, paddingLeft: "1rem" }}>
              <li>React (Vite) frontend with React Router.</li>
              <li>Node.js &amp; Express.js backend.</li>
              <li>MongoDB for storing university data.</li>
              <li>REST API with filtering, sorting &amp; pagination.</li>
              <li>
                Local shortlist &amp; compare using browser storage (no login
                needed).
              </li>
            </ul>
          </div>

          <div
            style={{
              marginBottom: "0.85rem",
              fontSize: "0.88rem",
              color: "#e5e7eb",
            }}
          >
            <p
              style={{
                margin: "0 0 0.35rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "0.78rem",
                color: "#a5b4fc",
              }}
            >
              Roadmap
            </p>
            <ul style={{ margin: 0, paddingLeft: "1rem" }}>
              <li>Richer university data (fees, admission info, etc.).</li>
              <li>
                Smarter AI-based guidance to suggest universities based on
                interests and marks.
              </li>
              <li>
                Admin tools with authentication to safely manage the database.
              </li>
            </ul>
          </div>

          <p
            style={{
              fontSize: "0.78rem",
              color: "#cbd5f5",
              lineHeight: 1.5,
              borderTop: "1px solid rgba(148,163,184,0.4)",
              paddingTop: "0.7rem",
              marginTop: "0.8rem",
            }}
          >
            Disclaimer: Information shown here may not always be complete or
            up-to-date. Always confirm details from the official university
            website or admissions office before making a decision.
          </p>
        </aside>
      </div>
    </div>
  );
}
