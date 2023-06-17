import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const { userName, userEmail, userMessage } = req.body;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "brandi22@ethereal.email",
      pass: "mMn5jSkJVgXk2jAKhB",
    },
  });

  // Set up the email data
  const mailOptions = {
    from: userEmail,
    to: `brandi22@ethereal.email, mdp020479@gmail.com`,
    subject: "New Contact Form Submission",
    text: `Name: ${userName}\nEmail: ${userEmail}\nMessage: ${userMessage}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailOptions));
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
}
