import { useState } from "react";
export default function SQLiteDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#003b57" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>SQLite Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Concepts</p>
        <Section title="1. Setup"><p style={{ color: t.muted }}>SQLite is built into Python! No installation needed.</p><Code>{`import sqlite3\nconn = sqlite3.connect("mydatabase.db")\ncursor = conn.cursor()`}</Code></Section>
        <Section title="2. Creating Tables"><Code>{`cursor.execute("""\n    CREATE TABLE users (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        name TEXT NOT NULL,\n        email TEXT UNIQUE,\n        age INTEGER\n    )\n""")\nconn.commit()`}</Code></Section>
        <Section title="3. CRUD Operations"><Code>{`# Create\ncursor.execute("INSERT INTO users (name, email) VALUES (?, ?)", ("John", "john@test.com"))\nconn.commit()\n\n# Read\ncursor.execute("SELECT * FROM users")\nrows = cursor.fetchall()\n\n# Update\ncursor.execute("UPDATE users SET age = ? WHERE name = ?", (26, "John"))\nconn.commit()\n\n# Delete\ncursor.execute("DELETE FROM users WHERE id = ?", (1,))\nconn.commit()`}</Code></Section>
        <Section title="4. Using with Python"><Code>{`import sqlite3\nfrom contextlib import contextmanager\n\n@contextmanager\ndef get_db():\n    conn = sqlite3.connect("app.db")\n    conn.row_factory = sqlite3.Row\n    try:\n        yield conn\n    finally:\n        conn.close()\n\nwith get_db() as db:\n    cursor = db.execute("SELECT * FROM users")\n    for row in cursor:\n        print(row["name"], row["email"])`}</Code></Section>
      </div>
    </div>
  );
}
