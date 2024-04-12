// userController.js
const User = require('../models/User');

// Function to handle getting user information
exports.getUserInfo = async (req, res) => {
  try {
    // Get user information
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to handle updating user information
exports.updateUserInfo = async (req, res) => {
  const { username, email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user information
    user.username = username;
    user.email = email;
    await user.save();

    res.status(200).json({ message: 'User information updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
