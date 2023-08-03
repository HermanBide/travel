import mongoose from 'mongoose';
import { z } from 'zod';

const tourSchema = z.object({
  title: z.string().min(4).max(100),
  city: z.string().min(2).max(50),
  address: z.string().min(5).max(100),
  distance: z.number().positive(),
  photo: z.string().url(),
  desc: z.string().min(10),
  price: z.number().positive(),
  maxGroupSize: z.number().positive(),
  reviews: z.array(z.string()),
  featured: z.boolean().default(false),
});

const TourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Review',
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

TourSchema.pre('save', async function (next) {
  try {
    const validatedData = tourSchema.parse(this.toObject());
    return next();
  } catch (error) {
    return next(error);
  }
});

export default mongoose.model('Tour', TourSchema);