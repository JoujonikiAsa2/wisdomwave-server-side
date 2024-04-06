const SSLCommerzPayment = require('sslcommerz-lts');
const CourseModel = require('../models/CourseSchema');
const mongoose = require('mongoose');
const PaymentModel = require('../models/PaymentSchema');
const PurchasedCourseModel = require('../models/PurchasedCourseSchema');

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox

exports.Payment = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await CourseModel.findById(courseId);
        const courseFee = course.courseDetails.enrollFee;
        const tran_Id = new mongoose.mongo.ObjectId().toString();
        const data = {
            total_amount: courseFee,
            currency: 'BDT',
            tran_id: tran_Id, // use unique tran_id for each api call
            success_url: `http://localhost:5000/api/payment/success/${tran_Id}`,
            fail_url: `http://localhost:5000/api/payment/fail/${tran_Id}`,
            cancel_url: `http://localhost:5000/api/payment/cancel/${tran_Id}`,
            ipn_url: 'http://localhost:5000/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: 'customer@example.com',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const apiResponse = await sslcz.init(data);

        // Create the purchase record in the database
        const purchase = {
            userEmail: req.body.userEmail,
            courseTitle: course.courseDetails.title,
            courseFee: course.courseDetails.enrollFee,
            transactionId: tran_Id,
            paidStatus: req.body.paidStatus,
        }

        const purchasedCourseObject = {
            userEmail: req.body.userEmail,
            courseId: req.params.id,
            transactionId: tran_Id,
            paidStatus: false,
            courseDetails: { ...course.courseDetails }
        }
        // Create the purchase record in the database

        const purchasedCourse = await PurchasedCourseModel.findOne({ courseId: courseId })
        const email = await PurchasedCourseModel.findOne({ userEmail: req.body.userEmail })
        if (purchasedCourse && email) {
            console.log("All ready enrolled")
            res.send({ url: "http://localhost:5000/api/home" });
        }
        else {
            const paymentResult = await PaymentModel.create(purchase);
            const purchasedResult = await PurchasedCourseModel.create(purchasedCourseObject)
            // Redirect the user to payment gateway
            const GatewayPageURL = apiResponse.GatewayPageURL;
            res.send({ url: GatewayPageURL});
            console.log('URL:', GatewayPageURL);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};



exports.PaymentSuccess = async (req, res) => {
    const tran_Id = req.params.tran_Id
    console.log(tran_Id)
    const find = { transactionId: tran_Id }
    const update = { paidStatus: true }
    const payment = await PaymentModel.findOneAndUpdate(find, update)
    const purchasedcourse = await PurchasedCourseModel.findOneAndUpdate(find, update)
    res.redirect(`http://localhost:5173/payment/success/${tran_Id}`)
}

exports.PaymentCancel = async (req, res) => {
    const tran_Id = req.params.tran_Id
    const payment =  await PaymentModel.deleteOne({tranId: tran_Id})
    console.log(tran_Id)
    res.redirect(`http://localhost:5173/payment/cancel/${tran_Id}`)
}

exports.PaymentFail = async (req, res) => {
    const tran_Id = req.params.tran_Id
    console.log(tran_Id)
    res.redirect(`http://localhost:5173/payment/fail/${tran_Id}`)
}

exports.Home = async (req, res) => {
    res.redirect(`http://localhost:5173`)
}