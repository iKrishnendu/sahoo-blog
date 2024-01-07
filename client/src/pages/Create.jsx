import React, { useState } from "react";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { request } from "../utils/fetchApi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "react-quill/dist/quill.snow.css";
import Editor from "../components/Editor";
import ReactQuill from "react-quill";

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
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/blog`,
        options
      );

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
        <div className="container">
          <Link to="/" className="flex items-center gap-2 py-2">
            <AiOutlineArrowLeft /> Go Back
          </Link>
          <div className="content">
            <div className="sm:w-80 py-3 rounded-md">
              <h1 className="text-left text-2xl pb-2">
                <b>Create Blog</b>
              </h1>
              <p className="text-sm">
                Crafting Words, Sharing Stories: Your Journey to Blogging Begins
                Here.
              </p>
            </div>
            <form
              className="form flex flex-col py-2 gap-3"
              onSubmit={handleCreateBlog}
              encType="multipart/form-data"
            >
              <div className="form-group flex flex-col gap-3">
                <label>Title:</label>
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
              <div className="form-group flex flex-col gap-3">
                <label>Description:</label>
                <Editor
                  value={formData.desc}
                  theme="snow"
                  onChange={(e) => setFormData({ ...formData, desc: e })}
                />
              </div>
              <div className="form-group">
                <label>Category:</label>
                <select
                  value={formData.category}
                  className="border-2 border-black-500 rounded-lg p-1 m-1"
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
              <div className="form-group flex flex-col gap-3">
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
                  <span className="flex flex-row gap-1 items-center">
                    <p className="file-info">{formData.img.name} </p>
                    <AiOutlineCloseCircle onClick={handleCloseImg} />
                  </span>
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
