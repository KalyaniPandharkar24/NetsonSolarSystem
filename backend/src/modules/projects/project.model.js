import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
