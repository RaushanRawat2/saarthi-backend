import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ✅ Save user on login (with role)
  const login = (data) => {
    const userData = {
      ...data,
      role: data.role || "user", // default role is user
    };
    setUser(userData);
    localStorage.setItem("userInfo", JSON.stringify(userData));
  };

  // ✅ Clear user on logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
