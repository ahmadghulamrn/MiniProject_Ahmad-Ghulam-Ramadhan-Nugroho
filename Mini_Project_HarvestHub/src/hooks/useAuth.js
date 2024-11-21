import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useAuth = () => {
  // Inisiasi state untuk menangani nilai dari localstorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const location = useLocation();

  // Setiap perpindahan halaman, useEffect akan mengecek value dari local storage (isLoggedIn)
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
  }, [location.pathname]);

  // Mengembalikan nilai local storage (isLoggedIn = true/false)
  return isLoggedIn;
};

export default useAuth;
