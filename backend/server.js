const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cardController = require('./controllers/cardRoutes');
const cors = require('cors')
const app = express();
const path = require('path')
app.use(cors())


// app.use(express.static(path.join(__dirname,'frontend','dist')))

// MongoDB connection
mongoose.connect('mongodb+srv://john:1234@cluster0.fz5g5rb.mongodb.net/jcard?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true ,required:true},
  password: String
});
const User = mongoose.model('User', userSchema); 

// Middleware
app.use(bodyParser.json());

// Register
app.post('/register', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
      });
      await user.save();
      res.status(201).json({
        message: 'User registered successfully',
        payload: {
          username: user.username,
          email: user.email
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error registering Duplicate user',
        error: err.message
      });
    }
  });
  
// Login
app.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(400).send('User not found');
      }
  
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ 
          userId: user._id, // Include the user's ObjectId in the payload
          username: user.username 
        }, 'secret');
        res.json({ token });
      } else {
        res.status(401).send('Authentication failed');
      }
    } catch {
      res.status(500).send('Error logging in');
    }
  });
  

// Middleware for verifying JWT token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access Denied');
  
    jwt.verify(token, 'secret', (err, decodedToken) => {
      if (err) return res.status(403).send('Invalid token');
      req.user = decodedToken; // Adding decoded user information to request object
      next();
    });
  }
  

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.send('Welcome to protected route');
});


app.post('/cards', authenticateToken, cardController.createCard);
app.get('/cards', authenticateToken, cardController.getAllCards);
app.put('/cards/:id', authenticateToken, cardController.updateCard);
app.delete('/cards/:id', authenticateToken, cardController.deleteCard);



// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
