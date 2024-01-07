import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  // Dummy categories data (replace with your actual data)
  const categories = [
    "Technology",
    "Travel",
    "Food",
    "Fashion",
    "Sports",
    "Enggenering",
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/category/${category}`}
            className="inline-block px-3 py-1 rounded-full text-white bg-blue-500 hover:bg-blue-600 mb-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
