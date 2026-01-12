import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { logout } = useAuth();

  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

  const [stores, setStores] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchStores = async () => {
    try {
      const res = await api.get("/admin/stores");
      console.log("FETCH STORES RESPONSE =>", res.data);
      setStores(res.data?.data || res.data || []);
    } catch (err) {
      console.log(err);
      setMsg("Failed to load stores");
    }
  };

  const addStore = async () => {
    setMsg("");
    try {
      console.log("ADD STORE DATA =>", {
       name: storeName,
       address,
       ownerEmail,
      });
      await api.post("/admin/stores", {
        name: storeName,
        address,
        ownerEmail,
      });

      setStoreName("");
      setAddress("");
      setOwnerEmail("");
      setMsg("Store added");

      fetchStores();
    }  catch (err) {
      console.log("ADD STORE ERROR DATA =>", err?.response?.data);
      console.log("ADD STORE ERROR STATUS =>", err?.response?.status);
      setMsg(err?.response?.data?.message || "Failed to add store");
      }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Admin Dashboard</h2>
      </div>

      <div
        style={{
          background: "#fff",
          padding: 16,
          borderRadius: 10,
          marginTop: 14,
          boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h3>Add Store</h3>

        <input
          placeholder="Store Name"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 8 }}
        />
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 8 }}
        />
        <input
          placeholder="Owner Email"
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 8 }}
        />

        {msg && <p style={{ color: "green" }}>{msg}</p>}

        <button
          onClick={addStore}
          style={{
            width: "100%",
            marginTop: 10,
            padding: 12,
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Add Store
        </button>
      </div>

      <h3 style={{ marginTop: 20 }}>All Stores</h3>

      {stores.map((s) => (
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
          <b>{s.name}</b>
          <p style={{ margin: 0 }}>Address: {s.address}</p>
          <p style={{ margin: 0 }}>Owner: {s.ownerEmail || "N/A"}</p>
        </div>
      ))}
    </div>
  );
}

