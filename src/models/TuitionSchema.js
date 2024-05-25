const mongoose = require("mongoose");

// Tuition Schema
const DetailsSchema = new mongoose.Schema({
  Class: String,
  Subject: String
});

const TuitionSchema = new mongoose.Schema({
  userEmail: String,
  tuitionCode: String,
  location: String,
  subLocation: String,
  medium: String,
  category: String,
  address: String,
  tutoringDays: [String],
  salary: String,
  details: DetailsSchema
});

const TuitionModel = mongoose.model("tuitions", TuitionSchema);
module.exports = TuitionModel;
