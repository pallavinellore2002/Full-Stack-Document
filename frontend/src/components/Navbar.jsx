import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const authenticated = authAPI.isAuthenticated();
    setIsAuthenticated(authenticated);
    if (authenticated) {
      setUser(authAPI.getCurrentUser());
    }
  }, []);

  const handleLogout = async () => {
    await authAPI.logout();
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <nav style={{
      background: darkMode 
        ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" 
        : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      transition: "background 0.3s ease"
    }}>
      <Link to="/" style={{
        textDecoration: "none",
        color: darkMode ? "white" : "#1e293b",
        fontSize: "1.5rem",
        fontWeight: "700",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        transition: "color 0.3s ease"
      }}>
        <span style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "8px 12px",
          borderRadius: "8px",
          fontSize: "1.2rem"
        }}>
          📚
        </span>
        <span>LearnHub</span>
      </Link>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link to="/" style={{
          color: darkMode ? "#e2e8f0" : "#374151",
          textDecoration: "none",
          padding: "8px 16px",
          borderRadius: "8px",
          transition: "background 0.3s"
        }}
        onMouseEnter={(e) => e.target.style.background = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}
        onMouseLeave={(e) => e.target.style.background = "transparent"}
        >
          Home
        </Link>

        {isAuthenticated ? (
          <>
            <span style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
              Welcome, {user?.username}
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "background 0.3s"
              }}
              onMouseEnter={(e) => e.target.style.background = "#dc2626"}
              onMouseLeave={(e) => e.target.style.background = "#ef4444"}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              color: darkMode ? "#e2e8f0" : "#374151",
              textDecoration: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              border: `2px solid ${darkMode ? "#667eea" : "#4f46e5"}`,
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#667eea";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = darkMode ? "#e2e8f0" : "#374151";
            }}
            >
              Sign In
            </Link>
            <Link to="/register" style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              textDecoration: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "600",
              transition: "transform 0.3s, box-shadow 0.3s"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
            >
              Sign Up
            </Link>
          </>
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: darkMode ? "#334155" : "#e2e8f0",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            marginLeft: "10px"
          }}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
