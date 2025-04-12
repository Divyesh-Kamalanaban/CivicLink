import CSRIssue from "../models/csrIssue.model.js";

export const getCSRIssues = async (req, res) => {
  try {
    const issues = await CSRIssue.find()
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (error) {
    console.error("Error in getCSRIssues controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createCSRIssue = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      priority,
      estimatedCompletionDate,
      budget
    } = req.body;

    const newIssue = new CSRIssue({
      title,
      description,
      category,
      location,
      priority,
      estimatedCompletionDate,
      budget,
      createdBy: req.user._id // Assuming user is authenticated
    });

    await newIssue.save();
    const populatedIssue = await CSRIssue.findById(newIssue._id)
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name');

    res.status(201).json(populatedIssue);
  } catch (error) {
    console.error("Error in createCSRIssue controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCSRIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedIssue = await CSRIssue.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('createdBy', 'name')
     .populate('assignedTo', 'name');

    if (!updatedIssue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    res.status(200).json(updatedIssue);
  } catch (error) {
    console.error("Error in updateCSRIssue controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCSRIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIssue = await CSRIssue.findByIdAndDelete(id);

    if (!deletedIssue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCSRIssue controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}; 