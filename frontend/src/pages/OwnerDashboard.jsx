import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function OwnerDashboard() {
  const { logout } = useAuth();
  const [stores, setStores] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchMyStores = async () => {
    try {
      const res = await api.get("/owner/stores");
      setStores(res.data?.data || []);
      setMsg("");
    } catch (err) {
      console.log(err);
      setMsg(err?.response?.data?.message || "Failed to load stores");
    }
  };

  useEffect(() => {
    fetchMyStores();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Owner Dashboard</h2>
      </div>

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <h3 style={{ marginTop: 20 }}>My Stores</h3>

      {stores.length === 0 ? (
        <p>No stores found</p>
      ) : (
        stores.map((s) => (
          <div
            key={s.id}
            style={{
              padding: 12,
              borderRadius: 10,
              background: "#fff",
              marginTop: 10,
              boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
            }}
          >
            <b style={{ fontSize: 18 }}>{s.name}</b>
            <p style={{ margin: 0 }}>Address: {s.address}</p>
            <p style={{ margin: 0 }}>
              Average Rating: {s.average_rating ? s.average_rating : "No ratings yet"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
