import { useContext, useState } from "react";
import { Link } from "react-router-dom";

// Import keperluan untuk halaman ini
import { UserContext } from "../hooks/UserContext";
import useFetch from "../hooks/useFetch";

// Import component yang dibutuhkan
import DashboardSummary from "../components/DashboardSummary";
import { Layout } from "../components/layout/Layout";
import PostCard from "../components/PostCard";

const DashboardPage = () => {
  const url = import.meta.env.VITE_API_URL;

  // Inisiasi beberapa state
  const { user, setUser } = useContext(UserContext);
  const { totalPoints, totalPosts } = user;

  const {data, loading, error} = useFetch(`${url}/posts`)

  // Function untuk mengambil hadiah jika point >= 1000
  const handleRedeemPoints = () => {
    // setUser = ubah value user
    setUser((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints - 1000,
    }));
    alert("You have redeemed 1000 points for Rp100,000!");
  };

  return (
    <Layout>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Welcome to Your
          <br className="max-md:hidden" />
          <span className="green_gradient text-center">
            {" "}
            HarvestHub Dashboard
          </span>
        </h1>
        <p className="desc text-center">
          Your gardening journey is just beginning! Here you can track your
          progress, share your posts, and redeem rewards.
        </p>
        <DashboardSummary totalPoints={totalPoints} totalPosts={totalPosts} />
        <button
          className={`md:w-1/4 mt-6 py-3 px-6 text-white font-semibold rounded-md ${
            totalPoints >= 1000
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleRedeemPoints}
          disabled={totalPoints < 1000}
        >
          Redeem Points for Rp100,000
        </button>
      </section>
      {loading ? (
        <div className="mt-7 flex justify-center items-center">
          <p className="text-xl text-gray-500">Loading...</p>
        </div>
      ) : (
        <div className="w-full mt-7 flex lg:flex-row flex-col justify-between gap-8">
          {data.slice(0, 3).map((post) => (
            <PostCard
              key={post.id}
              image={post.image_url}
              category={post.categories}
              description={post.title}
              action={false}
              onDelete={() => handleDelete(post.id)}
              onUpdate={() => {
                setEditingPost(post);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      )}
      <Link to="/postingan" className="green_btn mt-8 py-5 font-bold">
        See more post
      </Link>
    </Layout>
  );
};

export default DashboardPage;
