const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: "modreneducation479@gmail.com",
      pass: "vxhj ergu wtxl fbdc",
    },
  });

module.exports = transporter;