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
  const {category = "All" , searchQuery} = req.query;
  
  
  let q = ``;
  let queryParams = [];
  if(category === "All"){
    q = `SELECT posts.*, users.userName FROM posts JOIN users ON posts.userid = users.id WHERE 1=1`;
  }
  if(category !== "All"){
    q = `SELECT posts.*, users.userName FROM posts JOIN users ON posts.userid = users.id WHERE category = ?`
   queryParams.push(category)
  }
  if(searchQuery){
    q = `SELECT posts.*, users.username  FROM posts JOIN users ON posts.userid = users.id WHERE title LIKE ? OR content LIKE ?`;
    queryParams.push(`%${searchQuery}%`, `%${searchQuery}%`);
  }
  try {
    connection.query(q,queryParams ,(error, result) => {
      if (error) throw new Error(error);
      if (result.length === 0) {
        return res.status(404).json({ message: "No posts found for this category or search query." });
      }
        res.status(201).json({ blogs: result });
      
      
    });
  } catch (error) {
    res.status(500).json({ error: "Enternal Server Error" });
  }
  
};

exports.writerPost = (req,res) => {
  const {userId} = req.params;
  console.log(req.params);
  
  const q = `SELECT * FROM posts WHERE userId = ?`;
  try {
    connection.query(q,userId,(error,result) => {
      if(error){
        return res.status(500).json({message : "Internal Servar Error "});
      }
      
      return res.status(201).json({blogs:result})
      
    })
  } catch (error) {
    return res.status(500).json({message : "Internal Servar Error "});
  }
  
}
exports.showWriterBlog = (req, res) => {
  const { userName } = req.params;
  const q1 = `SELECT * FROM users WHERE userName = ?`;

  connection.query(q1, [userName], (error, userResult) => {
    if (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (userResult.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = userResult[0].id; 

    const q2 = `SELECT * FROM posts WHERE userId = ?`;
    connection.query(q2, [userId], (error, postResult) => {
      if (error) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.status(200).json(postResult);
    });
  });
};