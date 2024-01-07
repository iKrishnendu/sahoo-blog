import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { request } from "../utils/fetchApi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";

const Comment = ({ blogId, token }) => {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const options = { Authorization: `Bearer ${token}` };
        const data = await request(`/comments/all/${blogId}`, "GET", options);
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [blogId, token]);

  const calculateTimeAgo = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const timeDiff = now - commentTime;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} ${years === 1 ? "year" : "years"} ago`;
    if (months > 0) return `${months} ${months === 1 ? "month" : "months"} ago`;
    if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ago`;
    if (hours > 0) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    if (minutes > 0)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  };

  const handleAddComment = async (commentText) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user._id, text: commentText }),
      };

      const url = `${process.env.REACT_APP_SERVER_URL}/comments/` + blogId;
      const response = await fetch(url, options);
      const newComment = await response.json();

      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const url = `${process.env.REACT_APP_SERVER_URL}/comments/${commentId}`;
      const response = await fetch(url, options);

      if (response.ok) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
        setSelectedComment(null); // Reset selected comment after deletion
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditComment = async (commentId, newText) => {
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newText }),
      };

      const url = `${process.env.REACT_APP_SERVER_URL}/comments/${commentId}`;
      const response = await fetch(url, options);

      if (response.ok) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId ? { ...comment, text: newText } : comment
          )
        );
        setSelectedComment(null); // Reset selected comment after editing
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-4">Comments</h2>
      {/* Add new comment form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const commentText = e.target.comment.value;
          handleAddComment(commentText);
          e.target.comment.value = "";
        }}
        className="flex items-center"
      >
        {/* Dummy Avatar */}
        <RxAvatar className="text-3xl mr-2" />

        {/* Textarea for Comment */}
        <textarea
          name="comment"
          placeholder="Add your comment..."
          className="w-full border p-2 rounded-md"
          required
        ></textarea>

        {/* Add Comment Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md"
        >
          Post
        </button>
      </form>

      <div>
        {/* Display existing comments */}
        {comments.map((comment) => (
          <div
            key={comment?._id}
            className={`my-2 relative flex flex-col border p-3 rounded-md hover:bg-gray-100 cursor-pointer ${
              selectedComment === comment._id ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex mb-2 items-center">
              {/* Avatar */}
              <RxAvatar className="text-2xl mr-2" />

              {/* Username, Timestamp, and Three dots */}
              <div className="flex items-center flex-grow">
                <div>
                  <strong className="mr-1">{comment?.userId?.username}</strong>
                  <span className="text-xs text-gray-500">
                    {calculateTimeAgo(comment.createdAt)}
                  </span>
                </div>
                <div
                  className="relative inline-block ml-auto"
                  onClick={() =>
                    setSelectedComment(
                      selectedComment === comment._id ? null : comment._id
                    )
                  }
                >
                  <BsThreeDotsVertical size={20} className="cursor-pointer" />
                  {selectedComment === comment._id && (
                    <div className="absolute right-0 top-0">
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-red-500 mr-2"
                      >
                        Delete
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => {
                          const newText = prompt(
                            "Enter new text",
                            comment.text
                          );
                          if (newText !== null) {
                            handleEditComment(comment._id, newText);
                          }
                        }}
                        className="text-blue-500"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Comment Text */}
            <div className="ml-10">
              <span>{comment?.text}</span>
            </div>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Comment;
