import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/auth/signup', form);
      alert('Signup Successful! Please Login');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup Failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Create Account</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submitForm}>
        <input name="name" placeholder="Name (min 20 chars)" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
      <p>Already Registered? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
