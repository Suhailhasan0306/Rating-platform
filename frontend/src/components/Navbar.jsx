import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  console.log("USER DATA =>", user);
  return (
    <nav
      style={{
        background: "#000",
        color: "#fff",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: 0 }}>Rating Platform</h2>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {user?.role === "ADMIN" && (
          <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>
            Admin Dashboard
          </Link>
        )}

        {user?.role === "STORE_OWNER" && (
          <Link to="/owner" style={{ color: "white", textDecoration: "none" }}>
            Owner Dashboard
          </Link>
        )}

        {user && (
          <Link to="/stores" style={{ color: "white", textDecoration: "none" }}>
            Stores
          </Link>
        )}
        {!user && (
          <>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
              Login
            </Link>

            <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
              Signup
            </Link>
          </>
        )}

        {user && (
          <button
            onClick={logout}
            style={{
              padding: "6px 14px",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              background: "red",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
