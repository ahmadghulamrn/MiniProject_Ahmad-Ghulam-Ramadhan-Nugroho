// components/UpdatePostForm.js
import React, { useState } from "react";
import { categories } from "../constant";

const UpdatePostForm = ({ post, onUpdate, onCancel }) => {
  const [image, setImage] = useState(post.image);
  const [category, setCategory] = useState(post.category);
  const [description, setDescription] = useState(post.description);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = { image, category, description };
    onUpdate(updatedPost);
    console.log(updatedPost);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Update Post</h2>
      <div>
        <label className="block text-sm font-medium">Image URL:</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          className="border border-gray-300 p-3 mb-6 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
        />
      </div>
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
      <div className="flex justify-end space-x-2">
        <button type="submit" className="green_btn px-4 py-2">
          Update Post
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
