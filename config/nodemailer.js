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

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "cheloboraled@gmail.com",
//     pass: "czkowjuturqmgpeh",
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

const transporter = nodemailer.createTransport({
  host: "mail.globalsolutionsprefabriquees.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@globalsolutionsprefabriquees.com",
    pass: "Globalsp2024",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// const transporter = nodemailer.createTransport(
//   `smtps://info@almartindev.com:Martin0902@almartindev.com:465`
// );
module.exports = transporter;
