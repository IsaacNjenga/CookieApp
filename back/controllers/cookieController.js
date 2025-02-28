import CookieModel from "../models/Cookie.js";

const createCookie = async (req, res) => {
  try {
    const newCookie = new CookieModel({ ...req.body });
    const savedCookie = await newCookie.save();

    res.status(201).json({ success: true, savedCookie });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "There was an error" });
  }
};

const getCookies = async (req, res) => {
  try {
    const cookies = await CookieModel.find({});
    res.status(201).json({ success: true, cookies });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "There was an error" });
  }
};
const getCookie = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "No ID present" });
  }
  try {
    const requestedCookie = await CookieModel.findById(id);
    res.status(201).json({ success: true, requestedCookie });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "There was an error" });
  }
};
const updateCookie = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "No ID present" });
  }
  try {
    const updatedCookie = await CookieModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json({ success: true, updatedCookie });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "There was an error" });
  }
};
const deleteCookie = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "No ID present" });
  }
  try {
    await CookieModel.findByIdAndDelete({ _id: id });
    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "There was an error" });
  }
};

export { createCookie, getCookies, getCookie, updateCookie, deleteCookie };
