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

// //cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// app.use(
//   session({
//     secret: process.env.JWT_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session()); // Add passport.session middleware

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next(); // dont forget this
// });

//routes
app.use(cors());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(express.json()); //body parser
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authControllers); //user routes
app.use("/blog", blogControllers);
app.use("/comments", commentControllers);

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
