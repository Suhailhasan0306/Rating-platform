import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });

  const userData = res.data.data.user; 
  const token = res.data.data.token;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(userData));

  setUser(userData);

  return userData;   
};

const signup = async (payload) => {
    const res = await api.post("/auth/signup", payload);
    return res;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({ user, setUser, login, signup, logout, loading }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
