const SSLCommerzPayment = require('sslcommerz-lts');
const CourseModel = require('../models/CourseSchema');
const mongoose = require('mongoose');
const PaymentModel = require('../models/PaymentSchema');
const PurchasedCourseModel = require('../models/PurchasedCourseSchema');

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox

exports.payment = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await CourseModel.findById(courseId);
        const courseFee = course.courseDetails.enrollFee;
        const tran_Id = new mongoose.Types.ObjectId().toString(); // Using mongoose.Types.ObjectId() instead of mongoose.mongo.ObjectId()
        const userEmail = req.body.userEmail;
        console.log("Course Id", courseId   );
        
        // Construct the success URL with query parameters
        const successUrl = `https://wisdomwave-server-side.vercel.app/api/payment/success/${courseId}?email=${userEmail}`;
        // const successUrl = `http://localhost:5000/api/payment/success/${courseId}?email=${userEmail}`;

        const data = {
            total_amount: courseFee,
            currency: 'BDT',
            tran_id: tran_Id,
            success_url: successUrl, // Use the constructed success URL
            fail_url: `https://wisdomwave-server-side.vercel.app/api/payment/fail/${courseId}`,
            cancel_url: `https://wisdomwave-server-side.vercel.app/api/payment/cancel/${courseId}`,
            ipn_url: 'https://wisdomwave-server-side.vercel.app/ipn',
            // fail_url: `http://localhost:5000/api/payment/fail/${courseId}`,
            // cancel_url: `http://localhost:5000/api/payment/cancel/${courseId}`,
            // ipn_url: 'http://localhost:5000/ipn',
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
        const purchasedCourse = await PurchasedCourseModel.findOne({ courseId: courseId });
        const email = await PurchasedCourseModel.findOne({ userEmail: req.body.userEmail });
        
        if (purchasedCourse && email) {
            console.log("Already enrolled");
            // res.send({ url: "http://localhost:5000/api/home" });
            res.send({ url: "https://wisdomwave-server-side.vercel.app/api/home" });
        }
        else {
            // Redirect the user to payment gateway
            const GatewayPageURL = apiResponse.GatewayPageURL;
            res.send({ url: GatewayPageURL });
            console.log('URL:', GatewayPageURL);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};


exports.paymentSuccess = async (req, res) => {
    try {
        const course_Id = req.params.courseId;
        const course = await CourseModel.findById(course_Id);
        const tran_Id = new mongoose.Types.ObjectId().toString();
        console.log(course_Id, tran_Id);
        
        // Create the purchase record in the database
        const purchase = {
            userEmail: req.query.email,
            courseTitle: course.courseDetails.title,
            courseFee: course.courseDetails.enrollFee,
            transactionId: tran_Id,
            paidStatus: true,
        };

        const purchasedCourseObject = {
            userEmail: req.query.email, // Fix here, should use req.query.email instead of req.body.userEmail
            courseId: req.params.courseId, // Fix here, should use req.params.id instead of req.params.courseId
            transactionId: tran_Id,
            paidStatus: true,
            courseDetails: { ...course.courseDetails }
        };

        console.log(req.query);

        const paymentResult = await PaymentModel.create(purchase);
        const purchasedResult = await PurchasedCourseModel.create(purchasedCourseObject);
        res.redirect(`https://wisdomwave-project.netlify.app/payment/success/${course_Id}`);
        // res.redirect(`http://localhost:5173/payment/success/${course_Id}`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};


exports.paymentCancel = async (req, res) => {
    console.log(course_Id)
    // res.redirect(`http://localhost:5173/payment/cancel/${course_Id}`)
    res.redirect(`https://wisdomwave-project.netlify.app/payment/cancel/${course_Id}`)
}

exports.paymentFail = async (req, res) => {
    const course_Id = req.params.courseId
    console.log(course_Id)
    // res.redirect(`http://localhost:5173/payment/fail/${course_Id}`)
    res.redirect(`https://wisdomwave-project.netlify.app/payment/fail/${course_Id}`)
}

exports.home = async (req, res) => {
    // res.redirect(`http://localhost:5173`)
    res.redirect(`https://wisdomwave-project.netlify.app`)
}