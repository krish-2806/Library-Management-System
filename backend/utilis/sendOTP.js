// import { createTransport } from "nodemailer";

// const sendOTP = async (email, otp) =>{
//     const transporter = createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//         }
//     })
//     await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: "Your One-Time-Password from Shelfwise Library",
//         html: `<pre>Hello,

// <strong><u>${otp}</u></strong> is your one-time password (OTP) for the Shelfwise Library.
        
// The code was requested from the Shelfwise Library. It will be valid for 5 minutes.
        
// Enjoy the website!

// Shelfwise Library's Team</pre>`
//     })
// }
// export default sendOTP;


import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4, // Force IPv4
});

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your One-Time Password from Shelfwise Library",
    html: `<h2>Your OTP is ${otp}</h2>`,
  });
};

export default sendOTP;