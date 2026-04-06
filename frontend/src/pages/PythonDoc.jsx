import { useState } from "react";
export default function PythonDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#3776ab" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>Python Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Concepts</p>
        <Section title="1. Setup"><Code>{`# Install Python from python.org\npython --version\n\n# Virtual environment\npython -m venv myenv\nsource myenv/bin/activate  # Mac/Linux\nmyenv\\Scripts\\activate  # Windows\n\npip install package-name`}</Code></Section>
        <Section title="2. Variables and Types"><Code>{`# String\nname = "John"\n\n# Integer\nage = 25\n\n# Float\nheight = 5.9\n\n# Boolean\nis_student = True\n\n# List\nfruits = ["apple", "banana"]\n\n# Dictionary\nperson = {"name": "John", "age": 25}`}</Code></Section>
        <Section title="3. Functions"><Code>{`def greet(name):\n    return f"Hello, {name}!"\n\n# Lambda\nadd = lambda a, b: a + b\n\n# *args and **kwargs\ndef print_all(*args, **kwargs):\n    print(args)\n    print(kwargs)`}</Code></Section>
        <Section title="4. Classes"><Code>{`class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def greet(self):\n        return f"Hello, I'm {self.name}"\n\n# Inheritance\nclass Student(Person):\n    def __init__(self, name, age, grade):\n        super().__init__(name, age)\n        self.grade = grade`}</Code></Section>
        <Section title="5. File Handling"><Code>{`# Read file\nwith open("file.txt", "r") as f:\n    content = f.read()\n\n# Write file\nwith open("file.txt", "w") as f:\n    f.write("Hello World!")\n\n# JSON\nimport json\nwith open("data.json", "r") as f:\n    data = json.load(f)`}</Code></Section>
        <Section title="6. Error Handling"><Code>{`try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")\nexcept Exception as e:\n    print(f"Error: {e}")\nfinally:\n    print("This always runs")`}</Code></Section>
      </div>
    </div>
  );
}
