import Post from "../models/post.model.js";
import Image from "../models/image.model.js";
import unverifiedPost from "../models/unverifiedPost.model.js";

export const post = async (req, res) => {
  try {
    const { title, description, state, city, pincode, contact, images } =
      req.body;
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
    const newPost = new unverifiedPost({
      postedBy: req.user._id,
      title: title,
      description,
      state,
      city,
      pincode,
      contact,
      images: imagesArray,
    });
    if (newPost) {
      newPost.save();
      res.status(200).json({ message: "Posted for Verification" });
    }
  } catch (error) {
    console.log("error in Post controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getPosts = async (req, res) => {
  try {
    let posts = await Post.find().populate(["images", "postedBy"]);
    if (!posts) {
      return res.status(200).json([]);
    }
    res.status(200).json({ posts });
  } catch (error) {
    console.log("error in getPosts controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
export const getunverifiedPosts = async (req, res) => {
  try {
    let posts = await unverifiedPost.find().populate(["images", "postedBy"]);
    if (!posts) {
      return res.status(200).json([]);
    }
    res.status(200).json({ posts });
  } catch (error) {
    console.log("error in getunverifiedPosts controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
export const verifyPost = async (req, res) => {
  const { id } = req.body;
  try {
    const unverifiedDoc = await unverifiedPost.findById(id);

    if (!unverifiedDoc) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Create a new document in the Verified collection
    const verifiedDoc = new Post(unverifiedDoc.toObject());
    await verifiedDoc.save();

    // Delete the document from the Unverified collection
    await unverifiedPost.findByIdAndDelete(id);

    res.status(200).json({ message: "post verified" });
  } catch (error) {
    console.log("error in verifyPost controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
