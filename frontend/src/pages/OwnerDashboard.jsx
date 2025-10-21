import React, { useEffect, useState } from 'react';
import API from '../api';

const OwnerDashboard = () => {
  const [myStores, setMyStores] = useState([]);

  const fetchMyStores = async () => {
    const res = await API.get('/owner/stores');
    setMyStores(res.data.data);
  };

  useEffect(() => {
    fetchMyStores();
  }, []);

  return (
    <div>
      <h2>Store Owner Dashboard</h2>
      {myStores.length === 0 ? (
        <p>No stores assigned yet.</p>
      ) : (
        myStores.map(store => (
          <div key={store.id} className="card">
            <h3>{store.name}</h3>
            <p>Address: {store.address}</p>
            <p>Average Rating: {store.average_rating || 'No ratings yet'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default OwnerDashboard;


