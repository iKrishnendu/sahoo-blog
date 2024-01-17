import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { request } from "../utils/fetchApi";
import { format } from "timeago.js";
import { AiFillEdit, AiFillDelete, AiOutlineArrowLeft } from "react-icons/ai";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import Comment from "../components/Comment";
import Categories from "../components/Categories";
import RecommendedPosts from "../components/RecommendedPosts";

// Loading component
const Loading = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 rounded-lg h-72"></div>
  </div>
);

const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true); // Added loading state
  const { id } = useParams();
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const options = { Authorization: `Bearer ${token}` };
        const data = await request(`/blog/find/${id}`, "GET", options);
        setBlogDetails(data);
        setLikeCount(data.likes.length);
        setIsLiked(data.likes.includes(user._id));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchBlogDetails();
  }, [id]);

  const handleLikePost = async () => {
    try {
      const options = { Authorization: `Bearer ${token}` };
      await request(`/blog/like/${id}`, "PUT", options);
      setIsLiked((prev) => !prev);
      setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      const options = { Authorization: `Bearer ${token}` };
      await request(`/blog/delete/${id}`, "DELETE", options);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Link
        to="/"
        className="flex justify-center items-center gap-2 py-2 w-32 border hover:border-gray-300 duration-200"
      >
        <AiOutlineArrowLeft /> Go Back
      </Link>
      <div className="flex flex-col lg:flex-row mt-1">
        <div className="lg:w-2/3">
          {loading ? (
            // Display loading component while data is being fetched
            <div className="w-full">
              <Loading />
            </div>
          ) : (
            <div className="w-full pt-3 mt-1">
              <div>
                <img
                  className="w-full lg:h-96 sm:h-40"
                  src={blogDetails?.image?.url}
                  alt={blogDetails?.title}
                />
                <div>
                  <div className="text-center my-5 text-2xl prose">
                    <h2>{blogDetails?.title}</h2>
                    <span className="text-lg justify-center px-3 py-1 cursor-pointer rounded-full text-white bg-red-500 hover:bg-blue-600 mb-2 transition duration-300 ease-in-out transform hover:scale-105">
                      {blogDetails?.category}
                    </span>
                  </div>
                  {blogDetails?.userId?._id === user._id ? (
                    <div className="flex gap-3">
                      <Link
                        className="flex gap-2 items-center bg-green-400 px-2 py-1 rounded-sm"
                        to={`/update-blog/${blogDetails?._id}`}
                      >
                        Edit <AiFillEdit />
                      </Link>
                      <div className="flex gap-2 items-center bg-red-300 px-2 cursor-pointer">
                        Delete <AiFillDelete onClick={handleDeleteBlog} />
                      </div>
                    </div>
                  ) : (
                    <>
                      {isLiked ? (
                        <div className="text-2xl text-center justify-center">
                          <FcLike onClick={handleLikePost} />
                        </div>
                      ) : (
                        <div className="text-2xl text-center justify-center">
                          <FcLikePlaceholder onClick={handleLikePost} />
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="py-5">
                  <p className="text-lg">
                    <span>Description: </span>
                  </p>
                  <div
                    className="prose w-full"
                    dangerouslySetInnerHTML={{ __html: blogDetails?.desc }}
                  />
                  <div className="flex gap-2">
                    <span>{blogDetails?.views} views</span>
                    <span>{likeCount} likes</span>
                  </div>
                </div>
                <div>
                  <span>
                    <span>Author: </span> {blogDetails?.userId?.username}
                  </span>{" "}
                  <span>
                    <span>Created At: </span> {format(blogDetails?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          )}
          <Comment blogId={id} token={token} />
        </div>
        {/* Add Categories component on the right side */}
        <div className="lg:w-1/3 p-4 sticky top-1 lg:h-full ">
          <Categories />
          <RecommendedPosts />
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
