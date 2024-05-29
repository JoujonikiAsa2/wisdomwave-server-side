const mongoose = require("mongoose");

// Tuition Schema
const DetailsSchema = new mongoose.Schema({
  class: String,
  subjects: [String]
});

const TuitionSchema = new mongoose.Schema({
  userEmail: String,
  tuitionCode: String,
  district: String,
  area: String,
  medium: String,
  group: String,
  tutoringDays: [String],
  salary: String,
  details: DetailsSchema
});

const TuitionModel = mongoose.model("tuitions", TuitionSchema);
module.exports = TuitionModel;
