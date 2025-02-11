import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    shopkeeper: {
      type: mongoose.Schema.ObjectId,
      ref: "shopkeeper",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const categoryModel =
  mongoose.models.category || mongoose.model("category", categorySchema);
