import Review from '../models/Review.js';
import Tour from '../models/Tour.js';

export const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  try {
    const newReview = new Review(req.body );
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