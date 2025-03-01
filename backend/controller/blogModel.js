const connection = require("../config/db");
const uploadOnCloudinary = require("../utils/cloudinary");

exports.createPost = async (req, res) => {
  let { userId, title, content } = req.body;
  // let img_url = req.body.img_url || null;
  if (!title || !content) {
    return res.status(400).json({ error: "All Filed Are Required" });
  }
  let postId = uuidv4();
  let img_url = null;
  try {
    if (req.file) {
      const localFilePath = req.file.path;
      console.log(localFilePath);
      const cloudinaryRes = await uploadOnCloudinary(localFilePath);
      img_url = cloudinaryRes.secure_url;
      console.log(img_url);
    }

    let q = `INSERT INTO posts(id,userId,title,content,img_url) VALUES(?,?,?,?,?)`;
    let values = [postId, userId, title, content, img_url];
    try {
      connection.query(q, values, (err, result) => {
        if (err) throw err;
        console.log("Inserting Data: ", [
          postId,
          userId,
          title,
          content,
          img_url,
        ]);
        res.status(200).json({ message: "Post Create SuccesFully" });
        console.log(result);
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.userPost = (req, res) => {
  let userId = req.params;
  // console.log(userId);
  let q = `SELECT * FROM posts WHERE userId = ?`;
  try {
    connection.query(q, [userId], (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
      // console.log(result);
    });
  } catch (err) {
    console.log(err);
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
    console.error("SQL error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
