const Card = require('../models/Card');

// Controller functions

// Create a new card
exports.createCard = async (req, res) => {
  try {
    const { type, issuer, number, issuedDate, expiryDate, name } = req.body;
    
    // Check if the card number already exists for the user
    const existingCard = await Card.findOne({ user: req.user._id, number: number });
    if (existingCard) {
      return res.status(400).json({
        message: 'Card with this number already exists for the user'
      });
    }
    console.log(req.user)

    const card = new Card({
      user: req.user.userId,
      type,
      issuer,
      number,
      issuedDate,
      expiryDate,
      name
    });
    await card.save();
    res.status(201).json({
      message: 'Card created successfully',
      payload: {
        card
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error creating card',
      error: err.message
    });
  }
};

// Get all cards of a user
exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find({ user: req.user.userId });
    res.json({
      message: 'Cards fetched successfully',
      payload: {
        cards
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error fetching cards',
      error: err.message
    });
  }
};

// Update a card
exports.updateCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({
      message: 'Card updated successfully',
      payload: {
        card
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error updating card',
      error: err.message
    });
  }
};

// Delete a card
exports.deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.json({
      message: 'Card deleted successfully'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error deleting card',
      error: err.message
    });
  }
};
