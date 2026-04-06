import { useState } from "react";
export default function NetlifyDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#00c7b7" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>Netlify Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Deployment</p>
        <Section title="1. Setup"><Code>{`npm install -g netlify-cli\nnetlify login\nnetlify --version`}</Code></Section>
        <Section title="2. Deploy from CLI"><Code>{`netlify init\nnetlify deploy\nnetlify deploy --prod\nnetlify deploy --prod --dir=dist`}</Code></Section>
        <Section title="3. Deploy from Git"><Code>{`# 1. Push code to GitHub\n# 2. Import at app.netlify.com\n# 3. Set build command: npm run build\n# 4. Set publish directory: dist`}</Code></Section>
        <Section title="4. netlify.toml"><Code>{`[build]\n  command = "npm run build"\n  publish = "dist"\n\n[[redirects]]\n  from = "/api/*"\n  to = "/.netlify/functions/:splat"\n  status = 200`}</Code></Section>
        <Section title="5. Serverless Functions"><Code>{`// netlify/functions/hello.js\nexports.handler = async (event) => {\n    return {\n        statusCode: 200,\n        body: JSON.stringify({ message: "Hello!" })\n    };\n};`}</Code></Section>
      </div>
    </div>
  );
}
