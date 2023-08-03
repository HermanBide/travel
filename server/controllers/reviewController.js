import { z } from 'zod';
import Review from '../models/Review.js';
import Tour from '../models/Tour.js';

const reviewSchema = z.object({
  username: z.string().min(1).max(100).optional(),
  reviewText: z.string().min(1).optional(),
  rating: z.number().min(0).max(5).optional(),
});

export const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  try {
    const reviewData = reviewSchema.parse(req.body);

    const newReview = new Review({ ...reviewData });
    const savedReview = await newReview.save();

    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    res
      .status(200)
      .json({ success: true, message: 'Review submitted', data: savedReview });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to submit Review', error: error.message });
  }
};