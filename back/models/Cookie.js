import mongoose from "mongoose";
const cookieSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    category: { type: String },
    img: { type: [String] },
    imgId: { type: [String] },
    stock: { type: Number },
    ingredients: { type: String },
    allergen: { type: String },
    section: { type: String },
    rating: { type: Number },
  },
  { collection: "cookies", timestamps: true }
);

const CookieModel = mongoose.model("cookies", cookieSchema);
export default CookieModel;
