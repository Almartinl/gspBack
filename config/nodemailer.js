const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "cheloboraled@gmail.com",
    pass: "zxcxpomblitzqcvu",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
