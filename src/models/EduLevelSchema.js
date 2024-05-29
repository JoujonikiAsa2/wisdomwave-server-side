const mongoose = require('mongoose');

// Define Institute schema
const EduLevelSchema = new mongoose.Schema({
    eduLevels: [String]
});

// Create Institute model
const EduLevelModel = mongoose.model('educationLevels', EduLevelSchema);

module.exports = EduLevelModel