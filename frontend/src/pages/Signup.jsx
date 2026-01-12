import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await signup({ name, email, password, role });
      nav("/login");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ minHeight: "80vh", display: "grid", placeItems: "center" }}>
      <form
        onSubmit={onSubmit}
        style={{
          width: 460,
          background: "#fff",
          padding: 24,
          borderRadius: 14,
          boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
        }}
      >
        <h2 style={{ margin: 0, textAlign: "center" }}>Signup</h2>

        <div style={{ marginTop: 16 }}>
          <input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd" }}
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd" }}
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd" }}
          >
            <option value="user">User</option>
            <option value="owner">Store Owner</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div style={{ marginTop: 12 }}>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd" }}
          />
        </div>

        {msg && <p style={{ color: "red", marginTop: 10 }}>{msg}</p>}

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: 14,
            padding: 12,
            border: "none",
            borderRadius: 10,
            background: "#16a34a",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Create Account
        </button>

        <p style={{ marginTop: 12 }}>
          Already have account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

