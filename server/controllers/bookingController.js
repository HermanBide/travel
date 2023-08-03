import Booking from "../models/Booking.js";
import { z } from 'zod';

const bookingSchema = z.object({
  userId: z.string().optional(),
  userEmail: z.string().optional(),
  tourName: z.string().min(1).max(100).refine((val) => val.trim() !== '', {
    message: 'Tour name is required and must not be empty.',
  }),
  fullName: z.string().min(1).max(100).refine((val) => val.trim() !== '', {
    message: 'Full name is required and must not be empty.',
  }),
  guestSize: z.number().min(1),
  phone: z.string().min(1).max(20).refine((val) => val.trim() !== '', {
    message: 'Phone number is required and must not be empty.',
  }),
  bookAt: z.date().optional(),
});

export const createBooking = async (req, res) => {
  try {
    const bookingData = bookingSchema.parse(req.body);

    const newBooking = new Booking({ ...bookingData });
    const savedBooking = await newBooking.save();

    res
      .status(200)
      .json({
        success: true,
        message: 'Your tour is booked',
        data: savedBooking,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: 'Failed to book tour. try again!',
        error: error.message,
      });
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
      console.log(error)
        res
        .status(500)
        .json({ success: false, message: "Could not find book", error: error.message }); 
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
      console.log(error)
        res
        .status(500)
        .json({ success: false, message: "Could not find book", error: error.message }); 
    }
}