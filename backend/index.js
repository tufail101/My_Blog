const express = require("express");
const connection =require("./config/db");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const upload = require("./middlewares/multer.middlewares");
const uploadOnCloudinary = require("./utils/cloudinary");
require("dotenv").config();

const path = require("path");
const { error } = require("console");

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
app.post("/login", (req, res) => {
  let { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  let q = `SELECT * FROM user WHERE userName = '${userName}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      let user = result[0];

      if (!user) {
        console.log("Invalid User");
        res.json({ message: "Invalid User" });
      } else {
        // console.log(result[0]);
        if (password != user.password) {
          console.log("Unkonwn user");
        } else {
          console.log(user);
          res.json({
            message: "SuccesFully Login",
            userId: user.id,
            userName: user.name,
          });
          // res.json({user});
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});
app.post("/signup", (req, res) => {
  let { name, userName, email, password } = req.body;
  let id = uuidv4();
  if (!userName || !password || !email) {
    return res.status(400).json({ error: "Missing credentials" });
  }
  let q1 = `SELECT * FROM user WHERE userName = ?`;
  try {
    connection.query(q1, [userName], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        return res.status(400).json({ error: "Username already exists" });
      } else {
        let q2 = `INSERT INTO user (id,name,userName,email,password) VALUES(?,?,?,?,?)`;
        try {
          connection.query(
            q2,
            [id, name, userName, email, password],
            (err, result) => {
              if (err) throw err;
              res
                .status(201)
                .json({ message: "User registered successfully", userId: id });
            }
          );
        } catch (err) {
          console.log(err);
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});
app.post("/createPost",upload.single('image'), async(req, res) => {
  let { userId, title, content } = req.body;
  // console.log(img_url);
  if (!title || !content) {
    return res.status(400).json({ error: "All Filed Are Required" });
  }
  let postId = uuidv4();
  let img_url = null;
  try{
    if(req.file){
      const localFilePath = req.file.path;
      const cloudinaryRes =await uploadOnCloudinary(localFilePath);
      img_url = cloudinaryRes.secure_url;
    }
    
    let q = `INSERT INTO posts(id,userId,title,content,img_url) VALUES(?,?,?,?,?)`;
    let values = [postId, userId, title, content, img_url]
    try {
      connection.query(q, values, (err, result) => {
        
        if (err) throw err;
        console.log("Inserting Data: ", [postId, userId, title, content, img_url]);
        res.status(200).json({ message: "Post Create SuccesFully" });
        console.log(result);
        
      });
    } catch (err) {
      console.log(err);
    }
}catch(err){
  console.log(err);
  
}
});

app.get("/userPost/:userId",(req,res)=>{
  let userId = req.params;
  // console.log(userId);
  let q = `SELECT * FROM posts WHERE userId = ?`;
  try{
    connection.query(q,[userId],(err,result)=>{
      if(err) throw err;
      res.status(200).json(result);
      // console.log(result);
      
    })
  }catch(err){
    console.log(err);
    res.status(400).json({message:`Some Error like ${err}`})
  }

})
app.get("/post/:postId",(req,res)=>{
  let postId = req.params.postId;
  let q = `SELECT * FROM posts WHERE id = ?`;
  try {
    connection.query(q,[postId],(err,result) => {
      if (err) throw err;

      if(result.length === 0){
        return res.status(500).json({error:"Internal Server Error"})
      }
      // console.log(result);
      res.status(200).json(result[0]);
    })
  } catch (err) {
     console.error('SQL error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
})

app.listen(port, (req, res) => {
  console.log(`http://localhost:${port}`);
});
