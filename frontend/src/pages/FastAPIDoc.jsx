import { useState } from "react";
export default function FastAPIDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#009688" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>FastAPI Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Concepts</p>
        <Section title="1. Setup"><Code>{`pip install fastapi uvicorn\n\n# main.py\nfrom fastapi import FastAPI\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"message": "Hello World"}\n\n# Run\nuvicorn main:app --reload`}</Code></Section>
        <Section title="2. Path Parameters"><Code>{`@app.get("/items/{item_id}")\ndef read_item(item_id: int):\n    return {"item_id": item_id}`}</Code></Section>
        <Section title="3. Query Parameters"><Code>{`@app.get("/search")\ndef search(q: str = None, limit: int = 10):\n    return {"query": q, "limit": limit}`}</Code></Section>
        <Section title="4. Request Body"><Code>{`from pydantic import BaseModel\n\nclass Item(BaseModel):\n    name: str\n    price: float\n    description: str = None\n\n@app.post("/items/")\ndef create_item(item: Item):\n    return {"item": item}`}</Code></Section>
        <Section title="5. Auto Docs"><p style={{ color: t.muted }}>FastAPI automatically generates interactive API docs:</p><Code>{`# Swagger UI\nhttp://localhost:8000/docs\n\n# ReDoc\nhttp://localhost:8000/redoc`}</Code></Section>
        <Section title="6. CORS"><Code>{`from fastapi.middleware.cors import CORSMiddleware\n\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=["*"],\n    allow_methods=["*"],\n    allow_headers=["*"],\n)`}</Code></Section>
      </div>
    </div>
  );
}
