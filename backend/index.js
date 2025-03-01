const express = require("express");
const connection = require("./config/db");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const upload = require("./middlewares/multer.middlewares");
const uploadOnCloudinary = require("./utils/cloudinary");
require("dotenv").config();
const userController =  require("./controller/userController");
const blogModel = require("./controller/blogModel");

const path = require("path");
const app = express();
const port = process.env.PORT;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("i am home");
});
app.post("/login",userController.login )
app.post("/signup", upload.single("image"), userController.signIN)
app.post("/createPost", upload.single("image"),blogModel.createPost );
app.get("/userPost/:userId",blogModel.userPost);
app.get("/post/:postId", blogModel.post);

app.listen(port, (req, res) => {
  console.log(`http://localhost:${port}`);
});
