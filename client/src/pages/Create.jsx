import React, { useState, useEffect } from "react";

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
  const [newCategory, setNewCategory] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await request("/categories", "GET");
        // Extract only the 'name' from each category
        const categoryNames = data.map((category) => category.name);
        setCategories(categoryNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

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
          navigate(`/blog-details/${data._id}`);
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
  const handleAddCategory = async () => {
    if (newCategory.trim() !== "" && !categories.includes(newCategory)) {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: newCategory }),
        };

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/categories`,
          options
        );

        if (response.ok) {
          setCategories([...categories, newCategory]);
          setFormData({ ...formData, category: newCategory });
          setNewCategory("");
        } else {
          console.error("Failed to add category:", response.status);
        }
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

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
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="New Category..."
                    value={newCategory}
                    className="border-2 border-black-500 rounded-lg p-1"
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="bg-green-500 text-white px-2 py-1 rounded-md"
                  >
                    Add
                  </button>
                </div>
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
