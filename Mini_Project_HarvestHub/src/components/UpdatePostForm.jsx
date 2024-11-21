import React, { useState, useEffect } from "react";
import { categories } from "../constant";

const UpdatePostForm = ({ post, onUpdate, onCancel }) => {
  const [name, setName] = useState(post.title || "");
  const [category, setCategory] = useState(post.categories || "");
  const [description, setDescription] = useState(post.description || "");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(post.image_url || ""); // To store the uploaded image URL
  const [loading, setLoading] = useState(false); // Loading state for image upload

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dzoikrezs/image/upload"; // Your Cloudinary URL
  const CLOUDINARY_UPLOAD_PRESET = "ml_default"; // Your Cloudinary upload preset

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set image file
      uploadImage(file); // Upload image to Cloudinary
    }
  };
  
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  
    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url); // Set the Cloudinary URL after successful upload
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed. Please try again.");
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prevent submission if no title or category is provided
    if (!name || !category) {
      alert("Title and Category are required!");
      return;
    }
  
    // Set loading to true to prevent further form submission
    setLoading(true);
  
    try {
      // If a new image is selected, make sure the upload is completed before submission
      if (image && !imageUrl) {
        await uploadImage(image); // Wait for image upload to complete before proceeding
        // After the image upload is complete, imageUrl will be updated
      }
  
      const updatedPost = {
        title: name,
        categories: category,
        description,
        image_url: imageUrl || post.image_url, // Use the Cloudinary URL or fallback to existing image
      };
  
      // Pass the updated post to the parent component
      await onUpdate(updatedPost);
  
      // Optionally reset loading state and any other form states
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Failed to update post", error);
      alert("Failed to update the post. Please try again.");
    }
  };
  

  useEffect(() => {
    setName(post.title || "");
    setCategory(post.categories || "");
    setDescription(post.description || "");
    setImageUrl(post.image_url || ""); // Set image URL if already present
  }, [post]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Update Post</h2>

      {/* Name / Title */}
      <div>
        <label className="block text-sm font-medium">Title:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-3 mb-6 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
        />
      </div>

      {/* Category Dropdown */}
      <div>
        <label className="block text-sm font-medium">Category:</label>
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
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-3 mb-6 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
          rows="6"
        />
      </div>

      {/* Image Upload (Optional) */}
      <div>
        <label className="block text-sm font-medium">Image:</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          className="border border-gray-300 p-3 mb-6 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
        />
        {image && <p className="text-sm text-gray-500">Selected image: {image.name}</p>}
        {imageUrl && !image && (
          <img
            src={imageUrl}
            alt="Post Image"
            className="mt-4 max-w-full max-h-40 object-cover"
          />
        )}
      </div>

      {/* Submit and Cancel Buttons */}
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="green_btn px-4 py-2"
          disabled={loading} // Disable submit button while loading
        >
          {loading ? "Updating..." : "Update Post"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="outline_btn px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdatePostForm;
