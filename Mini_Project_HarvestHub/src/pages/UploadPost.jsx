import { useState, useContext } from "react";
import { Layout } from "../components/layout/Layout";
import { FormField } from "../components/ui/FormField";
import { UserContext } from "../hooks/UserContext";
import { categories } from "../constant";
import { useNavigate } from "react-router-dom";

const UploadPost = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!name || !category || !description || !image) {
      setError("Please fill all fields and select an image.");
      return;
    }

    try {
      // Upload gambar ke server
      const imageUrl = await uploadImage(image);

      // Buat objek post sesuai struktur MockAPI
      const newPost = {
        title: name,
        categories: category,
        description: description,
        createdAt: new Date().toISOString(),
        image_url: imageUrl, // Menggunakan URL gambar dari server
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const createdPost = await response.json();

      // Update user points based on the category
      const pointsEarned = categories[category] || 0;
      setUser((prevUser) => ({
        ...prevUser,
        totalPoints: (prevUser.totalPoints || 0) + pointsEarned,
        totalPosts: (prevUser.totalPosts || 0) + 1,
      }));

      // Reset form dan navigasi
      resetForm();
      navigate("/postingan");
    } catch (error) {
      console.error("Post creation error:", error);
      setError(error.message || "There was an error creating your post.");
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
  
    formData.append('file', file); // Append the image file
    formData.append('upload_preset', 'ml_default'); // Use your upload preset name
  
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dzoikrezs/image/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
  
      const data = await response.json();
      return data.secure_url; // Return the Cloudinary URL for the uploaded image
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Failed to upload image');
    }
  };
  
  

  const resetForm = () => {
    setName("");
    setCategory("");
    setDescription("");
    setImage(null);
    setError("");
  };

  return (
    <Layout>
      <div className="w-full max-w-xl mx-auto p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-6">Create New Post</h2>

        {error && (
          <div className="bg-red-500 text-white p-3 mb-4 rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <FormField
            label="Post Name"
            component={
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the name of the post"
                className="border border-gray-300 p-3 mb-6 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
              />
            }
          />

          <FormField
            label="Select Category"
            component={
              <select
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
                onChange={handleImageChange}
                accept="image/*"
                className="border border-gray-300 p-3 mb-6 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
              />
            }
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
          >
            Submit Post
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UploadPost;
