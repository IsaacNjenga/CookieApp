import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    phone: { type: String },
    email: { type: String },
    message: { type: String },
  },
  { collection: "feedback", timestamps: true }
);

const FeedbackModel = mongoose.model("feedback", feedbackSchema);
export default FeedbackModel;
