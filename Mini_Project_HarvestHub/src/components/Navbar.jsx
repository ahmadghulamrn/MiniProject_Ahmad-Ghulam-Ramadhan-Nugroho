// src/components/Navbar.jsx
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuth();

  // Inisiasi state untuk dropdown
  const [toggleDropdown, setToggleDropdown] = useState(false);

  // Function untuk logout
  const handleLogout = () => {
    // Menghapus semua item isLoggedIn dan user
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="flex-between w-full mb-16 pt-6">
      <Link to="/" className="logo_text">
        ||| HarvestHub
      </Link>
      <div className="lg:flex hidden">
        {isLoggedIn ? (
          <div className="flex items-center gap-3 md:gap-5">
            <Link to="/dashboard" className="black_btn">
              Dashboard
            </Link>
            <Link to="/postingan" className="black_btn">
              Postingan
            </Link>
            <Link to="/upload" className="black_btn">
              Upload Postingan
            </Link>
            <Link to="/chatbot" className="black_btn">
              Chatbot
            </Link>

            <button
              type="button"
              onClick={() => handleLogout()}
              className="outline_btn"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login" className="black_btn">
            Sign in
          </Link>
        )}
      </div>

      <div className="sm:hidden flex relative w-full">
        {isLoggedIn ? (
          <div className="flex justify-between items-center w-full">
            <div className="font-bold text-lg">HarvestHub</div>
            <div
              onClick={() => setToggleDropdown(!toggleDropdown)}
              className="cursor-pointer text-xl font-bold"
            >
              |||
            </div>
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  to="/dashboard"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/postingan"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Postingan
                </Link>
                <Link
                  to="/upload"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Upload Postingan
                </Link>
                <Link
                  to="/chatbot"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Chatbot
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    handleLogout();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="black_btn">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
