const mongoose = require('mongoose')

const FAQSchema = new mongoose.Schema({
    title: String,
    content: String
});
const FAQModel = mongoose.model('faqs', FAQSchema);
module.exports = FAQModel