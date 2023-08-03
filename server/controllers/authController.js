import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(4).max(20),
  email: z.string().email(),
  password: z.string().min(6),
  photo: z.string().optional(),
});

export const register = async (req, res) => {
  try {
    const userData = userSchema.parse(req.body);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userData.password, salt);

    const newUser = new User({
      username: userData.username,
      email: userData.email,
      password: hash,
      photo: userData.photo,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "Successfully registered", data: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Failed to register, try again", error: error.message });
  }
};
  


export const login = async (req, res) => {
  try {
    const userData = userSchema.parse(req.body);

    const { email, password: inputPassword } = userData; // Renamed 'password' to 'inputPassword'
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(inputPassword, user.password); // Renamed 'password' to 'inputPassword'

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const { password, role, ...rest } = user._doc;
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    }).status(200).json({
      success: true,
      token,
      message: "Successfully logged in",
      data: { ...rest },
      role,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Failed to login, try again", error: error.message });
  }
};
