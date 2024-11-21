const PostCard = ({
  image,
  category,
  description,
  onDelete,
  onUpdate,
  action = true,
}) => {
  return (
    <div className="bg-white w-72 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:cursor-pointer">
      {/* Gambar */}
      <img src={image} alt={category} className="w-full h-48 object-cover" />

      {/* Konten */}
      <div className="p-4">
        {/* Kategori */}
        <p className="text-sm font-semibold text-green-600 uppercase mb-2">
          {category}
        </p>

        {/* Deskripsi */}
        <p className="text-gray-700 text-sm">{description}</p>
      </div>

      {/* Tombol Update dan Delete */}
      {action && (
        <div className="mt-4 flex justify-between items-center p-4">
          {/* Update button */}
          <button onClick={() => onUpdate()} className="green_btn px-4 py-2">
            Update
          </button>

          {/* Delete button */}
          <button onClick={onDelete} className="outline_btn px-4 py-2">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
