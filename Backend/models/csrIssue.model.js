import mongoose from "mongoose";

const csrIssueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Education",
        "Healthcare",
        "Environment",
        "Infrastructure",
        "Social Welfare",
        "Public Safety",
        "Cultural Heritage",
        "Economic Development"
      ]
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },
    estimatedCompletionDate: {
      type: Date
    },
    actualCompletionDate: {
      type: Date
    },
    budget: {
      type: Number
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  },
  { timestamps: true }
);

const CSRIssue = mongoose.model("CSRIssue", csrIssueSchema);
export default CSRIssue; 