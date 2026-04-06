import { useState } from "react";
export default function GitHubActionsDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#2088ff" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>GitHub Actions Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced CI/CD</p>
        <Section title="1. Setup"><p style={{ color: t.muted }}>No installation needed! Actions are defined in .github/workflows/ directory.</p><Code>{`mkdir -p .github/workflows\ntouch .github/workflows/ci.yml`}</Code></Section>
        <Section title="2. Simple Workflow"><Code>{`name: CI\non:\n  push:\n    branches: [ main ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v3\n    - name: Setup Node.js\n      uses: actions/setup-node@v3\n      with:\n        node-version: '18'\n    - name: Install dependencies\n      run: npm ci\n    - name: Run tests\n      run: npm test`}</Code></Section>
        <Section title="3. Workflow Triggers"><Code>{`# On push\non:\n  push:\n    branches: [ main, develop ]\n\n# On schedule (cron)\non:\n  schedule:\n    - cron: '0 0 * * *'\n\n# Manual trigger\non:\n  workflow_dispatch:`}</Code></Section>
        <Section title="4. Multiple Jobs"><Code>{`jobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm test\n  \n  build:\n    needs: test\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm run build\n  \n  deploy:\n    needs: build\n    runs-on: ubuntu-latest\n    if: github.ref == 'refs/heads/main'\n    steps:\n      - run: echo "Deploying..."`}</Code></Section>
        <Section title="5. Secrets"><Code>{`# Add secrets in GitHub:\n# Settings > Secrets and variables > Actions\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Deploy\n        env:\n          API_KEY: $\x7b\x7b secrets.API_KEY \x7d\x7d\n        run: echo "Deploying with API key"`}</Code></Section>
        <Section title="6. Matrix Strategy"><Code>{`jobs:\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        node-version: [16, 18, 20]\n    steps:\n      - uses: actions/setup-node@v3\n        with:\n          node-version: $\x7b\x7b matrix.node-version \x7d\x7d\n      - run: npm test`}</Code></Section>
      </div>
    </div>
  );
}
