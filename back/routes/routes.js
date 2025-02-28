import express from "express";
import {
  createCookie,
  deleteCookie,
  getCookie,
  getCookies,
  updateCookie,
} from "../controllers/cookieController.js";

import { Login, Register } from "../controllers/userController.js";
import { deleteImage } from "../controllers/cloudinaryController.js";
const router = express.Router();

//user endpoints
router.post("/login", Login);
router.post("/register", Register);

//cookie endpoints
router.post("/add-cookie", createCookie);
router.get("/get-all-cookies", getCookies);
router.get("/get-cookie", getCookie);
router.put("/update-cookie", updateCookie);
router.delete("/delete-cookie", deleteCookie);

//cloudinary endpoint
router.delete("/delete-image", deleteImage);

export { router as Router };
