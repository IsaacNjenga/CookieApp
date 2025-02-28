import express from "express";
import {
  createCookie,
  deleteCookie,
  getCookie,
  getCookies,
  updateCookie,
} from "../controllers/cookieController.js";
import { deleteImage } from "../controllers/cloudinaryController.js";
const router = express.Router();

//cookie endpoints
router.post("/add-cookie", createCookie);
router.get("/get-all-cookies", getCookies);
router.get("/get-cookie", getCookie);
router.put("/update-cookie", updateCookie);
router.delete("/delete-cookie", deleteCookie);

//cloudinary endpoint
router.delete("/delete-image", deleteImage);

export { router as Router };
