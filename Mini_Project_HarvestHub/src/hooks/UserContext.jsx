import React, { createContext, useState } from "react";

// Import createContext untuk inisiasi state global
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Inisiasi state yang akan dibuat menjadi global
  const [user, setUser] = useState({
    totalPoints: 995,
    totalPosts: 12,
  });

  return (
    // Bungkus dengan value dari state
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
