import React from "react";
import { Link } from "react-router-dom";

const RecommendedPosts = () => {
  // Dummy recommended posts data (replace with your actual data)
  const recommendedPosts = [
    { id: 1, title: "Recommended Post 1" },
    { id: 2, title: "Recommended Post 2" },
    { id: 3, title: "Recommended Post 3" },
  ];

  return (
    <div className="bg-white p-5 rounded-md shadow-md mt-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">
        Recommended Posts
      </h3>
      <ul>
        {recommendedPosts.map((post) => (
          <li key={post.id} className="mb-4">
            <Link
              to={`/post/${post.id}`}
              className="block p-4 rounded-md border hover:border-gray-400 transition duration-300"
            >
              <h4 className="text-lg font-semibold text-gray-800">
                {post.title}
              </h4>
              <p className="text-sm text-gray-600 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedPosts;
