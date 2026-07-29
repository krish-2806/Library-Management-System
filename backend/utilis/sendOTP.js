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

import { createTransport } from "nodemailer";

const sendOTP = async (email, otp) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS Exists:", !!process.env.EMAIL_PASS);

  await transporter.verify();
  console.log("SMTP Connected Successfully");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your One-Time Password from Shelfwise Library",
    html: `<h2>Your OTP is: ${otp}</h2>`,
  });
};

export default sendOTP;