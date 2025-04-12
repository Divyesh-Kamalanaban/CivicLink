import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const {
      name,
      dob,
      gender,
      state,
      city,
      pincode,
      contact,
      aadhaar,
      password,
      confirmPassword,
    } = req.body;
    if (password !== confirmPassword) {
      res.status(400).json({ error: "passwords do not match" });
    } else {
      const user = await User.findOne({ aadhaar });
      if (user) {
        res.status(400).json({ error: "user already exists" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
          name,
          dob,
          gender,
          state,
          city,
          pincode,
          contact,
          aadhaar,
          password: hashedPassword,
          civicCredits: 0,
        });
        if (newUser) {
          generateTokenAndSetCookie(newUser._id, res);
          await newUser.save();
          res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            dob: newUser.dob,
            aadhaar: newUser.aadhaar,
            contact: newUser.contact,
            state: newUser.state,
            city: newUser.city,
            pincode: newUser.pincode,
            gender: newUser.gender,
            civicCredits: newUser.civicCredits,
            profilePic: newUser.profilePic,
          });
        }
      }
    }
  } catch (error) {
    if (error.name == "ValidationError") {
      console.log("error in signup controller", error.message);
      res.status(400).json({ error: "User details not valid" });
    } else {
      console.log("error in signup controller", error.message);
      res.status(500).json({ error: "internal server error" });
    }
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ aadhaar: username });
    const isPasswordVerified = await bcrypt.compare(
      password || "",
      user?.password || ""
    );
    if (!user || !isPasswordVerified || !password) {
      res.status(200).json({
        error: "username or password invalid",
      });
    } else {
      generateTokenAndSetCookie(user._id, res);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        dob: user.dob,
        gender: user.gender,
        state: user.state,
        city: user.city,
        pincode: user.pincode,
        contact: user.contact,
        civicCredits: user.civicCredits,
        aadhaar: user.aadhaar,
      });
    }
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const googleAuthCallback = async (req, res) => {
  try {
    const { email, name, picture } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        name,
        email,
        profilePic: picture,
        password: Math.random().toString(36).slice(-8), // Generate random password
        civicCredits: 0,
      });
      await user.save();
    }

    // Generate token and set cookie
    generateTokenAndSetCookie(user._id, res);

    // Return user data
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      civicCredits: user.civicCredits,
    });
  } catch (error) {
    console.log("Error in googleAuthCallback controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
