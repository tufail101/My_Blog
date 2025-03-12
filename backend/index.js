const express = require("express");
const connection = require("./config/db");
const cors = require("cors");
const upload = require("./middlewares/multer.middlewares");
const userController = require("./controller/userController");
const blogController = require("./controller/blogController");

const path = require("path");
const app = express();
const port = process.env.PORT;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: ["http://127.0.0.1:5500","https://my-bl0gg.netlify.app", "https://my-blog-w41s.onrender.com"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());

app.get("/", (req, res) => {
  res.send("i am home");
});
app.post("/login", userController.login);
app.post(
  "/sendSignINOtp",
  upload.single("image"),
  userController.sendSignINOtp
);
app.post("/createPost", blogController.createPost);
app.get("/userPost/:userId", blogController.userPost);
app.get("/post/:postId", blogController.post);
app.delete("/deletePost/:postId", blogController.deletePost);
app.post("/sendOtp", userController.sendOtp);
app.post("/changePassword", userController.changePassword);
app.get("/homeBlod", blogController.homeBlog);
app.post("/userConatct", userController.contact);
app.post("/signIN", userController.signIN);

app.listen(port, (req, res) => {
  console.log(`http://localhost:${port}`);
});
