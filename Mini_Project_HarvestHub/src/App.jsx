import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import "./styles/index.css";

// Import semua halaman
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PostList from "./pages/PostList";
import UploadPost from "./pages/UploadPost";
import Chatbot from "./pages/Chatbot";
import RegisterPage from "./pages/RegisterPage";

// Import auth untuk mengambil data dari Local Storage
import useAuth from "./hooks/useAuth";
// Import UserProvide (useContext) untuk state global
import { UserProvider } from "./hooks/UserContext";
// Import constant untuk protectedRoutes
import { PROTECTED_ROUTES } from "./constant";

const AppContent = () => {
  // Inisiasi variable untuk menampung nilai dari local storage
  const isLoggedIn = useAuth();
  const location = useLocation();

  // Jika di dalam local storage isLoggedIn bernilai false, akan dilempar ke halaman login
  if (!isLoggedIn && PROTECTED_ROUTES.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/postingan" element={<PostList />} />
        <Route path="/upload" element={<UploadPost />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </UserProvider>
  );
};

export default AppContent;
