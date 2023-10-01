import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { request } from "../utils/fetchApi";
import { format } from "timeago.js";
import { AiFillEdit, AiFillDelete, AiOutlineArrowLeft } from "react-icons/ai";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // Add likeCount state
  const { id } = useParams();
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const options = { Authorization: `Bearer ${token}` };
        const data = await request(`/blog/find/${id}`, "GET", options);
        setBlogDetails(data);
        setLikeCount(data.likes.length); // Set the initial like count
        setIsLiked(data.likes.includes(user._id));
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogDetails();
  }, [id]);

  // like
  const handleLikePost = async () => {
    try {
      const options = { Authorization: `Bearer ${token}` };
      await request(`/blog/like/${id}`, "PUT", options);
      setIsLiked((prev) => !prev);
      setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1)); // Update like count in state
    } catch (error) {
      console.error(error);
    }
  };

  // delete
  const handleDeleteBlog = async () => {
    try {
      const options = { Authorization: `Bearer ${token}` };
      const res = await request(`/blog/delete/${id}`, "DELETE", options);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full">
        <Link to="/" className="flex items-center gap-2 py-2">
          <AiOutlineArrowLeft /> Go Back
        </Link>
        <div>
          <img
            className="w-full lg:h-96 sm:h-40"
            src={blogDetails?.image?.url}
            alt={blogDetails?.title}
          />
          <div>
            <h3 className="text-center my-5 text-2xl prose">
              <h2>{blogDetails?.title}</h2>
            </h3>
            {blogDetails?.userId?._id === user._id ? (
              <div className="flex gap-3">
                <Link
                  className="flex gap-2 items-center bg-green-400 px-2 py-1 rounded-sm"
                  to={`/updateBlog/${blogDetails?._id}`}
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
            {/* {blogDetails?.desc} */}
            <div
              className="prose w-full"
              dangerouslySetInnerHTML={{ __html: blogDetails?.desc }}
            />
            <div className="flex gap-2">
              <span>{blogDetails?.views} views</span>
              <span>{likeCount} likes</span> {/* Display like count */}
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
    </>
  );
};

export default BlogDetails;
