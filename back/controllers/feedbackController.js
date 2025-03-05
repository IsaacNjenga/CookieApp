import FeedbackModel from "../models/Feedback.js";

const createFeedback = async (req, res) => {
  try {
    const newFeedback = new FeedbackModel({ ...req.body });
    const savedFeedback = await newFeedback.save();

    res.status(201).json({ success: true, savedFeedback });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await FeedbackModel.find({});
    res.status(201).json({ success: true, feedbacks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
const getFeedback = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: "No ID found" });
  }
  try {
    const feedback = await FeedbackModel.findById(id);
    res.status(201).json({ success: true, feedback });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
const deleteFeedback = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "No ID present" });
  }
  try {
    await FeedbackModel.findByIdAndDelete({ _id: id });
    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export { createFeedback, getAllFeedbacks, getFeedback, deleteFeedback };
