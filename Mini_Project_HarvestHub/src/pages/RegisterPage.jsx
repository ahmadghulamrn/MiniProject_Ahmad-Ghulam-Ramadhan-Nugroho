import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { InputField } from "../components/ui/InputField";

const RegisterPage = () => {
  // Inisiasi state
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Function untuk handle perubahan
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  // Function untuk handle register
  const handleRegister = (event) => {
    // Mencegah window agar tidak reload
    event.preventDefault();
    const { username, password } = credentials;

    // Cek jika pengguna sudah ada
    const existingUser = JSON.parse(localStorage.getItem("user"));

    if (existingUser && existingUser.username === username) {
      setErrorMessage("Username already exists");
    } else {
      // Simpan pengguna baru di localStorage
      const newUser = { username, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("isLoggedIn", true);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-300 via-green-200 to-green-100 px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg w-full max-w-md">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-4">
          Create an Account
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm md:text-base">
          Register to explore the features we offer.
        </p>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-6">
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
            Register
          </button>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold underline hover:text-green-700"
          >
            Login
          </Link>{" "}
          here
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
