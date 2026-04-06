import { useState } from "react";
export default function GitBasicsDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#f05032" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>Git Basics Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Version Control</p>
        <Section title="1. Setup"><Code>{`git --version\ngit config --global user.name "Your Name"\ngit config --global user.email "your.email@example.com"`}</Code></Section>
        <Section title="2. Getting Started"><Code>{`git init\ngit clone https://github.com/user/repo.git\ngit status\ngit add .\ngit commit -m "Initial commit"`}</Code></Section>
        <Section title="3. Branches"><Code>{`git branch\ngit branch feature\ngit checkout feature\ngit checkout -b new-feature\ngit merge feature\ngit branch -d feature`}</Code></Section>
        <Section title="4. Remote Repositories"><Code>{`git remote add origin https://github.com/user/repo.git\ngit push -u origin main\ngit pull origin main`}</Code></Section>
        <Section title="5. Stashing"><Code>{`git stash\ngit stash list\ngit stash pop\ngit stash apply`}</Code></Section>
        <Section title="6. Undoing Changes"><Code>{`git reset HEAD filename\ngit reset --soft HEAD~1\ngit revert commit-hash\ngit checkout -- filename`}</Code></Section>
      </div>
    </div>
  );
}
