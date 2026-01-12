import React, { useState } from 'react';
import API from '../api';

const RatingBox = ({ storeId, onRated }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const submitRating = async () => {
    if (rating < 1 || rating > 5) {
      alert('Please select a rating between 1 and 5');
      return;
    }
    setLoading(true);
    try {
      await API.post(`/stores/${storeId}/rate`, { rating });
      alert('Rating submitted successfully');
      onRated();  
      setRating(0); 
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rating-box">
      <label>Rate this Store: </label>
      <select
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
        disabled={loading}
      >
        <option value={0}>Select</option>
        <option value={1}>⭐ 1</option>
        <option value={2}>⭐ 2</option>
        <option value={3}>⭐ 3</option>
        <option value={4}>⭐ 4</option>
        <option value={5}>⭐ 5</option>
      </select>
      <button onClick={submitRating} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};

export default RatingBox;
