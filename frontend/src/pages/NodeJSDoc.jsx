import { useState } from "react";
export default function NodeJSDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#68a063" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>Node.js Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Concepts</p>
        <Section title="1. Setup and Installation"><Code>{`# Download from https://nodejs.org\nnode --version\nnpm --version`}</Code></Section>
        <Section title="2. Hello World"><Code>{`// app.js\nconsole.log("Hello, Node.js!");\n// Run: node app.js`}</Code></Section>
        <Section title="3. Modules"><Code>{`const fs = require("fs");\nconst path = require("path");\nconst http = require("http");\n\n// Custom module\nmodule.exports = {\n    add: (a, b) => a + b\n};`}</Code></Section>
        <Section title="4. HTTP Server"><Code>{`const http = require("http");\nconst server = http.createServer((req, res) => {\n    res.statusCode = 200;\n    res.setHeader("Content-Type", "text/plain");\n    res.end("Hello, World!\\n");\n});\nserver.listen(3000, () => {\n    console.log("Server running on port 3000");\n});`}</Code></Section>
        <Section title="5. File System"><Code>{`const fs = require("fs");\n\n// Read file\nconst data = fs.readFileSync("file.txt", "utf8");\n\n// Write file\nfs.writeFileSync("output.txt", "Hello World!");\n\n// Async read\nfs.readFile("file.txt", "utf8", (err, data) => {\n    if (err) throw err;\n    console.log(data);\n});`}</Code></Section>
        <Section title="6. Express.js Basics"><Code>{`const express = require("express");\nconst app = express();\n\napp.use(express.json());\n\napp.get("/", (req, res) => {\n    res.json({ message: "Hello!" });\n});\n\napp.post("/users", (req, res) => {\n    res.status(201).json(req.body);\n});\n\napp.listen(3000);`}</Code></Section>
        <Section title="7. Environment Variables"><Code>{`require("dotenv").config();\nconst PORT = process.env.PORT || 3000;\nconst DB_HOST = process.env.DB_HOST;`}</Code></Section>
      </div>
    </div>
  );
}
