import { useState } from "react";
export default function TypeScriptDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#3178c6" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>TypeScript Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Concepts</p>
        <Section title="1. Setup and Installation"><p style={{ color: t.muted }}>TypeScript is a typed superset of JavaScript. Install it globally:</p><Code>{`npm install -g typescript\ntsc --version\ntsc --init`}</Code></Section>
        <Section title="2. Basic Types"><Code>{`let name: string = "John";\nlet age: number = 25;\nlet isActive: boolean = true;\nlet numbers: number[] = [1, 2, 3];\n\ninterface User {\n    name: string;\n    age: number;\n    email?: string;\n}`}</Code></Section>
        <Section title="3. Generics"><Code>{`function identity<T>(arg: T): T {\n    return arg;\n}\n\ninterface Box<T> {\n    content: T;\n}\n\nlet stringBox: Box<string> = { content: "hello" };`}</Code></Section>
        <Section title="4. Utility Types"><Code>{`interface User {\n    id: number;\n    name: string;\n    email: string;\n}\n\ntype UpdateUser = Partial<User>;\ntype UserPreview = Pick<User, "name" | "email">;\ntype SafeUser = Omit<User, "password">;`}</Code></Section>
        <Section title="5. Classes"><Code>{`class Animal {\n    constructor(public name: string) {}\n    speak(): string {\n        return this.name + " makes a sound";\n    }\n}\n\nclass Dog extends Animal {\n    speak(): string {\n        return this.name + " barks";\n    }\n}`}</Code></Section>
      </div>
    </div>
  );
}
