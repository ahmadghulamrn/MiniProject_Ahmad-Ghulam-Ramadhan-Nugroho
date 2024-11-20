import React from "react";

export const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block text-green-700 font-medium mb-2 text-lg"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 transition duration-200 shadow-sm"
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
