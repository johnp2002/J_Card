const mongoose = require('mongoose');


const cardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User schema
  type: { type: String, enum: ['Credit Card', 'Debit Card', 'Aadhar Card', 'PAN Card', 'Driving License', 'Other'], required: true },
  issuer: { type: String, required: true },
  number: { type: String, unique: true, required: true },
  issuedDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  name: { type: String, required: true }
});

  
  const Card = mongoose.model('Card', cardSchema);
module.exports = Card  