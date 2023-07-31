import User from "../models/User.js";

export const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({ username: req.body.username, email: req.body.email, password: hash, photo: req.body.photo});
      await newUser.save();
      res.status(201).json({ success: true, message: "Successfully registered", data: newUser });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to register, try again" });
    }
  };
  




  export const login = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }  
      const { password, role, ...rest } = user._doc
      const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY, { expiresIn: "15d"});

      res.cookie('accessToken', token, {
        httpOnly: true,
        expires:token.expiresIn
      }).status(200).json({ success: true, token, message: "Successfully logged in", data: {...rest}, role });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to login, try again" });
    }
  };