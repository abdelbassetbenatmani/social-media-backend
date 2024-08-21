import { Request, Response } from "express";
import { User } from "../models/User";
import { Story } from "../models/Story";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate('stories');
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("stories");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, avatar } = req.body;
    const user = new User({ username, email, password, avatar });
    await user.save();
    res.json(user);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const user = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};