const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: "blogm153@gmail.com",
      pass: "njlk pfpp nnhh uqic",
    },
  });

module.exports = transporter;