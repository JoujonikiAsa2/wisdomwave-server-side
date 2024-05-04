const mongoose = require("mongoose");

// Tutor Profile Schema
const DetailsSchema = new mongoose.Schema({
  Class: String,
  Subject: String
});

const TuitionSchema = new mongoose.Schema({
  TuitionCode: String,
  Location: String,
  SubLocation: String,
  Medium: String,
  Category: String,
  Address: String,
  TutoringDays: [String],
  Salary: String,
  Details: DetailsSchema
});

const TuitionModel = mongoose.model("tuitions", TuitionSchema);
module.exports = TuitionModel;
