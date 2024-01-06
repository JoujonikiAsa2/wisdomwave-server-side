const stripe = require("stripe")(process.env.STRIPE_KEY)

exports.PaymentMethod = async (req, res) => {
    try {
        const { enrollFee } = req.body
        const amount = parseInt(enrollFee * 100)

        console.log("Amount inside cart", amount)
        console.log(process.env.STRIPE_KEY)

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card']
        })
        res.status(500).json({ status: "fail", clientSecret: paymentIntent.client_secret, });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
};