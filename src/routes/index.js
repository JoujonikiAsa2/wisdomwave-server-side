const { courses, categories, courseDetails, totalCourse, totalCategory, searchedCategories } = require('../controller/courseController')
const { DiscussionPost, ReplyPost, DiscussionsRead, DiscussionReadById } = require('../controller/discussionController')
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

//searchedCourse by course title
router.get('/searchedCategory/:category', searchedCategories)

// All discussions post api
router.post('/discussions',DiscussionPost)

//reply post api
router.post('/discussions/:id',ReplyPost)

// All discussions get api
router.get('/discussions',DiscussionsRead)

// individual blog by id
router.get('/discussions/:id',DiscussionReadById)

// individual blog by id
router.post('/create-payment-intent',PaymentMethod)



module.exports = router