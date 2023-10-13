const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "globalsolutionsprefabriquees@gmail.com",
//     pass: "pcfcdjiscbyojdww",
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "cheloboraled@gmail.com",
    pass: "czkowjuturqmgpeh",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
module.exports = transporter;
