import React, { useState, useEffect } from "react";
import AvatarDropdown from "./AvatarDropdown";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { request } from "../utils/fetchApi";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] =
    useState(false);

  const [categories, setCategories] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const openCategoriesDropdown = () => {
    setIsCategoriesDropdownOpen(true);
  };

  const closeCategoriesDropdown = () => {
    setIsCategoriesDropdownOpen(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await request("/categories", "GET");
        const categoryNames = data.map((category) => category.name);
        setCategories(categoryNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  // const closeAllDropdowns = () => {
  //   setIsDropdownOpen(false);
  //   setIsCategoriesDropdownOpen(false);
  // };

  return (
    <div className="bg-gray-800 px-4 pb-2">
      <div className="flex justify-between items-center">
        <div
          className="relative group flex"
          onMouseEnter={openCategoriesDropdown}
          onMouseLeave={closeCategoriesDropdown}
        >
          <div className="text-white font-mono text-2xl font-semibold">
            <Link to="/" className="text-xl flex flex-col">
              <span>Sahoo</span>
              <span>blog.</span>
            </Link>
          </div>

          <div className="relative px-1 mx-4 items-center pt-2">
            <span className="cursor-pointer text-white ">
              Categories
              {isCategoriesDropdownOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white inline-block ml-1 transform rotate-180 transition-transform duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12l-1 1 5 5V7h-1.5v6.5L10 12z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white inline-block ml-1 transition-transform duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12l-1 1 5 5V7h-1.5v6.5L10 12z" />
                </svg>
              )}
            </span>
            {isCategoriesDropdownOpen && (
              <div className="absolute bg-gray-700 text-white mt-1 p-2 rounded-md space-y-2 flex flex-col">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/categories/${category}`}
                    className={` hover:underline`}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        {user ? (
          <div className="relative">
            <button
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
                closeCategoriesDropdown();
              }}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <RxAvatar className="text-2xl text-white" />
            </button>
            {isDropdownOpen && <AvatarDropdown />}
          </div>
        ) : (
          <div className="text-white">
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
