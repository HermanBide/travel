import mongoose from 'mongoose';
// import { z } from 'zod';

// const bookingSchema = z.object({
//   userId: z.string().nonempty(),
//   userEmail: z.string().email(),
//   tourName: z.string().nonempty(),
//   fullName: z.string().nonempty(),
//   guestSize: z.number().int().min(1),
//   phone: z.string().min(6).max(15),
//   bookAt: z.date(),
// });

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    tourName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bookAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// BookingSchema.pre('save', async function (next) {
//   try {
//     const validatedData = bookingSchema.parse(this.toObject());
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

export default mongoose.model('Booking', BookingSchema);