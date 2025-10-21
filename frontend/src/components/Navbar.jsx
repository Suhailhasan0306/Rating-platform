import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-left">
        {user && (
          <>
            <Link to="/stores">Stores</Link>
            {user.role === 'ADMIN' && <Link to="/admin">Admin Dashboard</Link>}
            {user.role === 'STORE_OWNER' && <Link to="/owner">Owner Dashboard</Link>}
          </>
        )}
      </div>
      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

