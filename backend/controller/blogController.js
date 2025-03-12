const connection = require("../config/db");
const uploadOnCloudinary = require("../utils/cloudinary");
const { v4: uuidv4 } = require("uuid");

exports.createPost = async (req, res) => {
  let { userId, title, content,category } = req.body;
  
  
  
  if (!title || !content || !category) {
    return res.status(400).json({ error: "All Filed Are Required" });
  }
  let postId = uuidv4();
  

  let q = `INSERT INTO posts(id,userId,title,content,category) VALUES(?,?,?,?,?)`;
  let values = [postId, userId, title, content,category];
  try {
    connection.query(q, values, (err, result) => {
      if (err) throw err;
      res.status(200).json({ message: "Post Create SuccesFully",result });
      
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
 
};

exports.userPost = (req, res) => {
  let { userId } = req.params;
  let q = `SELECT * FROM posts WHERE userId = ?`;
  try {
    connection.query(q, [userId], (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(400).json({ message: `Some Error like ${err}` });
  }
};

exports.post = (req, res) => {
  let postId = req.params.postId;
  let q = `SELECT * FROM posts WHERE id = ?`;
  try {
    connection.query(q, [postId], (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      // console.log(result);
      res.status(200).json(result[0]);
    });
  } catch (err) {
  
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.deletePost = (req, res) => {
  let postId = req.params.postId;
  //   console.log(postId);
  let q = `DELETE FROM posts WHERE id = ?`;
  try {
    connection.query(q, [postId], (err, result) => {
      if (err) throw err;
      res.status(200).json({ message: "Post Deleted SuccesFully" });
    });
  } catch (err) {
    
    res.status(400).json({ message: `Some Error like ${err}` });
  }
};
exports.homeBlog = (req, res) => {
  const q = `SELECT * FROM posts`;
  try {
    connection.query(q, (error, result) => {
      if (error) throw new Error(error);

      res.status(201).json({ blogs: result });
    });
  } catch (error) {
    res.status(500).json({ error: "Enternal Server Error" });
  }
};
