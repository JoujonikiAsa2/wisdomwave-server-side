const { default: mongoose } = require("mongoose");

const PaymentIndentSchema = new mongoose.Schema({
            currency: String,
            automatic_payment_methods: {
                enabled: Boolean,
            },
  });

  const PaymentIndentModel = mongoose.model('blogs', PaymentIndentSchema)
  module.exports = PaymentIndentModel 