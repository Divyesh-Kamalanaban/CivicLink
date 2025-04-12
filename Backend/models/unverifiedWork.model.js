import mongoose from "mongoose";
const unverifiedWorkSchema = new mongoose.Schema(
  {
    doneBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    refPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
  },
  { timestamps: true }
);

const unverifiedWork = mongoose.model("unverifiedWork", unverifiedWorkSchema);
export default unverifiedWork;
