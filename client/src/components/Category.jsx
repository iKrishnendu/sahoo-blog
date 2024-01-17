import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { request } from "../utils/fetchApi";
import { PostCard } from "./PostCard";

// import Pagination from "../components/Pagination";

const Loading = ({ item }) => {
  return [...Array(item).keys()].map((index) => (
    <div key={index} className="animate-pulse">
      <div className="bg-gray-300 rounded-lg h-72"></div>
    </div>
  ));
};

const Category = () => {
  const { category } = useParams();
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryBlogs = async () => {
      try {
        setLoading(true);
        const data = await request(`/categories/${category}`, "GET");
        setCategoryBlogs(data);
      } catch (error) {
        console.error(`Error fetching ${category} blogs:`, error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchCategoryBlogs();
  }, [category]);

  return (
    <div>
      <h2 className="text-2xl font-bold my-4">Blogs in {category} category</h2>

      {loading ? (
        <div className="text-center mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
          <Loading item={3} />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center ">
          {categoryBlogs.length > 0 &&
            categoryBlogs.map((blog) => <PostCard key={blog._id} {...blog} />)}
        </div>
      )}

      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      /> */}
    </div>
  );
};

export default Category;
