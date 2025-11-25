import { useState, useEffect } from "react";

export default function About() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile
          ? "minmax(0, 1fr)"
          : "minmax(0, 1.7fr) minmax(0, 1.1fr)",
        gap: isMobile ? "1.8rem" : "2rem",
        alignItems: "flex-start",
        boxSizing: "border-box",
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
            marginBottom: "0.4rem",
          }}
        >
          About PakUniInfo
        </p>

        <h1
          style={{
            fontSize: isMobile ? "1.7rem" : "1.9rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#020617",
            marginBottom: "0.75rem",
          }}
        >
          A small project to make university search less confusing.
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
          It&apos;s not an official platform from any university or government —
          it&apos;s a student-built tool designed to be simple, clean and easy
          to understand, especially for FSc / ICS / A-level students and their
          families.
        </p>

        {/* WHO IS THIS FOR */}
        <div
          style={{
            marginBottom: "1.4rem",
            padding: "1rem 1.1rem",
            borderRadius: "0.9rem",
            backgroundColor: "#e5e7eb",
            border: "1px solid #cbd5f5",
          }}
        >
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: "0.5rem",
            }}
          >
            Who is this for?
          </h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: "1.1rem",
              color: "#475569",
              fontSize: "0.95rem",
              lineHeight: 1.6,
            }}
          >
            <li>Students in FSc, ICS, I.Com and A-levels exploring options.</li>
            <li>
              Parents who want a clearer view of universities in different
              cities.
            </li>
            <li>
              Teachers / counsellors helping students shortlist and compare
              universities.
            </li>
          </ul>
        </div>

        {/* WHAT YOU CAN DO */}
        <div
          style={{
            marginBottom: "1.4rem",
            padding: "1rem 1.1rem",
            borderRadius: "0.9rem",
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
          }}
        >
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
              margin: "0 0 0.6rem",
              color: "#475569",
              fontSize: "0.95rem",
              lineHeight: 1.6,
            }}
          >
            <li>Browse universities and filter by city / province.</li>
            <li>See basic details, programs and ranking.</li>
            <li>Save favourites to a shortlist.</li>
            <li>Compare up to 3 universities side by side.</li>
            <li>Read simple guidance for students, parents and teachers.</li>
          </ul>
        </div>

        {/* HOW TO USE BEST */}
        <div
          style={{
            marginBottom: "0.5rem",
            padding: "1rem 1.1rem",
            borderRadius: "0.9rem",
            backgroundColor: "#eef2ff",
            border: "1px solid #c7d2fe",
          }}
        >
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#1e293b",
              marginBottom: "0.5rem",
            }}
          >
            How to use this site effectively
          </h2>
          <ol
            style={{
              margin: 0,
              paddingLeft: "1.1rem",
              color: "#1f2933",
              fontSize: "0.95rem",
              lineHeight: 1.6,
            }}
          >
            <li>Start on the Explore page and filter by city / province.</li>
            <li>Add universities that look interesting to your shortlist.</li>
            <li>
              Use the Compare page to see differences clearly (location,
              programs, ranking, etc.).
            </li>
            <li>
              Discuss the shortlist with parents / teachers and then visit
              official websites for final details.
            </li>
          </ol>
        </div>
      </section>

      {/* Right: project / tech info */}
      <aside
        style={{
          borderRadius: "1.1rem",
          padding: isMobile ? "1.3rem 1.2rem" : "1.5rem 1.5rem",
          background:
            "radial-gradient(circle at top left, #0f172a 0, #020617 40%, #111827 100%)",
          color: "white",
          boxShadow: "0 24px 60px rgba(15,23,42,0.9)",
          boxSizing: "border-box",
          marginTop: isMobile ? "0.1rem" : 0,
        }}
      >
        <div
          style={{
            marginBottom: "1rem",
            fontSize: "0.9rem",
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
            Behind the project
          </p>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            PakUniInfo is built as a portfolio project to practise full-stack
            development and solve a real problem students face when researching
            universities in Pakistan.
          </p>
        </div>

        <div
          style={{
            marginBottom: "1rem",
            fontSize: "0.9rem",
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
            Under the hood
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
            <li>Better mobile experience and more filters.</li>
            <li>Export / share shortlists with parents or counsellors.</li>
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
