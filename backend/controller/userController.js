const connection = require("../config/db");
const uploadOnCloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/multer.middlewares");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const transporter = require("../utils/nodemailer");
const { text } = require("express");

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

  // let pic_img = null;
  // try {
  //   if (req.file) {
  //     const localFilePath = req.file.path;
  //     let cloudinaryRes = await uploadOnCloudinary(localFilePath);
  //     if (!cloudinaryRes || !cloudinaryRes.secure_url) {
  //       return res.status(500).json({ error: "Failed to upload image" });
  //     }
  //     pic_img = cloudinaryRes.secure_url;
  //   }
    try {
      const q1 = "SELECT * FROM user WHERE userName = ?";
      connection.query(q1, [userName], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
          return res.status(400).json({ error: "Username already exists" });
        }

        const q2 =
          "INSERT INTO user (id, name, userName, email, password) VALUES (?, ?, ?, ?, ?)";

        connection.query(
          q2,
          [id, name, userName, email, password],
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
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ error: "internal server error" });
  // }
};
exports.sendOtp =async (req,res) => {
  const {email,userName} = req.body;
  console.log(email,userName);
  
  if (!email || !userName) {
    return res.status(400).json({ message: 'Email And User Name is required' });
  }
  try {
    const q = `SELECT * FROM user WHERE userName = ?`;
    connection.query(q,[userName],async (error,result)=>{
      if(error) throw new Error(error);
      const user = result[0];
      if(!user){
        return res.status(404).json({message : "User Not Found"})
      }
      const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
      const otp = generateOTP();
  
  const mailOption = {
    from : "gco540203@gmail.com",
    to : email,
    subject :  'Your OTP Code',
    text : `Your OTP is: ${otp}`,
    html: `<p>Your OTP code is: <b>${otp}</b></p>`

  };
  await transporter.sendMail(mailOption,(error,info)=>{
    if(error){
      return res.status(500).json({ message: 'Failed to send OTP. Please try again later.',error });
      console.log(error);
      
    }
    else{
      console.log(info.response);
      res.status(200).json({message:"OTP Sended On Your Mail",otp });
      
    }
  })
    })
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Something went wrong, please try again later' });
  }
  
};
exports.changePassword = async (req,res) => {
  const {userName,password} = req.body;
  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }
  try {
    const q = `SELECT * FROM user WHERE userName= ?`;
    connection.query(q,[userName],(error,result) => {
      if(error) throw error;
      const user = result[0];
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      try {
        const q2 =  `UPDATE user SET password = ? WHERE userName = ?`;
        connection.query(q2,[password,userName],(error,result)=>{
          if(error) throw error;
          res.status(200).json({ message: 'Password changed successfully' });
        })
      } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Something went wrong, please try again later' });
      }
    })
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Something went wrong, please try again later' });
  }

}