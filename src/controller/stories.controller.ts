import { Request, Response } from "express";
import path from "path";
import { Story } from "../models/Story";
import fs from "fs";
import { User } from "../models/User";
import cloudinary from "cloudinary";

export const getStories = async (req: Request, res: Response) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getStory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.json(story);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const createStory = async (req: Request, res: Response) => {
  try {
    if (!req.file || !req.body.userId) {
      console.error("File or userId missing");
      return res.status(400).send("File, or userId missing.");
    }

    const { userId } = req.body;
    const file = req.file;

    console.log("Uploading file to Cloudinary...");

    // Upload file directly from buffer
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: "stories",
    });
    console.log("File uploaded to Cloudinary:", result.secure_url);

    const story = new Story({
      content: result.secure_url,
      userId,
    });
    const savedStory = await story.save();
    console.log("Story saved:", savedStory);

    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    user.stories.push(savedStory._id);
    await user.save();
    console.log("User updated with new story:", user);

    res.json(story);
  } catch (error: any) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateStory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const story = await Story.findByIdAndUpdate(id, { content }, { new: true });
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.json(story);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(req.params);

    const story = await Story.findByIdAndDelete(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.json({ message: "Story deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
