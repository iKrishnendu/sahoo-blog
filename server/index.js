const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const authControllers = require("./controllers/authControllers");
const blogControllers = require("./controllers/blogControllers");
const commentControllers = require("./controllers/commentControllers");
const bodyParser = require("body-parser");
const session = require("express-session"); // Add express-session
const passport = require("passport"); //
const categoryControllers = require("./controllers/categoryController");
// const multer = require("multer");
const app = express();
// const cloudinary = require("cloudinary").v2;
//connect db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//routes
app.use(cors());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(express.json()); //body parser
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authControllers); //user routes
app.use("/blog", blogControllers);
app.use("/comments", commentControllers);
app.use("/categories", categoryControllers);

// multer
// const storage = multer.diskStorage({
//   // destination: function (req, file, cb) {
//   //   cb(null, "public/images");
//   // },
//   filename: function (req, file, cb) {
//     cb(null, req.body.filename);
//   },
// });

// const upload = multer({
//   storage: storage,
// }).single("image");

// app.post("/upload", upload.single("image"), async (req, res) => {
//   return res.status(200).json({ msg: "Successfully uploaded" });
// });

//connect server
app.listen(process.env.PORT, () =>
  console.log("server started on PORT 5000...")
);
