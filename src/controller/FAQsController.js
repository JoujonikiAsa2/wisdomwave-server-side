const FAQModel = require("../models/FAQSchema")

exports.createFAQs = async (req, res) => {
    try {
        const faq = req.body
        console.log("faq", faq)
        const result = await FAQModel.create(faq)
        console.log("FAQ created")
        res.status(200).json({ status: "success", message: "FAQ created successfully", data: result })

    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
}

exports.readFAQs = async (req, res) => {
    try {
        const result = await FAQModel.find()
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
}

exports.deleteFAQs = async (req, res) => {
    try {
        const id = req.params.id
        const result = await FAQModel.findByIdAndDelete(id)
        res.status(200).json({ status: "success", message: "FAQ deleted successfully", data: result })
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
} 