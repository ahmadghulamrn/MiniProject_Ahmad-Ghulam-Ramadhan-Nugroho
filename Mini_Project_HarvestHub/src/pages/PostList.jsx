import { useState, useEffect, useContext } from "react";
import { UserContext } from "../hooks/UserContext";
import useFetch from "../hooks/useFetch";
import PostCard from "../components/PostCard";
import { Layout } from "../components/layout/Layout";
import UpdatePostForm from "../components/UpdatePostForm";
import Modal from "../components/ui/Modal";
import { categories } from "../constant";

const PostList = () => {
  const url = import.meta.env.VITE_API_URL; // URL API Backend
  const { user, setUser } = useContext(UserContext);
  const [editingPost, setEditingPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, error, setData } = useFetch(`${url}/posts`);

  // Function to delete data from backend
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${url}/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedPosts = data.filter((post) => post.id !== id);
        setData(updatedPosts);

        const postToDelete = data.find((post) => post.id === id);
        const pointsToDeduct = categories[postToDelete.category] || 0;
        setUser((prevUser) => ({
          ...prevUser,
          totalPoints: prevUser.totalPoints - pointsToDeduct,
          totalPosts: prevUser.totalPosts - 1,
        }));
      } else {
        throw new Error("Failed to delete the post");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete the post");
    }
  };

  // Function to update the post with new data
  const handleUpdate = async (id, updatedPost) => {
    try {
      let imageUrl = updatedPost.image_url; // Default to the existing image URL if no new image is selected
  
      // If the image is a file, upload it to Cloudinary
      if (updatedPost.image instanceof File) {
        const imageFormData = new FormData();
        imageFormData.append('file', updatedPost.image);
        imageFormData.append('upload_preset', 'ml_default'); // Replace with your preset
  
        // Upload image to Cloudinary
        const imageResponse = await fetch('https://api.cloudinary.com/v1_1/dzoikrezs/image/upload', {
          method: 'POST',
          body: imageFormData,
        });
  
        const imageData = await imageResponse.json();
        
        if (imageData.secure_url) {
          imageUrl = imageData.secure_url; // Update image URL if a new image was uploaded
        } else {
          throw new Error("Image upload failed"); // Throw error if image upload fails
        }
      }
  
      // Send the update request to the backend
      const response = await fetch(`${url}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedPost,
          image_url: imageUrl, // Send the updated image URL (or existing URL)
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update the post'); // Handle unsuccessful update
      }
  
      // Parse the response and update the local posts state with the updated post
      const updatedPosts = data.map((post) =>
        post.id === id ? { ...post, ...updatedPost, image_url: imageUrl } : post
      );
      setData(updatedPosts);
      console.log('Updated Post:', updatedPost);
  
      // Adjust user's points if the category has changed
      const postToUpdate = data.find((post) => post.id === id);
      if (postToUpdate.categories !== updatedPost.categories) {
        const currentPoints = categories[postToUpdate.categories] || 0;
        const newPoints = categories[updatedPost.categories] || 0;
        setUser((prevUser) => ({
          ...prevUser,
          totalPoints: prevUser.totalPoints - currentPoints + newPoints,
        }));
      }
  
      setIsModalOpen(false); // Close modal after successful update
    } catch (error) {
      console.error(error);
      alert('Failed to update the post: ' + error.message); // Show a message if an error occurs
    }
  };
  

  return (
    <Layout>
      <div className="max-w-7xl flex-center flex-col">
        <div className="flex flex-row items-center gap-4">
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
        {loading ? (
          <div className="mt-7 flex justify-center items-center">
            <p className="text-xl text-gray-500">Loading...</p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-8 mx-auto">
            {data.map((post) => (
              <PostCard
                key={post.id}
                image={post.image_url}
                category={post.categories}
                description={post.title}
                onDelete={() => handleDelete(post.id)}
                onUpdate={() => {
                  setEditingPost(post);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        )}
        {/* Modal for updating post */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {editingPost && (
            <UpdatePostForm
              post={editingPost}
              onUpdate={(updatedPost) => handleUpdate(editingPost.id, updatedPost)}
              onCancel={() => setIsModalOpen(false)}
            />
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default PostList;
