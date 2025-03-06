import mongoose from "mongoose";
import CookieModel from "./Cookie.js";

const reviewsSchema = new mongoose.Schema(
  {
    cookieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cookies",
      required: true,
    },
    rating: { type: Number, required: true },
    review: { type: String },
  },
  { collection: "reviews", timestamps: true }
);

const ReviewsModel = mongoose.model("reviews", reviewsSchema);
export default ReviewsModel;


// // Middleware: Update cookie's average rating after a review is saved
// reviewsSchema.post("save", async function () {
//   const cookieId = this.cookieId;

//   // Calculate the new average rating
//   const reviews = await ReviewsModel.find({ cookieId });
//   const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
//   const averageRating = totalRatings / reviews.length || 0;

//   // Update the cookie's rating
//   await CookieModel.findByIdAndUpdate(cookieId, { rating: averageRating.toFixed(1) });
// });

