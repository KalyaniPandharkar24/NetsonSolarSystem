import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: "" },
    type: {
      type: String,
      enum: ["general", "quote", "site_visit"],
      default: "general",
    },
    service: String,
    message: String,
    city: String,
    bill: String,
    propertyType: String,
    roofType: String,
    address: String,
    date: String,

    status: {
      type: String,
      enum: ["new", "contacted"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
