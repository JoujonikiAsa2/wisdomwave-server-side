const mongoose = require('mongoose');

// Define Subject schema
const SubjectSchema = new mongoose.Schema({
    subjects: [String]
});

// Create Subject model
const SubjectModel = mongoose.model('subjects', SubjectSchema);

module.exports = SubjectModel