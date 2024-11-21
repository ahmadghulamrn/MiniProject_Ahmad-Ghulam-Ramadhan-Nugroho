import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/layout/Layout";

// Import untuk mengambil value isLoggedIn
import useAuth from "../hooks/useAuth";

const LandingPage = () => {
  // Value isLoggedIn ditampung disini
  const isLoggedIn = useAuth();

  return (
    <Layout>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Welcome to HarvestHub
          <br className="max-md:hidden" />
          <span className="green_gradient text-center">
            {" "}
            AI-Powered Chatbot
          </span>
        </h1>
        <img
          src="/chatbot_logo.png"
          alt="Chatbot Logo"
          width={300}
          height={300}
        />
        <p className="desc text-center">
          A platform to share your gardening passion and earn rewards for
          sustainable living.
        </p>
        {/* Conditional rendering ketika user sudah login atau belum */}
        {isLoggedIn && (
          <Link to="/postingan" className="green_btn w-1/4 py-5 mt-6">
            See Post
          </Link>
        )}
      </section>
    </Layout>
  );
};

export default LandingPage;
