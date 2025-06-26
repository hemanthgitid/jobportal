
const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Import routes
const adminRoutes = require('./routes/adminRoutes.js');

app.use('/admin', adminRoutes);
// Use routes with base path '/admin'

// // Serve static files from React build
// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get(/^\/(?!admin|api).*/, (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
// });


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});