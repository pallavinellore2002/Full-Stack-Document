import { useState } from "react";
export default function GitHubDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#58a6ff" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>GitHub Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Workflows</p>
        <Section title="1. Setup"><Code>{`# Install Git\nbrew install git  # macOS\nsudo apt install git  # Linux\n\n# Configure\ngit config --global user.name "Your Name"\ngit config --global user.email "your.email@example.com"`}</Code></Section>
        <Section title="2. Basic Commands"><Code>{`git init\ngit clone https://github.com/user/repo.git\ngit add .\ngit commit -m "Initial commit"\ngit push origin main\ngit pull origin main`}</Code></Section>
        <Section title="3. Branching"><Code>{`git branch feature\ngit checkout feature\ngit checkout -b new-feature\ngit merge feature\ngit branch -d feature`}</Code></Section>
        <Section title="4. SSH Keys"><Code>{`# Generate SSH key\nssh-keygen -t ed25519 -C "your.email@example.com"\n\n# Add to agent\nssh-add ~/.ssh/id_ed25519\n\n# Copy public key\ncat ~/.ssh/id_ed25519.pub\n# Add to GitHub: Settings > SSH and GPG keys`}</Code></Section>
        <Section title="5. Pull Requests"><Code>{`# Create PR via GitHub CLI\ngh pr create --title "Add feature" --body "Description"\n\n# List PRs\ngh pr list\n\n# Checkout PR\ngh pr checkout 123`}</Code></Section>
        <Section title="6. GitHub Pages"><Code>{`# Deploy static site\n# 1. Push code to GitHub\n# 2. Go to Settings > Pages\n# 3. Select source branch\n# 4. Site available at:\n#    https://username.github.io/repo-name`}</Code></Section>
      </div>
    </div>
  );
}
