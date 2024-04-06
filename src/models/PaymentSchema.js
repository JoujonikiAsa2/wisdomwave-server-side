const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    userEmail: String,
    courseTitle: String,
    courseFee: Number,
    transactionId: String,
    courseId: String,
    paidStatus: Boolean
})

const PaymentModel = mongoose.model("payments", paymentSchema);
module.exports = PaymentModel