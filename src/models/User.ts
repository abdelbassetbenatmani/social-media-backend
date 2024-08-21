import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  stories: mongoose.Types.ObjectId[] | any;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  stories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
});

export const User = mongoose.model<IUser>("User", UserSchema);
