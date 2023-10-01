import React, { useEffect, useState } from "react";
import { request } from "../utils/fetchApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostCard } from "../components/PostCard";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const options = {
          Authorization: `Bearer ${token}`,
        };
        const response = await request("/blog/getAll", "GET", options);
        setBlogs(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        {user ? (
          <Link
            to="/create"
            className="bg-stone-900 px-2 py-1 text-xl rounded-sm
             text-white items-center justify-around flex w-full md:w-52 mt-4 mx-2 shadow-md"
          >
            Create Post
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center ">
        {blogs.length > 0 &&
          blogs.map((blog) => <PostCard key={blog._id} {...blog} />)}
      </div>
    </div>
  );
};

export default Home;
