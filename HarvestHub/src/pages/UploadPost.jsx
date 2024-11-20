// src/pages/UploadPost.jsx
import { useState, useContext } from "react";

// Import component yang diperlukan
import { Layout } from "../components/layout/Layout";
import { FormField } from "../components/ui/FormField";

// Import UserContext untuk state global
import { UserContext } from "../hooks/UserContext";
import { mockPosts, categories } from "../constant";
import { useNavigate } from "react-router-dom";

const UploadPost = () => {
  const navigate = useNavigate();
  // Inisiasi state
  const { user, setUser } = useContext(UserContext);
  const [category, setCategory] = useState(""); // State for category
  const [description, setDescription] = useState(""); // State for description
  const [image, setImage] = useState(null); // State for image
  const [error, setError] = useState(""); // State for error message

  // Function untuk upload image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Function untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Kondisi ketika data tidak diinput oleh user
    if (!category || !description || !image) {
      setError("Please fill all fields and select an image.");
      return;
    }

    // Membuat variable
    const newPost = {
      category,
      description,
      image: URL.createObjectURL(image),
    };

    // Push ke variable mockPost
    mockPosts.push(newPost);
    console.log("Post created and saved to constant:", mockPosts);

    // Point yang diterima
    const pointsEarned = categories[category];

    // setUser untuk merubah totalPoints dan totalPosts
    setUser((prevUser) => ({
      ...prevUser,
      totalPoints: prevUser.totalPoints + pointsEarned,
      totalPosts: prevUser.totalPosts + 1,
    }));

    resetForm();
    navigate("/postingan");
  };

  // Function untuk reset form
  const resetForm = () => {
    setCategory("");
    setDescription("");
    setImage(null);
    setError("");
  };

  return (
    <Layout>
      <div className="w-full mx-auto p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-6">Create New Post</h2>

        {error && (
          <div className="bg-red-500 text-white p-3 mb-4 rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <FormField
            label="Select Category"
            component={
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 p-3 mb-6 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
              >
                <option value="">Select Category</option>
                {Object.keys(categories).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            }
          />

          <FormField
            label="Description"
            component={
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share your experience or story"
                className="border border-gray-300 p-3 mb-6 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                rows="6"
              />
            }
          />

          <FormField
            label="Upload Image"
            component={
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="border border-gray-300 p-3 mb-6 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
              />
            }
          />

          <button type="submit" className="green_btn">
            Submit Post
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UploadPost;
