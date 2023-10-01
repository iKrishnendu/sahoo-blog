import React from "react";
import { Link } from "react-router-dom";

export const PostCard = ({ _id, title, desc, category, image }) => {
  return (
    <div>
      <div className="post shadow-lg bg-[#F3F3F2] shadow-blue-100 rounded-lg p-2 h-96 overflow-hidden">
        <div key={_id} className="">
          <div className="overflow-hidden rounded-lg"></div>
          <Link to={`/blogDetails/${_id}`}>
            <img
              src={image.url}
              className="w-full cursor-pointer transition duration-200 ease-in-out transform hover:scale-105 rounded-lg h-60"
            />
            <div className="uppercase tracking-wide py-2 text-sm text-indigo-500 font-semibold">
              {category}
            </div>

            <h2 className="font-medium truncate">{title}</h2>
            <p>{desc}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
