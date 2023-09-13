const express=require('express');
const nodemailer=require('nodemailer')




const app=express();
app.use(express.json());
app.listen(3000, () => {
    console.log(`Server is running on port 3000}`);
  });
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "siddharth.goel2105@gmail.com", // generated ethereal user
      pass: "wepf behb vvxh vvef", // generated ethereal password
    },
  });
const sendEmail=async (receptent)=>{
    // const { email, subject, message } = req.body;

    const email=receptent;
    const subject = "This is a test email"
    const message="Hello how are you"
  console.log(email, subject, message);

  const mailOptions = {
    from:"siddharth.goel2105@gmail.com",
    to: receptent,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
})
}
app.get("/sendEmail", (req,res)=>{
    sendEmail("halepik304@twugg.com");
} )