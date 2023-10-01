import React, { useState } from "react";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { request } from "../utils/fetchApi";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Create = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    img: null,
    category: "",
  });
  const navigate = useNavigate();

  const categories = [
    "nature",
    "music",
    "travel",
    "design",
    "programming",
    "fun",
    "fashion",
  ];

  const onChangeFile = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0],
    });
  };

  const handleCloseImg = () => {
    setFormData({
      ...formData,
      img: null,
    });
  };
  const handleCreateBlog = async (e) => {
    e.preventDefault();

    try {
      const blogData = new FormData();

      // Append all form data to blogData
      blogData.append("title", formData.title);
      blogData.append("desc", formData.desc);
      blogData.append("category", formData.category);
      blogData.append("image", formData.img);

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: blogData,
      };

      // Send the request to your backend
      const response = await fetch("http://localhost:5000/blog", options);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data && data._id) {
          navigate(`/blogDetails/${data._id}`);
        } else {
          console.error("Invalid response data");
        }
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleCreateBlog = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const blogData = new FormData();

  //     // Append all form data to blogData
  //     blogData.append("title", formData.title);
  //     blogData.append("desc", formData.desc);
  //     blogData.append("category", formData.category);
  //     blogData.append("image", formData.img);
  //     // blogData.append("userId", user._id);

  //     console.log(
  //       formData.title,
  //       formData.desc,
  //       formData.category,
  //       formData.img
  //     );
  //     const options = {
  //       // "Content-Type": "application/json",
  //       // "Content-Type": "multipart/form-data",
  //       Authorization: `Bearer ${token}`,
  //     };
  //     console.log(options);
  //     const data = await request("/blog", "POST", options, blogData);
  //     console.log(data);
  //     if (data.ok) {
  //       navigate(`/blogDetails/${data._id}`);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <div>
        <div>
          <Link to="/" className="flex items-center gap-2 py-2">
            <AiOutlineArrowLeft /> Go Back
          </Link>
          <div className="grid place-content-center mt-6 p-2 ">
            <div className="sm:w-80 py-3 rounded-md">
              <h1 className="text-left text-2xl pb-2">
                <b>Create New Blog</b>
              </h1>
              <p className="text-sm">
                Crafting Words, Sharing Stories: Your Journey to Blogging Begins
                Here.
              </p>
            </div>

            <form
              className="flex flex-col py-2 gap-3"
              onSubmit={handleCreateBlog}
              encType="multipart/form-data"
            >
              <div className="flex flex-col gap-1">
                <label>Title: </label>
                <input
                  type="text"
                  placeholder="Title..."
                  value={formData.title}
                  className="border-2 border-black-500 rounded-lg p-1"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Description: </label>
                <input
                  type="text"
                  placeholder="Description..."
                  value={formData.desc}
                  className="border-2 border-black-500 rounded-lg p-1"
                  onChange={(e) =>
                    setFormData({ ...formData, desc: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Category: </label>
                <select
                  value={formData.category}
                  className="border-2 border-black-500 rounded-lg p-1"
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="image">
                  Image: <span>Upload here</span>
                </label>
                <input
                  id="image"
                  type="file"
                  onChange={onChangeFile}
                  style={{ display: "none" }}
                />
                {formData.img && (
                  <p className="flex items-center py-2 gap-2">
                    {formData.img.name}{" "}
                    <AiOutlineCloseCircle onClick={handleCloseImg} />
                  </p>
                )}
              </div>

              <button
                className="bg-gray-800 p-1 px-2 rounded-sm text-white shadow-sm"
                type="submit"
              >
                Submit form
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
