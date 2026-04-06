import { useState } from "react";
export default function PostmanDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#ff6c37" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>Postman Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced API Testing</p>
        <Section title="1. Setup"><p style={{ color: t.muted }}>Download from postman.com/downloads. Available for Windows, macOS, and Linux.</p></Section>
        <Section title="2. Making Requests"><Code>{`# GET Request\n1. Select GET method\n2. Enter URL: https://api.example.com/users\n3. Click Send\n\n# POST Request\n1. Select POST method\n2. Go to Body > raw > JSON\n3. Enter: { "name": "John" }\n4. Click Send`}</Code></Section>
        <Section title="3. Environment Variables"><Code>{`# Create Environment\n1. Click Environments (left sidebar)\n2. Create new environment\n3. Add variables:\n   - baseUrl: https://api.example.com\n   - token: your-auth-token\n\n# Use in requests\nGET {{baseUrl}}/users\nAuthorization: Bearer {{token}}`}</Code></Section>
        <Section title="4. Tests"><Code>{`pm.test("Status is 200", function () {\n    pm.response.to.have.status(200);\n});\n\npm.test("Has name", function () {\n    const json = pm.response.json();\n    pm.expect(json.name).to.eql("John");\n});`}</Code></Section>
        <Section title="5. Pre-request Scripts"><Code>{`pm.environment.set("timestamp", Date.now());\n\nconst randomId = Math.random().toString(36).substring(7);\npm.environment.set("randomId", randomId);`}</Code></Section>
      </div>
    </div>
  );
}
