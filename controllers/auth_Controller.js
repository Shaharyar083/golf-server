const User_Modal = require("../models/auth_Model");
const { hashPassword, verifyPassword } = require("../utils/bcrypt");
const { sendMail } = require("../utils/nodemailer");
const { generateString } = require("../utils/random");
const { generateAccessToken } = require("../utils/jsonWebToken");

// --------------- Register API -------------------------------
const register = async (req, res) => {
  let { username, email, password, voucher } = req.body;

  try {
    const userNameExist = await User_Modal.findOne({ username });

    if (userNameExist) {
      return res.status(302).json({
        message: "Username exist!",
      });
    }

    const emailExist = await User_Modal.findOne({ email });

    // const emailExist = await User_Modal.findOne({
    //   email: { $regex: `^${email}$`, $options: "i" },
    // });

    if (emailExist) {
      return res.status(302).json({
        message: "Email exist!",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User_Modal({
      username,
      email,
      password: hashedPassword,
      voucher,
    });

    await user.save();
    return res.status(200).json({ message: "User register successfully" });
  } catch (err) {
    res.status(500).json({ err, message: "Server error at register!" });
  }
};

// --------------- Login API ----------------------------------
const login = async (req, res) => {
  let { username, password, admin } = req.body;
  try {
    const user = await User_Modal.findOne({
      username,
      isAdmin: admin,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials!",
      });
    }

    const verifiedPassword = await verifyPassword(password, user.password);

    if (!verifiedPassword) {
      return res.status(401).json({
        message: "Invalid credentials!",
      });
    }

    const access_token = generateAccessToken({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      type: user.type,
    });

    return res
      .status(200)
      .json({ message: "login successfully", access_token });
  } catch (err) {
    res.status(500).json({ err, message: "Server error at login!" });
  }
};

// --------------- Forgot Password API ------------------------
const forgotPassword = async (req, res) => {
  let { email } = req.body;

  try {
    const timeAfter15Mint = new Date();
    timeAfter15Mint.setMinutes(timeAfter15Mint.getMinutes() + 15);

    const user = await User_Modal.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email not found!" });
    }

    const randomString = generateString(25);

    const link = `${process.env.DOMAIN}/forgot-password/${user._id}${randomString}`;

    // nodemailer argument
    const receiverEmail = "shaheryardogar50@gmail.com";
    const subject = "Reset Password";
    const text = "Reset Password";
    const html = `<p> Open this link for reset password...</p>
    <a href="${link}" target="_blank"> ${link} </a>`;

    const mailSended = await sendMail({ receiverEmail, subject, text, html });

    if (!mailSended) {
      return res
        .status(401)
        .json({ message: "Please try again email is not sent!" });
    }

    // TODO: save link and expire in user collection

    return res.status(200).json({ message: "Reset link sent to your email" });
  } catch (err) {
    res.status(400).json(err);
  }
};

// --------------- Change Password API ------------------------
const changePassword = async (req, res) => {
  let { email, oldPassword, newPassword } = req.body;

  try {
    const user = await User_Modal.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    const verfiedPassword = await verifyPassword(oldPassword, user.password);
    if (!verfiedPassword) {
      return res.status(401).json({ message: "Old password not match!" });
    }

    const hashedPassword = await hashPassword(newPassword);

    const updatePassword = await User_Modal.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { returnOriginal: false }
    );

    return res
      .status(200)
      .json({ message: "Set new password", updatePassword });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { login, register, forgotPassword, changePassword };
