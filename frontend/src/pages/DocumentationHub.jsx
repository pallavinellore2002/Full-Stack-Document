import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DocumentationHub() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const searchRedirect = (query) => {
    const q = query.toLowerCase().trim();
    const redirects = {
      html: "/html",
      css: "/css",
      javascript: "/javascript",
      js: "/javascript",
      react: "/react",
      typescript: "/typescript",
      ts: "/typescript",
      python: "/python",
      django: "/django",
      fastapi: "/fastapi",
      node: "/nodejs",
      nodejs: "/nodejs",
      express: "/express",
      sqlite: "/sqlite",
      mysql: "/mysql",
      postgresql: "/postgresql",
      postgres: "/postgresql",
      mongodb: "/mongodb",
      mongo: "/mongodb",
      redis: "/redis",
      aws: "/aws",
      vercel: "/vercel",
      netlify: "/netlify",
      docker: "/docker",
      postman: "/postman",
      github: "/github",
      git: "/git-basics",
      "git basics": "/git-basics",
      "github actions": "/github-actions"
    };
    if (redirects[q]) {
      navigate(redirects[q]);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      searchRedirect(searchQuery);
    }
  };

  const theme = {
    bg: darkMode ? "#0f172a" : "#f8fafc",
    text: darkMode ? "#e2e8f0" : "#1e293b",
    card: darkMode ? "#1e293b" : "#ffffff",
    cardBorder: darkMode ? "#334155" : "#e2e8f0",
    muted: darkMode ? "#94a3b8" : "#64748b",
    code: darkMode ? "#334155" : "#e2e8f0",
    footer: darkMode ? "#1e293b" : "#f1f5f9",
    input: darkMode ? "#1e293b" : "#ffffff",
    inputBorder: darkMode ? "#334155" : "#cbd5e1"
  };

  const sections = {
    frontend: {
      title: "Frontend Development",
      color: "#f093fb",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      description: "Frontend development is the art of creating what users see and interact with on websites and web applications. It involves building the visual elements, layouts, and interactive features that make websites engaging and functional.",
      technologies: [
        { name: "HTML", desc: "Structure of web pages", link: "/html" },
        { name: "CSS", desc: "Styling and layout", link: "/css" },
        { name: "React", desc: "UI component library", link: "/react" },
        { name: "JavaScript", desc: "Web interactivity", link: "/javascript" },
        { name: "TypeScript", desc: "Typed JavaScript", link: "/typescript" }
      ]
    },
    backend: {
      title: "Backend Development",
      color: "#4facfe",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      description: "Backend development handles everything that happens behind the scenes on a website or application. It manages server-side logic, databases, user authentication, and API integrations.",
      technologies: [
        { name: "Python", desc: "Versatile programming language", link: "/python" },
        { name: "Django", desc: "Full-stack web framework", link: "/django" },
        { name: "FastAPI", desc: "Modern API framework", link: "/fastapi" },
        { name: "Node.js", desc: "JavaScript runtime", link: "/nodejs" },
        { name: "Express.js", desc: "Web framework for Node", link: "/express" }
      ]
    },
    database: {
      title: "Database Management",
      color: "#43e97b",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      description: "Databases are organized systems for storing, managing, and retrieving data efficiently. They serve as the backbone of any application, storing user information, content, settings, and more.",
      technologies: [
        { name: "SQLite", desc: "Lightweight, file-based DB", link: "/sqlite" },
        { name: "MySQL", desc: "Popular relational DB", link: "/mysql" },
        { name: "PostgreSQL", desc: "Advanced open-source DB", link: "/postgresql" },
        { name: "MongoDB", desc: "NoSQL document DB", link: "/mongodb" },
        { name: "Redis", desc: "In-memory data store", link: "/redis" }
      ]
    },
    deployment: {
      title: "Deployment & Cloud",
      color: "#fa709a",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      description: "Deployment is the process of making your application available to users on the internet. It involves setting up servers, configuring environments, managing domains, and ensuring your app runs reliably and securely.",
      technologies: [
        { name: "AWS", desc: "Amazon cloud services", link: "/aws" },
        { name: "Vercel", desc: "Frontend cloud platform", link: "/vercel" },
        { name: "Netlify", desc: "Static site hosting", link: "/netlify" },
        { name: "Docker", desc: "Container platform", link: "/docker" },
        { name: "Postman", desc: "API testing tool", link: "/postman" }
      ]
    },
    github: {
      title: "GitHub & Version Control",
      color: "#a8edea",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      description: "GitHub is a platform for version control and collaboration that helps developers track changes in their code, work together on projects, and share their work with the world. It uses Git to manage different versions of code.",
      technologies: [
        { name: "GitHub Guide", desc: "Complete GitHub tutorial", link: "/github" },
        { name: "Git Basics", desc: "Version control fundamentals", link: "/git-basics" },
        { name: "GitHub Actions", desc: "CI/CD automation", link: "/github-actions" }
      ]
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: theme.text, transition: "all 0.3s ease" }}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          background: theme.card,
          border: `1px solid ${theme.cardBorder}`,
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          cursor: "pointer",
          fontSize: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div style={{ textAlign: "center", padding: "60px 20px 40px", background: darkMode ? "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)" : "linear-gradient(180deg, #e2e8f0 0%, #f8fafc 100%)" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "10px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Developer Documentation Hub
        </h1>
        <p style={{ color: theme.muted, marginBottom: "10px", fontSize: "1.1rem" }}>
          Complete guides from setup to advanced concepts
        </p>
        <h2 style={{ fontSize: "2rem", color: darkMode ? "#f8fafc" : "#1e293b", marginBottom: "5px" }}>
          Learn Without Limits
        </h2>
        <p style={{ color: theme.muted, marginBottom: "30px", fontSize: "1.1rem" }}>
          Build skills with top courses
        </p>

        <div style={{ maxWidth: "500px", margin: "0 auto 40px" }}>
          <input
            type="text"
            placeholder="Search documentation (HTML, CSS, Python, React...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            style={{
              width: "100%",
              padding: "15px 20px",
              fontSize: "1rem",
              borderRadius: "50px",
              border: `2px solid ${theme.inputBorder}`,
              background: theme.input,
              color: theme.text,
              outline: "none"
            }}
          />
        </div>

        {!activeSection && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", maxWidth: "1000px", margin: "0 auto" }}>
            {Object.keys(sections).map((key) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                style={{
                  padding: "25px 20px",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  background: sections[key].gradient,
                  color: key === "github" ? "#333" : "white",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-5px)";
                  e.target.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                {sections[key].title}
              </button>
            ))}
          </div>
        )}
      </div>

      {activeSection && (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
          <div style={{ background: theme.card, borderRadius: "16px", padding: "30px", marginBottom: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "1.8rem", color: darkMode ? "#f8fafc" : "#1e293b" }}>{sections[activeSection].title}</h2>
              <button
                onClick={() => setActiveSection(null)}
                style={{ background: "#ef4444", color: "white", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}
              >
                Close
              </button>
            </div>
            <p style={{ color: theme.muted, marginBottom: "25px", lineHeight: "1.6" }}>
              {sections[activeSection].description}
            </p>
            <h3 style={{ marginBottom: "15px", color: sections[activeSection].color }}>Technologies & Frameworks</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px" }}>
              {sections[activeSection].technologies.map((tech) => (
                <Link
                  key={tech.name}
                  to={tech.link}
                  style={{
                    background: theme.cardBorder,
                    padding: "20px",
                    borderRadius: "10px",
                    textAlign: "center",
                    textDecoration: "none",
                    color: theme.text,
                    transition: "all 0.3s ease",
                    display: "block"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = darkMode ? "#475569" : "#cbd5e1";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = theme.cardBorder;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <h3 style={{ marginBottom: "8px", fontSize: "1.1rem" }}>{tech.name}</h3>
                  <p style={{ fontSize: "0.85rem", color: theme.muted }}>{tech.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ background: theme.footer, padding: "40px 20px", marginTop: "60px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "30px" }}>
          <div>
            <h3 style={{ color: "#f093fb", marginBottom: "15px", fontSize: "1.2rem" }}>Frontend</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "8px" }}><Link to="/html" style={{ color: theme.muted, textDecoration: "none" }}>HTML</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/css" style={{ color: theme.muted, textDecoration: "none" }}>CSS</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/react" style={{ color: theme.muted, textDecoration: "none" }}>React</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/javascript" style={{ color: theme.muted, textDecoration: "none" }}>JavaScript</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/typescript" style={{ color: theme.muted, textDecoration: "none" }}>TypeScript</Link></li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: "#4facfe", marginBottom: "15px", fontSize: "1.2rem" }}>Backend</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "8px" }}><Link to="/python" style={{ color: theme.muted, textDecoration: "none" }}>Python</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/django" style={{ color: theme.muted, textDecoration: "none" }}>Django</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/fastapi" style={{ color: theme.muted, textDecoration: "none" }}>FastAPI</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/nodejs" style={{ color: theme.muted, textDecoration: "none" }}>Node.js</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/express" style={{ color: theme.muted, textDecoration: "none" }}>Express.js</Link></li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: "#43e97b", marginBottom: "15px", fontSize: "1.2rem" }}>Database</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "8px" }}><Link to="/sqlite" style={{ color: theme.muted, textDecoration: "none" }}>SQLite</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/mysql" style={{ color: theme.muted, textDecoration: "none" }}>MySQL</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/postgresql" style={{ color: theme.muted, textDecoration: "none" }}>PostgreSQL</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/mongodb" style={{ color: theme.muted, textDecoration: "none" }}>MongoDB</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/redis" style={{ color: theme.muted, textDecoration: "none" }}>Redis</Link></li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: "#fa709a", marginBottom: "15px", fontSize: "1.2rem" }}>Deployment</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "8px" }}><Link to="/aws" style={{ color: theme.muted, textDecoration: "none" }}>AWS</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/vercel" style={{ color: theme.muted, textDecoration: "none" }}>Vercel</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/netlify" style={{ color: theme.muted, textDecoration: "none" }}>Netlify</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/docker" style={{ color: theme.muted, textDecoration: "none" }}>Docker</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/postman" style={{ color: theme.muted, textDecoration: "none" }}>Postman</Link></li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: "#a8edea", marginBottom: "15px", fontSize: "1.2rem" }}>GitHub</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "8px" }}><Link to="/github" style={{ color: theme.muted, textDecoration: "none" }}>GitHub Guide</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/git-basics" style={{ color: theme.muted, textDecoration: "none" }}>Git Basics</Link></li>
              <li style={{ marginBottom: "8px" }}><Link to="/github-actions" style={{ color: theme.muted, textDecoration: "none" }}>GitHub Actions</Link></li>
            </ul>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "40px", paddingTop: "20px", borderTop: `1px solid ${theme.cardBorder}`, color: theme.muted }}>
          <p>© 2026 Full Stack Documents. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
