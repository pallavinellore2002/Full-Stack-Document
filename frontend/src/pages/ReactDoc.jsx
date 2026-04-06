import { useState } from "react";
export default function ReactDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#61dafb" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>React Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Concepts</p>
        <Section title="1. Setup"><Code>{`npm create vite@latest my-app -- --template react\ncd my-app\nnpm install\nnpm run dev`}</Code></Section>
        <Section title="2. Components"><Code>{`function Welcome() {\n    return <h1>Hello, React!</h1>;\n}\n\nfunction App() {\n    return (\n        <div>\n            <Welcome />\n        </div>\n    );\n}`}</Code></Section>
        <Section title="3. Props"><Code>{`function Welcome(props) {\n    return <h1>Hello, {props.name}!</h1>;\n}\n\n<Welcome name="John" />`}</Code></Section>
        <Section title="4. State with useState"><Code>{`import { useState } from "react";\n\nfunction Counter() {\n    const [count, setCount] = useState(0);\n    return (\n        <div>\n            <p>Count: {count}</p>\n            <button onClick={() => setCount(count + 1)}>Increment</button>\n        </div>\n    );\n}`}</Code></Section>
        <Section title="5. useEffect"><Code>{`import { useEffect } from "react";\n\nuseEffect(() => {\n    fetch("https://api.example.com/data")\n        .then(res => res.json())\n        .then(data => setData(data));\n}, []);`}</Code></Section>
        <Section title="6. React Router"><Code>{`import { BrowserRouter, Routes, Route, Link } from "react-router-dom";\n\n<Routes>\n    <Route path="/" element={<Home />} />\n    <Route path="/about" element={<About />} />\n</Routes>`}</Code></Section>
      </div>
    </div>
  );
}
