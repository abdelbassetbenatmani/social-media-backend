import mongoose, { Schema, Document } from "mongoose";

interface IStory extends Document {
  title: string;
  content: string;
  userId: mongoose.Types.ObjectId;
}

const StorySchema: Schema = new Schema({
  content: { type: String, required: true },
  //   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "UserId is required"],
  },
});

export const Story = mongoose.model<IStory>("Story", StorySchema);
