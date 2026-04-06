import { useState } from "react";
export default function RedisDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#dc382d" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>Redis Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Concepts</p>
        <Section title="1. Setup"><Code>{`# macOS\nbrew install redis\nbrew services start redis\n\n# Linux\nsudo apt install redis-server\n\n# Docker\ndocker run -d -p 6379:6379 redis\n\nredis-cli`}</Code></Section>
        <Section title="2. String Operations"><Code>{`SET name "John"\nGET name\nSET session:user123 "active" EX 3600\nSET counter 0\nINCR counter\nINCRBY counter 5`}</Code></Section>
        <Section title="3. Hash Operations"><Code>{`HSET user:1 name "John" age 25 email "john@example.com"\nHGETALL user:1\nHGET user:1 name\nHINCRBY user:1 age 1`}</Code></Section>
        <Section title="4. List Operations"><Code>{`LPUSH tasks "task1"\nRPUSH tasks "task2"\nLPOP tasks\nRPOP tasks\nLRANGE tasks 0 -1`}</Code></Section>
        <Section title="5. Set Operations"><Code>{`SADD tags:post1 "javascript" "nodejs" "redis"\nSMEMBERS tags:post1\nSISMEMBER tags:post1 "javascript"\nSINTER tags:post1 tags:post2`}</Code></Section>
        <Section title="6. Sorted Sets"><Code>{`ZADD leaderboard 100 "player1"\nZADD leaderboard 200 "player2"\nZREVRANGE leaderboard 0 9 WITHSCORES\nZRANK leaderboard "player1"`}</Code></Section>
        <Section title="7. Using with Node.js"><Code>{`const redis = require("redis");\nconst client = redis.createClient();\nawait client.connect();\nawait client.set("key", "value");\nconst value = await client.get("key");\nawait client.set("session", "active", { EX: 3600 });`}</Code></Section>
      </div>
    </div>
  );
}
