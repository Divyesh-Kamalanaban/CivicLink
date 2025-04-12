import Post from "../models/post.model.js";
import unverifiedWork from "../models/unverifiedWork.model.js";
import Image from "../models/image.model.js";
import verifiedWork from "../models/verifiedWork.js";
import User from "../models/user.model.js";
export const submitWork = async (req, res) => {
  try {
    const { postID, description, images } = req.body;
    let imagesArray = [];
    for (let i of images) {
      const newImage = new Image({
        base64: i,
      });
      if (newImage) {
        await newImage.save();
        imagesArray.push(newImage._id);
      }
    }
    const post = await Post.findById(postID);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const newWork = new unverifiedWork({
      doneBy: req.user._id,
      refPost: post?._id,
      description,
      images: imagesArray,
    });
    if (newWork) {
      newWork.save();
      res.status(200).json({ message: "Submited for Verification" });
    }
  } catch (error) {
    console.log("error in submitWork controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
export const getunverifiedWorks = async (req, res) => {
  try {
    let unverifiedWorks = await unverifiedWork
      .find()
      .populate(["doneBy", "refPost", "images"]);
    if (!unverifiedWorks) {
      return res.status(200).json([]);
    }
    res.status(200).json({ unverifiedWorks });
  } catch (error) {
    console.log("error in getunverifiedWorks controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const verifyWork = async (req, res) => {
  const { civicCredits, refPost, doneBy, unverifiedWorkID } = req.body;
  try {
    const unverifiedDoc = await unverifiedWork.findById(unverifiedWorkID);

    if (!unverifiedDoc) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Create a new document in the Verified collection
    const verifiedDoc = new verifiedWork({
      ...unverifiedDoc.toObject(),
      civicCredits: civicCredits,
    });
    await verifiedDoc.save();

    // Delete the document from the Unverified collection
    await unverifiedWork.findByIdAndDelete(unverifiedWorkID);
    await Post.findByIdAndDelete(refPost);
    await User.findByIdAndUpdate(
      doneBy,
      { $inc: { civicCredits: Number(civicCredits) } } // Increment the `points` field by 1
    );

    res.status(200).json({ message: "work verified civic credits added" });
  } catch (error) {
    console.log("error in verifyWork controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
   