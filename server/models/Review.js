import mongoose from 'mongoose';
// import { z } from 'zod';

// const reviewSchema = z.object({
//   productId: z.string().nonempty(),
//   username: z.string().min(2).max(50),
//   reviewText: z.string().min(10),
//   rating: z.number().int().min(0).max(5).default(0),
// });

const ReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'Tour',
    },
    username: {
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

// ReviewSchema.pre('save', async function (next) {
//   try {
//     const validatedData = reviewSchema.parse(this.toObject());
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

export default mongoose.model('Review', ReviewSchema);





