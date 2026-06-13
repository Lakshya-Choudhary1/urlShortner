import { nanoid } from "nanoid";
import UrlModel from "../models/url.model.js";
import { uniqueNanoIdLength } from "../config/config.js";

export const deleteUrl = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(400).json({ error: "User ID is required to delete URL."});
    }
    const { id } = req.params;
    const urlData = await UrlModel.findById(id);
    if (!urlData) {
      return res.status(404).json({ error: "URL Not Found." });
    }
    if (urlData.userId.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this URL." });
    }
    await UrlModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "URL Deleted Successfully." });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: "Server Error Due To Deleting URL." });
  }
};

export const createUrl = async (req, res) => {
  try {
    const { originalUrl, uniqueShortUrl, userId } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    let expiresAt = null;

    if (!userId) {
      expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }

    let shortUrl;

    if (userId && uniqueShortUrl) {
      shortUrl = uniqueShortUrl.trim();

      const exists = await UrlModel.findOne({ shortUrl });
      if (exists) {
        return res.status(400).json({
          error: "Custom short URL already taken",
        });
      }
    } else {
      let isUnique = false;

      while (!isUnique) {
        shortUrl = nanoid(uniqueNanoIdLength);
        const exists = await UrlModel.findOne({ shortUrl });
        if (!exists) isUnique = true;
      }
    }

    const newUrl = await UrlModel.create({
      userId: userId ? userId : null,
      originalUrl,
      shortUrl,
      expiresAt,
    });

    return res.status(201).json({
      message: "Short URL created successfully",
      newUrl,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ error: error.message });
  }
};

//fetch all urls created by user
export const getUserUrls = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID is required to fetch URLs." });
    }
    const urls = await UrlModel.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ urls });
  } catch (error) {
    console.error("Error fetching user URLs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//toogle url active status to disable urland vice versa
export const toggleUrlStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const urlData = await UrlModel.findById(id);
    if (!urlData) {
      return res.status(404).json({ error: "URL Not Found." });
    }
    if (urlData.userId.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized to toggle this URL." });
    }

    urlData.isActive = !urlData.isActive;
    await urlData.save();
    return res.status(200).json({
      message: `URL ${urlData.isActive ? "Enabled" : "Disabled"} Successfully.`,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Server Error Due To Toggling URL Status." });
  }
};
