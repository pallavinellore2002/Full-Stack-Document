import { useState } from "react";
export default function HTMLDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#e34c26" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>HTML Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Concepts</p>
        <Section title="1. Setup and Extensions"><p style={{ color: t.muted }}>HTML files use the .html extension. Install VS Code and the Live Server extension for live preview.</p><Code>{`<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Hello World!</h1>\n</body>\n</html>`}</Code></Section>
        <Section title="2. Basic Elements"><Code>{`<h1>Heading 1</h1>\n<p>Paragraph text</p>\n<a href="https://google.com">Link</a>\n<img src="image.jpg" alt="Image">\n<ul>\n    <li>Item 1</li>\n    <li>Item 2</li>\n</ul>`}</Code></Section>
        <Section title="3. Forms"><Code>{`<form action="/submit" method="POST">\n    <input type="text" name="name" required>\n    <input type="email" name="email" required>\n    <input type="password" name="password">\n    <select name="country">\n        <option value="us">USA</option>\n    </select>\n    <button type="submit">Submit</button>\n</form>`}</Code></Section>
        <Section title="4. Semantic HTML5"><Code>{`<header>\n    <nav>\n        <a href="/">Home</a>\n    </nav>\n</header>\n<main>\n    <article>\n        <h2>Article Title</h2>\n        <p>Content...</p>\n    </article>\n    <aside>Sidebar</aside>\n</main>\n<footer>Copyright 2024</footer>`}</Code></Section>
        <Section title="5. Multimedia"><Code>{`<video controls width="500">\n    <source src="video.mp4" type="video/mp4">\n</video>\n<audio controls>\n    <source src="audio.mp3" type="audio/mpeg">\n</audio>\n<iframe src="https://example.com" width="100%" height="400"></iframe>`}</Code></Section>
        <Section title="6. SVG"><Code>{`<svg width="200" height="200">\n    <rect x="10" y="10" width="100" height="50" fill="blue"/>\n    <circle cx="100" cy="100" r="40" fill="red"/>\n    <text x="50" y="150" font-size="20">SVG Text</text>\n</svg>`}</Code></Section>
      </div>
    </div>
  );
}
