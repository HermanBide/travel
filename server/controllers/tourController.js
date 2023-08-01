import Tour from "../models/Tour.js";


export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const saveTour = await newTour.save();
    res
      .status(200)
      .json({ success: true, message: "Successfully created", data: saveTour });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " failed to create new tour, try again",
    });
  }
};

export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (updatedTour) {
      res.status(200).json({
        success: true,
        message: "Successfully updated",
        data: updatedTour,
      });
    } else {
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update tour, try again" });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTour = await Tour.findByIdAndDelete(id);
    if (deletedTour) {
      res.status(200).json({
        success: true,
        message: "Successfully deleted",
        data: deletedTour,
      });
    } else {
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete tour, try again" });
  }
};

export const getSingleTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id).populate('reviews');
    if (tour) {
      res.status(200).json({ success: true, data: tour });
    } else {
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get single tour, try again",
    });
  }
};

export const getAllTour = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const tours = await Tour.find({})
      .populate('reviews')
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successful",
      data: tours,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get all tours, try again" });
  }
};

export const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate('reviews');
    res
      .status(200)
      .json({ success: true, message: "Successfully found", data: tours });
  } catch (error) {
    res.status(500).json({ success: false, message: "Tour not found" });
  }
};

export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.findAll({ featured: true }).populate('reviews').limit(8);
    res.status(200).json({
      success: true,
      message: "Successful",
      data: tours,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get all tours, try again" });
  }
};

export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      message: "Successful",
      data: tourCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch" });
  }
};
