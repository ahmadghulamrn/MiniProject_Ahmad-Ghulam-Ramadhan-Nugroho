import { useState, useEffect, useContext } from "react";
// Import UserContext untuk keperluan perubahan state global
import { UserContext } from "../hooks/UserContext";

// Import component yang dibutuhkan
import PostCard from "../components/PostCard";
import { Layout } from "../components/layout/Layout";
import UpdatePostForm from "../components/UpdatePostForm";
import Modal from "../components/ui/Modal";

// Import constant / data data
import { mockPosts, categories } from "../constant";

const PostList = () => {
  // Inisiasi state
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function untuk delete data
  const handleDelete = (id) => {
    // Mencari ID
    const postToDelete = posts.find((post) => post.id === id);

    // Ketika ketemu, akan dilakukan penghapusan
    if (postToDelete) {
      // Point yang harus dikurangi berdasarkan kategori
      const pointsToDeduct = categories[postToDelete.category] || 0;

      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);

      // setUser untuk merubah value dari User (totalPoints, totalPosts)
      setUser((prevUser) => ({
        ...prevUser,
        totalPoints: prevUser.totalPoints - pointsToDeduct,
        totalPosts: prevUser.totalPosts - 1,
      }));
    }
  };

  // Fungsi untuk update data
  const handleUpdate = (id, updatedPost) => {
    // Mencari ID
    const postToUpdate = posts.find((post) => post.id === id);

    // Ketika ketemu, akan dilakukan update data
    if (postToUpdate) {
      // Inisiasi point sekarang dan point baru
      const currentPoints = categories[postToUpdate.category] || 0;
      const newPoints = categories[updatedPost.category] || 0;

      const updatedPosts = posts.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post
      );
      setPosts(updatedPosts);

      // Mengupdate point yang baru
      setUser((prevUser) => ({
        ...prevUser,
        totalPoints: prevUser.totalPoints - currentPoints + newPoints,
      }));

      setIsModalOpen(false);
    }
  };

  // Mengambil data mockPosts ketika halaman dimuat
  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl flex-center flex-col">
        <div className="flex flex-row  items-center gap-4">
          <h1 className="head_text green_gradient text-center">
            Explore Gardening Posts
          </h1>
          <img
            src="/rocket_icon.png"
            alt="Rocket Icon"
            width={65}
            height={65}
          />
        </div>
        <p className="desc text-center">
          Discover tips, experiences, and sustainable gardening practices shared
          by fellow gardeners.
        </p>
        {posts.length === 0 ? (
          <div className="mt-7 flex justify-center items-center">
            <p className="text-xl text-gray-500">Loading...</p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-8 mx-auto">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                image={post.image}
                category={post.category}
                description={post.description}
                onDelete={() => handleDelete(post.id)}
                onUpdate={() => {
                  setEditingPost(post);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        )}
        {/* Conditional rendering modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {editingPost && (
            <UpdatePostForm
              post={editingPost}
              onUpdate={(updatedPost) =>
                handleUpdate(editingPost.id, updatedPost)
              }
              onCancel={() => setIsModalOpen(false)} // Tutup modal ketika tidak jadi update
            />
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default PostList;
