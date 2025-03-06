import express from "express";
import {
  createCookie,
  deleteCookie,
  getCookie,
  getCookies,
  updateCookie,
} from "../controllers/cookieController.js";

import { Login, Register, Auth } from "../controllers/userController.js";
import { deleteImage } from "../controllers/cloudinaryController.js";
import { VerifyUser } from "../middleware/verifyUser.js";
import { accessToken } from "../middleware/paymentAccessToken.js";
import {
  submitOrder,
  transactionStatus,
} from "../controllers/paymentController.js";
import {
  createFeedback,
  deleteFeedback,
  getAllFeedbacks,
  getFeedback,
} from "../controllers/feedbackController.js";
import {deleteReview, 
  createReview,
  getAllReviews,
  getReview,
} from "../controllers/reviewController.js";
const router = express.Router();

//user endpoints
router.post("/login", Login);
router.post("/register", Register);
router.get("/verify", VerifyUser, Auth);

//cookie endpoints
router.post("/add-cookie", createCookie);
router.get("/get-all-cookies", getCookies);
router.get("/get-cookie", getCookie);
router.put("/update-cookie", updateCookie);
router.delete("/delete-cookie", deleteCookie);

//cloudinary endpoint
router.delete("/delete-image", deleteImage);

//payment endpoints
router.post("/initiate-payment", accessToken, submitOrder);
router.get("/transaction-status", accessToken, transactionStatus);

//feedback endpoints
router.post("/create-feedback", createFeedback);
router.get("/get-all-feedbacks", getAllFeedbacks);
router.get("/get-feedback", getFeedback);
router.delete("/delete-feedback", deleteFeedback);

//reviews & rating endpoints
router.post("/create-review", createReview);
router.get("/get-all-reviews", getAllReviews);
router.get("/get-review", getReview);
router.delete("/delete-review", deleteReview);
export { router as Router };
