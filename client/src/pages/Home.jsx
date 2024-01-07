import React, { useEffect, useState } from "react";
import { request } from "../utils/fetchApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostCard } from "../components/PostCard";
import Pagination from "../components/Pagination";
import Hero from "../components/Hero";

const Loading = ({ item }) => {
  return [...Array(item).keys()].map((index) => (
    <div key={index} className="animate-pulse">
      <div className="bg-gray-300 rounded-lg h-72"></div>
    </div>
  ));
};

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async (page) => {
    try {
      setLoading(true); // Set loading to true when starting to fetch data
      const options = {
        Authorization: `Bearer ${token}`,
      };
      const response = await request(
        `/blog/getAll?page=${page}`,
        "GET",
        options
      );
      setBlogs(response.blogs);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [token, currentPage]);

  return (
    <div>
      <Hero />
      {/* <div className="flex justify-center">
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
      </div> */}
      {loading ? (
        <div className="text-center mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
          <Loading item={3} />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center ">
          {blogs.length > 0 &&
            blogs.map((blog) => <PostCard key={blog._id} {...blog} />)}
        </div>
      )}
      {/* Add pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Home;
