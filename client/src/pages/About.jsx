export default function About() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1.1fr)",
        gap: "2rem",
        alignItems: "flex-start",
      }}
    >
      {/* Left: main content */}
      <section>
        <p
          style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.09em",
            color: "#0f766e",
            marginBottom: "0.5rem",
          }}
        >
          About PakUniInfo
        </p>

        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: 800,
            color: "#0f172a",
            marginBottom: "0.75rem",
          }}
        >
          A simple way to explore universities in Pakistan.
        </h1>

        <p
          style={{
            fontSize: "0.98rem",
            color: "#475569",
            lineHeight: 1.6,
            marginBottom: "1rem",
          }}
        >
          PakUniInfo is a personal project built to help students, parents, and
          teachers quickly explore universities across Pakistan. Instead of
          jumping between dozens of tabs and websites, you can search, filter,
          and review key information in one place.
        </p>

        <p
          style={{
            fontSize: "0.98rem",
            color: "#475569",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
          }}
        >
          The focus is on early-stage guidance for 1st and 2nd year students
          (FSc, ICS, A-levels) who are still discovering options. It&apos;s not
          an official ranking or admissions portal — it&apos;s a helper tool to
          start the conversation about &quot;Where could I study next?&quot;
        </p>

        <h2
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: "0.5rem",
          }}
        >
          What you can do here
        </h2>

        <ul
          style={{
            paddingLeft: "1.1rem",
            margin: "0 0 1.5rem",
            color: "#475569",
            fontSize: "0.95rem",
            lineHeight: 1.6,
          }}
        >
          <li>Browse universities with clean, readable cards.</li>
          <li>
            Filter by name, province, city, and programs (e.g. BSCS, BBA,
            MBBS).
          </li>
          <li>Sort by ranking or by name to quickly scan the list.</li>
          <li>Open a detailed page for each university.</li>
          <li>
            Save universities to a personal shortlist on your device to compare
            later.
          </li>
        </ul>

        <h2
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: "0.5rem",
          }}
        >
          Who this is for
        </h2>

        <ul
          style={{
            paddingLeft: "1.1rem",
            margin: "0 0 1.5rem",
            color: "#475569",
            fontSize: "0.95rem",
            lineHeight: 1.6,
          }}
        >
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
          borderRadius: "1rem",
          padding: "1.25rem 1.5rem",
          backgroundColor: "#0f172a",
          color: "white",
          boxShadow: "0 16px 35px rgba(15,23,42,0.7)",
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
            marginBottom: "0.75rem",
            lineHeight: 1.5,
          }}
        >
          This is a student-built project and my first full-stack application.
          The goal is to learn how real products are designed and developed
          while creating something helpful for Pakistani students.
        </p>

        <div
          style={{
            marginBottom: "0.9rem",
            fontSize: "0.88rem",
            color: "#e5e7eb",
          }}
        >
          <p
            style={{
              margin: "0 0 0.35rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontSize: "0.8rem",
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
          </ul>
        </div>

        <div
          style={{
            marginBottom: "0.9rem",
            fontSize: "0.88rem",
            color: "#e5e7eb",
          }}
        >
          <p
            style={{
              margin: "0 0 0.35rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontSize: "0.8rem",
              color: "#a5b4fc",
            }}
          >
            Roadmap
          </p>
          <ul style={{ margin: 0, paddingLeft: "1rem" }}>
            <li>Richer university data (fees, admission info, etc.).</li>
            <li>
              AI-based guidance to suggest universities based on interests and
              marks.
            </li>
            <li>Admin tools to manage and update the database.</li>
          </ul>
        </div>

        <p
          style={{
            fontSize: "0.78rem",
            color: "#cbd5f5",
            lineHeight: 1.5,
          }}
        >
          Disclaimer: Information shown here may not always be complete or
          up-to-date. Always confirm details from the official university
          website or admissions office before making a decision.
        </p>
      </aside>
    </div>
  );
}
