import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, user } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user?.role === "ADMIN") nav("/admin");
    else if (user?.role === "STORE_OWNER") nav("/owner");
    else if (user) nav("/stores");
  }, [user, nav]);

  const onSubmit = async (e) => {
  e.preventDefault();
  setMsg("");

  try {
  const u = await login(email, password);

  const role = u?.role || u?.user?.role;

  if (role === "ADMIN") nav("/admin");
  else if (role === "STORE_OWNER") nav("/owner");
  else nav("/stores");

} catch (err) {
  setMsg(err?.response?.data?.message || "Login failed");
}
};

return (
    <div style={{ minHeight: "80vh", display: "grid", placeItems: "center" }}>
      <form
        onSubmit={onSubmit}
        style={{
          width: 420,
          background: "#fff",
          padding: 24,
          borderRadius: 14,
          boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
        }}
      >
        <h2 style={{ margin: 0, textAlign: "center" }}>Login</h2>

        <div style={{ marginTop: 16 }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "1px solid #ddd",
            }}
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "1px solid #ddd",
            }}
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
            background: "#2563eb",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p style={{ marginTop: 12 }}>
          New user? <Link to="/signup">Signup here</Link>
        </p>
      </form>
    </div>
  );
}
