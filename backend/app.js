const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); 

module.exports = app;
