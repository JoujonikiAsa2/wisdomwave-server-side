const { Likes } = require('../controller/LikesController')
const { Payment, PaymentSuccess, PaymentCancel, PaymentFail, Home } = require('../controller/PaymentController')
const { PurchasedCourses } = require('../controller/PurchasedCoursesController')
const { courses, categories, courseDetails, totalCourse, totalCategory, searchedCategories } = require('../controller/courseController')
const { DiscussionPost, ReplyPost, DiscussionsRead, DiscussionReadById, DiscussionLikes } = require('../controller/discussionController')

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

// individual discussion by id
router.get('/discussions/:id',DiscussionReadById)

// individual discussion by id and update likes
router.get('/discussions/likes/user',Likes)

// Payment post api
router.post('/payment/:id', Payment)

//payment success post api
router.post('/payment/success/:tran_Id', PaymentSuccess)

//payment cancel api
router.post('/payment/cancel', PaymentCancel)

//payment failed api
router.post('/payment/fail', PaymentFail)

//purchased course api
router.get('/purchasedCourses/:email', PurchasedCourses)

//homepage
router.get('/home', Home)

module.exports = router