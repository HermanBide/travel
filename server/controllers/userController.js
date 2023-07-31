import User from '../models/User.js'


  
  export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
      if (updatedUser) {
        res.status(200).json({ success: true, message: "Successfully updated user", data: updatedUser });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update User, try again" });
    }
  };
  
  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if (deletedUser) {
        res.status(200).json({ success: true, message: "Successfully deleted user", data: deletedUser });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete User, try again" });
    }
  };
  
  export const getSingleUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (user) {
        res.status(200).json({ success: true, data: user });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to get single User, try again" });
    }
  };
  
  export const getAllUser = async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json({ success: true, message: "Successfully retrieved all users", data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to get all Users, try again" });
    }
  };

  

  