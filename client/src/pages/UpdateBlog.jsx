import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { request } from "../utils/fetchApi";
import { AiOutlineArrowLeft } from "react-icons/ai";

const UpdateBlog = () => {
  const [blogDetails, setBlogDetails] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();

  const categories = [
    "nature",
    "music",
    "travel",
    "design",
    "programming",
    "fun",
    "fashion",
  ];

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const options = { Authorization: `Bearer ${token}` };
        const data = await request(`/blog/find/${id}`, "GET", options);
        setBlogDetails(data);
        setTitle(data.title);
        setDesc(data.desc);
        setCategory(data.category);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogDetails();
  }, [id]);

  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    try {
      const options = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await request(`/blog/update/${id}`, "PUT", options, {
        title,
        desc,
        category,
      });
      navigate(`/blog-details/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div>
          <Link to="/" className="flex items-center gap-2 py-2">
            <AiOutlineArrowLeft /> Go Back
          </Link>
          <div className="grid place-content-center mt-6 p-2 ">
            <div className="sm:w-80 py-3 rounded-md">
              <h1 className="text-left text-2xl pb-2">
                <b>Update Blog</b>
              </h1>
              <p className="text-sm">
                Revise, Refresh, Relaunch: Elevate Your Blog with Updates.
              </p>
            </div>
            <form
              className="flex flex-col py-2 gap-3"
              onSubmit={handleUpdateBlog}
            >
              <input
                type="text"
                placeholder="Title..."
                value={title}
                className="border-2 border-black-500 rounded-lg p-1"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Description..."
                value={desc}
                className="border-2 border-black-500 rounded-lg p-1"
                onChange={(e) => setDesc(e.target.value)}
              />
              <select
                value={category}
                className="border-2 border-black-500 rounded-lg "
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={crypto.randomUUID()} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                className="bg-gray-800 p-1 px-2 rounded-sm text-white shadow-sm"
                type="submit"
              >
                Update Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBlog;
