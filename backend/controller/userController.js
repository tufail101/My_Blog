const connection = require("../config/db");
const uploadOnCloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/multer.middlewares");
const { v4: uuidv4 } = require("uuid");

exports.login = (req, res) => {
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
};

exports.signIN = async (req, res) => {
  const { name, userName, email, password } = req.body;
  const id = uuidv4();

  if (!userName || !password || !email) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  let pic_img = null;
  try {
    if (req.file) {
      const localFilePath = req.file.path;
      let cloudinaryRes = await uploadOnCloudinary(localFilePath);
      if (!cloudinaryRes || !cloudinaryRes.secure_url) {
        return res.status(500).json({ error: "Failed to upload image" });
      }
      pic_img = cloudinaryRes.secure_url;
    }
    try {
      const q1 = "SELECT * FROM user WHERE userName = ?";
      connection.query(q1, [userName], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
          return res.status(400).json({ error: "Username already exists" });
        }

        const q2 =
          "INSERT INTO user (id, name, userName, email, password, pic_url) VALUES (?, ?, ?, ?, ?, ?)";

        connection.query(
          q2,
          [id, name, userName, email, password, pic_img],
          (err) => {
            if (err) throw err;

            return res
              .status(201)
              .json({ message: "User registered successfully", userId: id });
          }
        );
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};
