import { useState } from "react";

export default function JavaScriptDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const theme = {
    bg: darkMode ? "#0f172a" : "#f8fafc",
    text: darkMode ? "#e2e8f0" : "#1e293b",
    card: darkMode ? "#1e293b" : "#ffffff",
    muted: darkMode ? "#94a3b8" : "#64748b",
    code: darkMode ? "#334155" : "#e2e8f0",
    accent: "#f7df1e"
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: theme.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1000, background: theme.card, border: "1px solid #334155", borderRadius: "50%", width: "50px", height: "50px", cursor: "pointer", fontSize: "1.5rem" }}>
        {darkMode ? "☀️" : "🌙"}
      </button>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: theme.accent, textDecoration: "none", display: "inline-block", marginBottom: "20px" }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "10px", color: theme.accent }}>JavaScript Complete Documentation</h1>
        <p style={{ textAlign: "center", color: theme.muted, marginBottom: "40px" }}>From Setup to Advanced Concepts</p>

        <div style={{ background: theme.card, borderRadius: "12px", padding: "25px", marginBottom: "25px", borderLeft: `4px solid ${theme.accent}` }}>
          <h2 style={{ color: theme.accent, marginBottom: "15px" }}>1. Setup and Installation</h2>
          <p style={{ color: theme.muted, lineHeight: 1.7 }}>JavaScript runs in every modern browser - no installation needed! For server-side JavaScript, install Node.js.</p>
          <pre style={{ background: "#0f172a", color: "#d4d4d4", padding: "15px", borderRadius: "8px", overflow: "auto" }}>
{`# Download from https://nodejs.org
# Verify installation
node --version
npm --version`}
          </pre>
        </div>

        <div style={{ background: theme.card, borderRadius: "12px", padding: "25px", marginBottom: "25px", borderLeft: `4px solid ${theme.accent}` }}>
          <h2 style={{ color: theme.accent, marginBottom: "15px" }}>2. Basic Examples</h2>
          <h3 style={{ color: "#f0c000", margin: "15px 0 10px" }}>2.1 Variables</h3>
          <pre style={{ background: "#0f172a", color: "#d4d4d4", padding: "15px", borderRadius: "8px", overflow: "auto" }}>
{`// let - block scoped, can be reassigned
let name = "John";
name = "Jane";

// const - block scoped, cannot be reassigned
const age = 25;`}
          </pre>
          <h3 style={{ color: "#f0c000", margin: "15px 0 10px" }}>2.2 Functions</h3>
          <pre style={{ background: "#0f172a", color: "#d4d4d4", padding: "15px", borderRadius: "8px", overflow: "auto" }}>
{`// Function declaration
function greet(name) {
    return "Hello, " + name + "!";
}

// Arrow function
const add = (a, b) => a + b;`}
          </pre>
          <h3 style={{ color: "#f0c000", margin: "15px 0 10px" }}>2.3 Arrays</h3>
          <pre style={{ background: "#0f172a", color: "#d4d4d4", padding: "15px", borderRadius: "8px", overflow: "auto" }}>
{`let fruits = ["apple", "banana", "orange"];

// Add element
fruits.push("grape");

// Map - transform each element
let upper = fruits.map(f => f.toUpperCase());

// Filter
let long = fruits.filter(f => f.length > 5);`}
          </pre>
        </div>

        <div style={{ background: theme.card, borderRadius: "12px", padding: "25px", marginBottom: "25px", borderLeft: `4px solid ${theme.accent}` }}>
          <h2 style={{ color: theme.accent, marginBottom: "15px" }}>3. Intermediate Examples</h2>
          <h3 style={{ color: "#f0c000", margin: "15px 0 10px" }}>3.1 DOM Manipulation</h3>
          <pre style={{ background: "#0f172a", color: "#d4d4d4", padding: "15px", borderRadius: "8px", overflow: "auto" }}>
{`// Select elements
const element = document.getElementById("myId");
const elements = document.querySelectorAll(".myClass");

// Change content
element.textContent = "New text";

// Add event listener
element.addEventListener("click", function() {
    alert("Clicked!");
});`}
          </pre>
          <h3 style={{ color: "#f0c000", margin: "15px 0 10px" }}>3.2 Promises</h3>
          <pre style={{ background: "#0f172a", color: "#d4d4d4", padding: "15px", borderRadius: "8px", overflow: "auto" }}>
{`// Fetch API
fetch("https://api.example.com/data")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));`}
          </pre>
        </div>

        <div style={{ background: theme.card, borderRadius: "12px", padding: "25px", marginBottom: "25px", borderLeft: `4px solid ${theme.accent}` }}>
          <h2 style={{ color: theme.accent, marginBottom: "15px" }}>4. Advanced Examples</h2>
          <h3 style={{ color: "#f0c000", margin: "15px 0 10px" }}>4.1 Async/Await</h3>
          <pre style={{ background: "#0f172a", color: "#d4d4d4", padding: "15px", borderRadius: "8px", overflow: "auto" }}>
{`async function fetchData() {
    try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
}`}
          </pre>
          <h3 style={{ color: "#f0c000", margin: "15px 0 10px" }}>4.2 Classes</h3>
          <pre style={{ background: "#0f172a", color: "#d4d4d4", padding: "15px", borderRadius: "8px", overflow: "auto" }}>
{`class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        return this.name + " makes a sound";
    }
}

class Dog extends Animal {
    speak() {
        return this.name + " barks";
    }
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
