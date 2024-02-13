const { BlogPost, BlogsRead, BlogReadById } = require('../controller/blogController')
const { courses, categories, courseDetails, totalCourse, totalCategory } = require('../controller/courseController')
const { PaymentMethod } = require('../controller/paymentController')

const router = require('express').Router()

// Course api
router.get('/courses',courses)

// toalcourse api
router.get('/totalCourse',totalCourse)

// toalcategory api
router.get('/totalCategory',totalCategory)

// Unique category api
router.get('/categories',categories)

// individual course from courses database
router.get('/courses/:id',courseDetails)

// All blogs
router.post('/blogs',BlogPost)

// All blogs
router.get('/blogs',BlogsRead)

// individual blog by id
router.get('/blogs/:id',BlogReadById)

// individual blog by id
router.post('/create-payment-intent',PaymentMethod)



module.exports = router