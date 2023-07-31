import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Your tour is booked",
        data: savedBooking,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to book tour. try again!" });
  }
};


export const getBooking = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Booking.findById(id)
        res
        .status(200)
        .json({
          success: true,
          message: "Successful",
          data: book,
        });
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: "Could not find book" }); 
    }
}

export const getAllBooking = async (req, res) => {
    try {
        const books = await Booking.find()
        res
        .status(200)
        .json({
          success: true,
          message: "Successful",
          data: books,
        });
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: "Could not find book" }); 
    }
}