import React from "react";
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { request } from "../utils/fetchApi";
import { format } from "timeago.js";
import { AiFillEdit, AiFillDelete, AiOutlineArrowLeft } from "react-icons/ai";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const options = { Authorization: `Bearer ${token}` };
        const data = await request(`/blog/find/${id}`, "GET", options);
        setBlogDetails(data);
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
          />
          <div>
            <h3 className="text-center my-5 text-2xl">
              <b>{blogDetails?.title}</b>
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
            <p className="text-xl">
              <span>Description: </span>
              {blogDetails?.desc}
            </p>
            <div className="flex gap-2">
              <span>{blogDetails?.views} views</span>
              <span>{blogDetails?.likes?.length} likes</span>
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
