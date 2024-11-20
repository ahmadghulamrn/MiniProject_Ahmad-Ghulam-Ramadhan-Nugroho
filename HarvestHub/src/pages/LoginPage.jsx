import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Import component
import { InputField } from "../components/ui/InputField";

const LoginPage = () => {
  // Inisiasi state yang diperlukan
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Function untuk perubahan ketika user input form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  // Function untuk login
  const handleLogin = (event) => {
    // Mencegah terjadinya reload window
    event.preventDefault();
    const { username, password } = credentials;
    // Data dummy
    const dummyUser = { username: "ghulam", password: "12345" };
    // Mengambil data dari local storage dari item "user"
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Validasi login
    if (
      isValidUser(storedUser, username, password) ||
      isValidUser(dummyUser, username, password)
    ) {
      handleSuccessfulLogin(dummyUser);
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  // Function untuk memvalidasi username dan password
  const isValidUser = (user, username, password) => {
    return user && user.username === username && user.password === password;
  };

  // Function untuk menghandle jika berhasil login
  const handleSuccessfulLogin = (user) => {
    // Local storage akan dibuat dengan 2 item yaitu user dan isLoggedIn dengan nilai masing masing username password dan true
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    // Beralih ke landing page
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-300 via-green-200 to-green-100 px-4 py-8">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg w-full max-w-md">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-4">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Sign in to access your account.
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <InputField
            id="username"
            label="Username"
            type="text"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-200 shadow-md"
          >
            Login
          </button>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-green-600 font-semibold underline hover:text-green-700"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
