import { useState } from "react";
export default function VercelDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#fff" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>Vercel Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Deployment</p>
        <Section title="1. Setup"><Code>{`npm install -g vercel\nvercel login\nvercel --version`}</Code></Section>
        <Section title="2. Deploy from CLI"><Code>{`vercel\nvercel --prod\nvercel --project-name my-app`}</Code></Section>
        <Section title="3. Deploy from Git"><Code>{`# 1. Push code to GitHub\ngit push origin main\n# 2. Import project at vercel.com\n# 3. Vercel auto-deploys on every push`}</Code></Section>
        <Section title="4. Environment Variables"><Code>{`vercel env add API_KEY\n# Or set in Vercel Dashboard\n# Settings > Environment Variables`}</Code></Section>
        <Section title="5. vercel.json Configuration"><Code>{`{\n    "rewrites": [\n        { "source": "/api/:path*", "destination": "/api/:path*" }\n    ],\n    "headers": [\n        {\n            "source": "/(.*)",\n            "headers": [\n                { "key": "X-Content-Type-Options", "value": "nosniff" }\n            ]\n        }\n    ]\n}`}</Code></Section>
      </div>
    </div>
  );
}
