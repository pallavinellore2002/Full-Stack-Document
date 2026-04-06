import { useState } from "react";
export default function CSSDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#264de4" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>CSS Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Concepts</p>
        <Section title="1. Setup"><p style={{ color: t.muted }}>CSS files use the .css extension. Link with: <link rel="stylesheet" href="styles.css" /></p></Section>
        <Section title="2. Selectors"><Code>{`/* Element */\np { color: blue; }\n\n/* Class */\n.highlight { background: yellow; }\n\n/* ID */\n#header { background: navy; }\n\n/* Pseudo-class */\na:hover { color: red; }`}</Code></Section>
        <Section title="3. Box Model"><Code>{`.box {\n    width: 300px;\n    padding: 20px;\n    border: 2px solid black;\n    margin: 20px;\n    box-sizing: border-box;\n}`}</Code></Section>
        <Section title="4. Flexbox"><Code>{`.container {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    flex-wrap: wrap;\n}`}</Code></Section>
        <Section title="5. Grid"><Code>{`.grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 20px;\n}`}</Code></Section>
        <Section title="6. Animations"><Code>{`@keyframes slideIn {\n    from { transform: translateX(-100%); }\n    to { transform: translateX(0); }\n}\n.animated { animation: slideIn 1s ease-out; }`}</Code></Section>
        <Section title="7. Media Queries"><Code>{`@media (min-width: 768px) {\n    .container { width: 750px; }\n}\n@media (min-width: 1024px) {\n    .container { width: 960px; }\n}`}</Code></Section>
      </div>
    </div>
  );
}
