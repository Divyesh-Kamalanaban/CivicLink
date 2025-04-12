import mongoose from "mongoose";
const verifiedWorkSchema = new mongoose.Schema(
  {
    doneBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    refPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "completedPost",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    civicCredits: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const verifiedWork = mongoose.model("verifiedWork", verifiedWorkSchema);
export default verifiedWork;
