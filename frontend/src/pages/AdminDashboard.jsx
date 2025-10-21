import React, { useEffect, useState } from 'react';
import API from '../api';

const AdminDashboard = () => {
  const [stores, setStores] = useState([]);
  const [form, setForm] = useState({ name: '', address: '', ownerEmail: '' });

  const fetchStores = async () => {
    const res = await API.get('/admin/stores');
    setStores(res.data.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createStore = async (e) => {
    e.preventDefault();
    try {
      await API.post('/admin/stores', form);
      alert('✅ Store created successfully');
      setForm({ name: '', address: '', ownerEmail: '' });
      fetchStores();
    } catch (err) {
      alert(err.response?.data?.message || '❌ Failed to create store');
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={createStore}>
        <input
          name="name"
          placeholder="Store Name"
          onChange={handleChange}
          value={form.name}
          required
        />
        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          value={form.address}
          required
        />
        <input
          name="ownerEmail"
          placeholder="Owner Email"
          onChange={handleChange}
          value={form.ownerEmail}
          required
        />
        <button type="submit">Add Store</button>
      </form>

      <h3>All Stores</h3>
      {stores.map((store) => (
        <div key={store.id} className="card">
          <h4>{store.name}</h4>
          <p>Owner Email: {store.email || 'Not Assigned'}</p>
          <p>Average Rating: ⭐ {store.average_rating || 'No Ratings Yet'}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
