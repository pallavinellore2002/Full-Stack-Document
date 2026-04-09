import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      await authAPI.register(registerData);
      navigate("/login");
    } catch (err) {
      // Axios error response contains the actual error from backend
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "white",
        borderRadius: "16px",
        padding: "40px",
        width: "100%",
        maxWidth: "450px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}>
        <h1 style={{
          textAlign: "center",
          color: "#1e293b",
          marginBottom: "10px",
          fontSize: "2rem"
        }}>
          Create Account
        </h1>
        <p style={{
          textAlign: "center",
          color: "#64748b",
          marginBottom: "30px"
        }}>
          Join us and start learning
        </p>

        {error && (
          <div style={{
            background: "#fee2e2",
            color: "#dc2626",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#374151",
              fontWeight: "500"
            }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "2px solid #e5e7eb",
                fontSize: "1rem",
                boxSizing: "border-box"
              }}
              placeholder="johndoe"
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#374151",
              fontWeight: "500"
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "2px solid #e5e7eb",
                fontSize: "1rem",
                boxSizing: "border-box"
              }}
              placeholder="you@example.com"
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#374151",
              fontWeight: "500"
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "2px solid #e5e7eb",
                fontSize: "1rem",
                boxSizing: "border-box"
              }}
              placeholder="••••••••"
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#374151",
              fontWeight: "500"
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "2px solid #e5e7eb",
                fontSize: "1rem",
                boxSizing: "border-box"
              }}
              placeholder="••••••••"
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#374151",
              fontWeight: "500"
            }}>
              I want to
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "2px solid #e5e7eb",
                fontSize: "1rem",
                boxSizing: "border-box",
                background: "white"
              }}
            >
              <option value="student">Learn as a Student</option>
              <option value="instructor">Teach as an Instructor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              marginBottom: "20px"
            }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={{
          textAlign: "center",
          color: "#64748b"
        }}>
          Already have an account?{" "}
          <Link to="/login" style={{
            color: "#667eea",
            textDecoration: "none",
            fontWeight: "600"
          }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
