// activityController.js
const Activity = require('../models/Activity');

// Function to handle creating an activity
exports.createActivity = async (req, res) => {
  const { title, description, organizer } = req.body;

  try {
    // Create new activity
    const newActivity = new Activity({
      title,
      description,
      organizer
    });

    await newActivity.save();

    res.status(201).json({ message: 'Activity created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to handle updating an activity
exports.updateActivity = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    // Check if the activity exists
    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Update activity
    activity.title = title;
    activity.description = description;
    await activity.save();

    res.status(200).json({ message: 'Activity updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to handle deleting an activity
exports.deleteActivity = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the activity exists
    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Delete activity
    await activity.remove();

    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to handle getting activities
exports.getActivities = async (req, res) => {
  try {
    // Get list of activities
    const activities = await Activity.find();

    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
