import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/User.js";

dotenv.config();

const Register = async (req, res) => {
  const { email, firstname, lastname, username, password } = req.body;
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: "This email is already in use" });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({
      firstname,
      lastname,
      username,
      email,
      password: hashPassword,
    });
    const result = await newUser.save();
    result._doc.password = undefined;
    return res.status(201).json({ success: true, ...result._doc });
  } catch (error) {
    console.error("Error during sign up:", error);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return res.json({ error: "User not found" });
    }

    const username = userExist.username;
    //const role = userExist.role;

    // Compare passwords
    const match = bcrypt.compare(password, userExist.password);
    if (!match) {
      return res.json({ error: "Incorrect password. Try again" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email: userExist.email,
        id: userExist._id,
        username: username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    const user = { ...userExist._doc, password: undefined };
    return res.status(201).json({ success: true, user, token });
  } catch (err) {
    console.error("Error in login:", err);
    return res.status(500).json({ error: err.message });
  }
};

const Auth = (req, res) => {
  return res.status(201).json({ success: true, user: { ...req.user._doc } });
};

const credentialsChange = async (req, res) => {
  const { newPassword, email } = req.body;

  try {
    const hashPassword = await bcrypt.hash(newPassword, 12);

    const user = await UserModel.findOneAndUpdate(
      { email },
      { $set: { password: hashPassword } },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ error: `User under ${email} not found` });
    }

    res
      .status(200)
      .json({ success: true, message: "Password changed successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

export { Auth, Login, Register, credentialsChange };
