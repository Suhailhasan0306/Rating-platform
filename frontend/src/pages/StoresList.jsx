import React, { useEffect, useState } from 'react';
import API from '../api';
import RatingBox from '../components/RatingBox';

const StoresList = () => {
  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    const res = await API.get('/stores');
    setStores(res.data.data);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="page-container">
      <h2>Available Stores</h2>
      {stores.length === 0 ? (
        <p>No stores available</p>
      ) : (
        stores.map(store => (
          <div key={store.id} className="card">
            <h3>{store.name}</h3>
            <p>Address: {store.address}</p>
            <p>Average Rating: ⭐ {store.average_rating || 'No ratings yet'}</p>
            <RatingBox storeId={store.id} onRated={fetchStores} />
          </div>
        ))
      )}
    </div>
  );
};

export default StoresList;
