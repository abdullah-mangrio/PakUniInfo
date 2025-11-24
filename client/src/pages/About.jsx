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
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#0f766e",
            marginBottom: "0.5rem",
          }}
        >
          About PakUniInfo
        </p>

        <h1
          style={{
            fontSize: "2rem",
            lineHeight: 1.25,
            fontWeight: 800,
            color: "#020617",
            marginBottom: "1rem",
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
          jumping between dozens of different websites, the idea is to have one
          place where you can:
        </p>

        <ul
          style={{
            fontSize: "0.95rem",
            color: "#475569",
            lineHeight: 1.6,
            paddingLeft: "1.3rem",
            marginBottom: "1rem",
          }}
        >
          <li>Browse universities by city, province and programs.</li>
          <li>See a quick snapshot of what each university offers.</li>
          <li>Shortlist interesting options to revisit later.</li>
          <li>
            Compare multiple universities side-by-side before making decisions.
          </li>
        </ul>

        <p
          style={{
            fontSize: "0.95rem",
            color: "#475569",
            lineHeight: 1.6,
            marginBottom: "1rem",
          }}
        >
          This is not an official portal or ranking system. It doesn&apos;t
          replace guidance from teachers, counsellors, or official university
          websites. Instead, it tries to be a clean, friendly starting point for
          exploring &quot;What options do I even have?&quot;
        </p>

        <h2
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: "0.5rem",
          }}
        >
          Who is this for?
        </h2>

        <p
          style={{
            fontSize: "0.95rem",
            color: "#475569",
            lineHeight: 1.6,
            marginBottom: "0.8rem",
          }}
        >
          PakUniInfo is mainly designed for:
        </p>

        <ul
          style={{
            fontSize: "0.95rem",
            color: "#475569",
            lineHeight: 1.6,
            paddingLeft: "1.3rem",
            marginBottom: "1rem",
          }}
        >
          <li>
            Students in FSc, ICS, A-levels and similar streams who are trying to
            understand what universities exist in Pakistan.
          </li>
          <li>
            Parents who want a simple overview of options for their children.
          </li>
          <li>
            Teachers and counsellors who want a quick reference to show examples
            of universities in different cities.
          </li>
        </ul>

        <p
          style={{
            fontSize: "0.95rem",
            color: "#475569",
            lineHeight: 1.6,
            marginBottom: "1rem",
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
          How accurate is the data?
        </h2>

        <p
          style={{
            fontSize: "0.95rem",
            color: "#475569",
            lineHeight: 1.6,
            marginBottom: "1rem",
          }}
        >
          Data about universities (programs, fees, admission information, etc.)
          can change frequently. PakUniInfo is a static project that tries to
          provide a basic overview, but it may not always be fully up-to-date.
          For any final decision, you should always:
        </p>

        <ul
          style={{
            fontSize: "0.95rem",
            color: "#475569",
            lineHeight: 1.6,
            paddingLeft: "1.3rem",
            marginBottom: "1rem",
          }}
        >
          <li>Visit the official university website.</li>
          <li>Check their latest admission advertisement or prospectus.</li>
          <li>Confirm fee structures and deadlines directly with the university.</li>
        </ul>

        <p
          style={{
            fontSize: "0.95rem",
            color: "#475569",
            lineHeight: 1.6,
            marginBottom: 0,
          }}
        >
          Think of PakUniInfo as a friendly first step — not the final answer.
        </p>
      </section>

      {/* Right: sidebar / project info */}
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
          Project snapshot
        </h2>

        <p
          style={{
            fontSize: "0.9rem",
            color: "#e5e7eb",
            lineHeight: 1.6,
            marginBottom: "0.9rem",
          }}
        >
          PakUniInfo is built as a student portfolio project — a practical way
          to learn the MERN stack while building something useful for other
          students in Pakistan.
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
              More filters and smarter guidance to suggest universities based on
              interests and marks.
            </li>
            <li>Admin tools to manage and update the database.</li>
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
            About the creator
          </p>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            PakUniInfo was designed and developed by{" "}
            <span style={{ fontWeight: 600, color: "#4ade80" }}>
              Abdullah Mangrio
            </span>{" "}
            as a portfolio project to support students across Pakistan.
          </p>
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
