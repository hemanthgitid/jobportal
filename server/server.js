

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const adminRoutes = require('./routes/adminRoutes.js');  
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

app.use('/admin', adminRoutes); 

app.get('/', (req, res) => {
  res.send('API is running ✅');
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  