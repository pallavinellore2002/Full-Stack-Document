import { useState } from "react";
export default function ExpressDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#fff" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>Express.js Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Concepts</p>
        <Section title="1. Setup"><Code>{`npm init -y\nnpm install express\nnpm install -D nodemon`}</Code></Section>
        <Section title="2. Hello World"><Code>{`const express = require("express");\nconst app = express();\n\napp.get("/", (req, res) => {\n    res.send("Hello, Express!");\n});\n\napp.listen(3000, () => {\n    console.log("Server running on port 3000");\n});`}</Code></Section>
        <Section title="3. Routing"><Code>{`app.get("/users", (req, res) => {\n    res.json({ users: [] });\n});\n\napp.post("/users", (req, res) => {\n    res.status(201).json({ message: "Created" });\n});\n\napp.put("/users/:id", (req, res) => {\n    res.json({ id: req.params.id });\n});\n\napp.delete("/users/:id", (req, res) => {\n    res.status(204).send();\n});`}</Code></Section>
        <Section title="4. Middleware"><Code>{`app.use(express.json());\napp.use(express.urlencoded({ extended: true }));\n\napp.use((req, res, next) => {\n    console.log(req.method, req.url);\n    next();\n});\n\napp.use((err, req, res, next) => {\n    console.error(err.stack);\n    res.status(500).json({ error: "Something went wrong!" });\n});`}</Code></Section>
        <Section title="5. Router"><Code>{`const router = express.Router();\nrouter.get("/", (req, res) => {\n    res.json({ message: "Users list" });\n});\napp.use("/api/users", router);`}</Code></Section>
        <Section title="6. Authentication Middleware"><Code>{`function authenticate(req, res, next) {\n    const token = req.headers.authorization;\n    if (!token) {\n        return res.status(401).json({ error: "Unauthorized" });\n    }\n    req.user = { id: 1, name: "John" };\n    next();\n}\napp.get("/protected", authenticate, (req, res) => {\n    res.json({ user: req.user });\n});`}</Code></Section>
      </div>
    </div>
  );
}
