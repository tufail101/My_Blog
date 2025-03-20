const connection = require("../config/db");
const uploadOnCloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/multer.middlewares");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const transporter = require("../utils/nodemailer");
const { text } = require("express");

exports.login = (req, res) => {
  let { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(400).json({ error: "Missing credentials" });
  }
  let q = `SELECT * FROM users WHERE userName = '${userName}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      if (!result || result.length === 0) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
      let user = result[0];

      if (!user) {
        return res.json({ message: "Invalid User" });
      } 
      const matchPassword = bcrypt.compareSync(password,user.password);
      if(!matchPassword){
        return res.status(404).json({message : "Worng Password"});
      }
          return res.json({
            message: "SuccesFully Login",
            userId: user.id,
            name: user.name,
            userName: user.userName,
            userEmail: user.email,
          });
        
      
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.sendSignINOtp = async (req, res) => {
  const { name, userName, email } = req.body;
  const id = uuidv4();

  if (!userName || !email) {
    return res.status(400).json({ error: "Missing credentials" });
  }
  try {
    const q1 = "SELECT * FROM users WHERE userName = ?";
    connection.query(q1, [userName], async (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        return res.status(400).json({ error: "Username already exists" });
      }
      const generateOTP = () =>
        Math.floor(100000 + Math.random() * 900000).toString();
      const otp = generateOTP();
      const mailOption = {
        from: "gco540203@gmail.com",
        to: email,
        subject: "Your Sign Up OTP Code",
        text: `Your Sign Up OTP is: ${otp}`,
        html: `<p>Your Sign Up OTP code is: <b>${otp}</b></p>`,
      };
      await transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          return res.status(500).json({
            message: "Failed to send OTP. Please try again later.",
            error,
          });
        } else {
          res.status(200).json({ message: "OTP Sended On Your Mail", otp });
        }
      });
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.signIN = async (req, res) => {
  const { name, userName, email, password } = req.body;
  id = uuidv4();
  const hashPassword = bcrypt.hashSync(password,10);
  try {
    const q2 =
      "INSERT INTO users (id, name, userName, email, password) VALUES (?, ?, ?, ?, ?)";

    connection.query(q2, [id, name, userName, email, hashPassword], (err) => {
      if (err) throw err;

      return res
        .status(201)
        .json({ message: "User registered successfully", userId: id });
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.sendOtp = async (req, res) => {
  const { email, userName } = req.body;

  if (!email || !userName) {
    return res.status(400).json({ message: "Email And User Name is required" });
  }
  try {
    const q = `SELECT * FROM users WHERE userName = ?`;
    connection.query(q, [userName], async (error, result) => {
      if (error) throw new Error(error);
      const user = result[0];
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      const matchEmailFuncton = (userEmail , dbEmail) => {
        return userEmail === dbEmail;
      }
      const matchEmail = matchEmailFuncton(email,user.email)
      if(!matchEmail){
        return res.status(404).json({message : "Wrong Email"});
      }
      const generateOTP = () =>
        Math.floor(100000 + Math.random() * 900000).toString();
      const otp = generateOTP();

      const mailOption = {
        from: "gco540203@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}`,
        html: `<p>Your OTP code is: <b>${otp}</b></p>`,
      };
      await transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          return res.status(500).json({
            message: "Failed to send OTP. Please try again later.",
            error,
          });
        } else {
          res.status(200).json({ message: "OTP Sended On Your Mail", otp });
        }
      });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};
exports.changePassword = async (req, res) => {
  const { userName, password } = req.body;
  const hashPassword = bcrypt.hashSync(password,10);
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  try {
    const q = `SELECT * FROM users WHERE userName= ?`;
    connection.query(q, [userName], (error, result) => {
      if (error) throw error;
      const user = result[0];
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      try {
        const q2 = `UPDATE users SET password = ? WHERE userName = ?`;
        connection.query(q2, [hashPassword, userName], (error, result) => {
          if (error) throw error;
          res.status(200).json({ message: "Password changed successfully" });
        });
      } catch (error) {
        console.error("Error changing password:", error);
        res
          .status(500)
          .json({ message: "Something went wrong, please try again later" });
      }
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};

exports.contact = async (req, res) => {
  const { name, email, message } = req.body;
  const mailOption = {
    from: `"${name}" <${email}>`,
    replyTo: email,
    to: "blogm153@gmail.com",
    subject: `New Contact from ${name}`,
    text: message,
    html: `<p><strong>Name:</strong> ${name}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Message:</strong></p>
         <p>${message}</p>`,
  };
  try {
    await transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.error("Error sending feedback:", error);
        res
          .status(500)
          .json({ success: false, message: "Failed to send Message" });
      }
      res
        .status(200)
        .json({ success: true, message: "Message sent successfully!" });
    });
  } catch (error) {
    console.error("Error sending feedback:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};

exports.writerProfile = (req,res) => {
  const userName = req.params.userName;
  const q = `SELECT * FROM users WHERE userName = ?`;
  try {
    connection.query(q,userName,(error,result) => {
      if(error){
        console.log(error);
        
        return res.status(500).json({message:"Server Error"});
      }
      const user = result[0];
     
      
      return res.status(201).json({user});
    })
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({message:"Server Error"});
  }
  
}