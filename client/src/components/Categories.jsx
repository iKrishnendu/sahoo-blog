import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { request } from "../utils/fetchApi";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await request("/categories", "GET");
        // Extract only the 'name' from each category
        const categoryNames = data.map((category) => category.name);
        setCategories(categoryNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/categories/${category}`}
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
