const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Tạo transporter cho Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "phanduclam02@gmail.com",
    pass: "qoqh nvvq wvlm rzin",
  },
});

// Hàm để gửi email
const sendEmail = async (options) => {
  const mailOptions = {
    from: "Bach Khoa Volunteer",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

// Hàm để tạo token
const createResetToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

module.exports = {
  sendEmail,
  createResetToken,
};
