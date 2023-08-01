import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({ username: req.body.username, email: req.body.email, password: hash, photo: req.body.photo});
      await newUser.save();
      res.status(201).json({ success: true, message: "Successfully registered", data: newUser });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ success: false, message: "Failed to register, try again", error: error.message });
    }
  };
  




  export const login = async (req, res) => {
  try {
    const { email, password: inputPassword } = req.body; // Renamed 'password' to 'inputPassword'
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
