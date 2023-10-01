const blogControllers = require("express").Router();
const Blog = require("../models/Blog");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const verifyToken = require("../middlewares/verifyToken");
// const cloudinary = require("cloudinary");

blogControllers.get("/getAll", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("userId", "-password");
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

blogControllers.get("/find/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "userId",
      "-password"
    );
    blog.views += 1;
    await blog.save();
    return res.status(200).json(blog);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

blogControllers.get("/featured", async (req, res) => {
  try {
    const blogs = await Blog.find({ featured: true })
      .populate("userId", "password")
      .limit(3);
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json(err);
  }
});

blogControllers.post(
  "/",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, desc, category } = req.body;
      // Upload image to cloudinary
      if (req.file && req.file.path) {
        const myCloud = await cloudinary.uploader.upload(req.file.path);
        // Create new user
        let blog = new Blog({
          title: title,
          desc: desc,
          category: category,
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          userId: req.user.id,
        });
        // Save user
        await blog.save();
        console.log(blog);
        return res.status(201).json(blog);
      } else {
        return res.status(500).json({ msg: "No image uploaded" });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

// blogControllers.post("/", verifyToken, async (req, res) => {
//   // upload(req, res, async function (err) {
//   //   if (err) {
//   //     return res.send("error uploading file");
//   //   }
//   try {
//     const fileStr = req.file.path;
//     console.log(fileStr);
//     const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
//       upload_preset: "blog-image",
//     });
//     console.log(uploadedResponse);
//     return res.send("file is Uploaded");
//   } catch {
//     return res.status(500).json(error);
//   }

// try {
//   Upload
//   const blog = await Blog.create({ ...req.body, userId: req.user.id });
//   return res.status(201).json(blog);
// } catch (error) {
//   return res.status(500).json(error);
// }

// try {
//   const { title, desc, image, category } = req.body;

//   const myCloud = await cloudinary.v2.uploader.upload(image, {
//     folder: "blog-image",
//   });

//   const blogData = {
//     title: title,
//     desc: desc,
//     category: category,
//     image: {
//       public_id: myCloud.public_id,
//       url: myCloud.secure_url,
//     },
//     userId: req.user.id,
//   };

//   const blog = await Blog.create(blogData);
//   return res.status(201).json(blog);
// } catch (error) {
//   return res.status(500).json(error.message);
// }
// });

blogControllers.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json("You can update only your blog!");
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    ).populate("userId", "-password");
    return res.status(200).json(updatedBlog);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

blogControllers.put("/like/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.likes.includes(req.user.id)) {
      blog.likes = blog.likes.filter((userId) => userId !== req.user.id);
      await blog.save();
      return res.status(200).json({ msg: "Successfully disliked the blog" });
    } else {
      blog.likes.push(req.user.id);
      await blog.save();
      return res.status(200).json({ msg: "Successfully liked the blog" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

blogControllers.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    // if (blog.userId === req.user.id) {
    //   await blog.delete();
    return res.status(200).json("Blog has been deleted...");
    // }

    return res.status(403).json("You can delete only your blog!");
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = blogControllers;
