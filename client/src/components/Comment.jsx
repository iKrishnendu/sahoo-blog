import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { request } from "../utils/fetchApi";

const Comment = ({ blogId, token }) => {
  const [comments, setComments] = useState([]);
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
  // const handleAddComment = async (commentText) => {
  //   console.log(commentText);
  //   try {
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ userId: user._id, text: commentText }),
  //     };

  //     const newComment = await request(`/comments/${blogId}`, options);

  //     setComments((prevComments) => [...prevComments, newComment]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleAddComment = async (commentText) => {
    console.log(commentText);
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user._id, text: commentText }),
      };

      // Assuming your server is running locally on http://localhost:5000
      const url = "http://localhost:5000/comments/" + blogId;
      // const url = "https://sahoo-blog-server.vercel.app/comments/" + blogId;
      const response = await fetch(url, options);
      const newComment = await response.json();

      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-4">Comments</h2>
      <div>
        {/* Display existing comments */}
        {comments.map((comment) => (
          <div key={comment?._id} className="my-2">
            <strong>{comment?.userId?.username} : </strong> {comment?.text}
          </div>
        ))}
      </div>
      <div>
        {/* Add new comment form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const commentText = e.target.comment.value;
            handleAddComment(commentText);
            e.target.comment.value = "";
          }}
        >
          <textarea
            name="comment"
            placeholder="Add your comment..."
            className="w-full border p-2"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-2"
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
