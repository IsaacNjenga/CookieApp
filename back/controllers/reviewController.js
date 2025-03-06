import CookieModel from "../models/Cookie.js";
import ReviewsModel from "../models/Reviews.js";

const createReview = async (req, res) => {
  const { cookieId, rating, review } = req.body;
  try {
    const newReview = await ReviewsModel.create({ cookieId, rating, review });

    const reviews = await ReviewsModel.find({ cookieId });
    const totalRatings = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRatings / reviews.length || 0;

    await CookieModel.findByIdAndUpdate(cookieId, {
      rating: averageRating.toFixed(1),
    });

    res
      .status(201)
      .json({ success: true, message: "Review saved successfully", newReview });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewsModel.find({});
    res.status(201).json({ success: true, reviews });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const getReview = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "No ID specified" });
  }

  try {
    const review = await ReviewsModel.findById(id);
    res.status(201).json({ success: true, review });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteReview = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "No ID specified" });
  }
  try {
    await ReviewsModel.findByIdAndDelete({ _id: id });

    res.status(201).json({ success: true });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createReview, getAllReviews, getReview, deleteReview };
