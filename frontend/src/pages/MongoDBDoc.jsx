import { useState } from "react";
export default function MongoDBDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#47a248" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>MongoDB Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Concepts</p>
        <Section title="1. Setup"><Code>{`# macOS\nbrew install mongodb-community\nbrew services start mongodb-community\n\n# Linux\nsudo apt install mongodb\n\nmongosh`}</Code></Section>
        <Section title="2. CRUD Operations"><Code>{`// Create\ndb.users.insertOne({ name: "John", age: 25 })\ndb.users.insertMany([\n    { name: "Jane", age: 30 },\n    { name: "Bob", age: 35 }\n])\n\n// Read\ndb.users.find()\ndb.users.find({ age: { $gt: 25 } })\n\n// Update\ndb.users.updateOne({ name: "John" }, { $set: { age: 26 } })\n\n// Delete\ndb.users.deleteOne({ name: "Bob" })`}</Code></Section>
        <Section title="3. Aggregation"><Code>{`db.orders.aggregate([\n    { $match: { status: "completed" } },\n    { $group: { _id: "$customerId", total: { $sum: "$amount" } } },\n    { $sort: { total: -1 } },\n    { $limit: 10 }\n])`}</Code></Section>
        <Section title="4. Indexes"><Code>{`db.users.createIndex({ email: 1 })\ndb.users.createIndex({ email: 1 }, { unique: true })\ndb.users.createIndex({ name: 1, age: -1 })`}</Code></Section>
        <Section title="5. Using with Node.js"><Code>{`const { MongoClient } = require("mongodb");\n\nasync function main() {\n    const client = new MongoClient("mongodb://localhost:27017");\n    await client.connect();\n    const db = client.db("mydb");\n    const users = await db.collection("users").find({}).toArray();\n    console.log(users);\n    await client.close();\n}\nmain();`}</Code></Section>
      </div>
    </div>
  );
}
