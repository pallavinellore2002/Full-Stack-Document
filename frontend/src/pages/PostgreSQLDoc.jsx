import { useState } from "react";
export default function PostgreSQLDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#336791" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>PostgreSQL Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Concepts</p>
        <Section title="1. Setup"><Code>{`# macOS\nbrew install postgresql\nbrew services start postgresql\n\n# Linux\nsudo apt install postgresql\nsudo systemctl start postgresql\n\npsql -U postgres`}</Code></Section>
        <Section title="2. Creating Tables"><Code>{`CREATE DATABASE myapp;\n\\c myapp\n\nCREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(100) UNIQUE NOT NULL,\n    age INTEGER,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);`}</Code></Section>
        <Section title="3. CRUD Operations"><Code>{`-- Create\nINSERT INTO users (name, email) VALUES ('Bob', 'bob@test.com');\n\n-- Read\nSELECT * FROM users ORDER BY created_at DESC;\n\n-- Update\nUPDATE users SET age = 26 WHERE name = 'John';\n\n-- Delete\nDELETE FROM users WHERE id = 1;`}</Code></Section>
        <Section title="4. JOINs"><Code>{`CREATE TABLE posts (\n    id SERIAL PRIMARY KEY,\n    title VARCHAR(200),\n    user_id INTEGER REFERENCES users(id)\n);\n\nSELECT u.name, p.title FROM users u\nINNER JOIN posts p ON u.id = p.user_id;`}</Code></Section>
        <Section title="5. JSONB"><Code>{`CREATE TABLE products (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100),\n    attributes JSONB\n);\n\nINSERT INTO products (name, attributes) VALUES\n    ('Laptop', '{"brand": "Dell", "ram": "16GB"}');\n\nSELECT * FROM products WHERE attributes->>'brand' = 'Dell';`}</Code></Section>
        <Section title="6. Using with Python"><Code>{`import psycopg2\n\nconn = psycopg2.connect(\n    dbname="myapp", user="postgres",\n    password="password", host="localhost"\n)\ncursor = conn.cursor()\ncursor.execute("SELECT * FROM users")\nfor row in cursor:\n    print(row)\nconn.close()`}</Code></Section>
      </div>
    </div>
  );
}
