const { payment, paymentSuccess, paymentFail, paymentCancel, home } = require('../controller/paymentController')
const { tuitions, tutors, tutorDetails, messageTutor, requestedTuition } = require('../controller/tutorsController')
const { courses, totalCourse, totalCategory, categories, courseDetails, searchedCategories, searchCourses } = require('../controller/courseController')
const { discussionPost, replyPost, discussionsRead, discussionReadById } = require('../controller/discussionController')
const { likes } = require('../controller/likesController')
const { purchasedCourses } = require('../controller/purchasedCoursesController')
const { createUser, readUser, readUserByEmail, updateUser } = require('../controller/userController')

const router = require('express').Router()


// courses
//---------------------------------------------------------------------------
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

//searchedCourse by course category
router.get('/searchedCategory/:category', searchedCategories)

//searchedCourse by course title
router.get('/search/key/:searchValue', searchCourses)


// discussions
// ------------------------------------------------------------------------------------------
// All discussions post api
router.post('/discussions',discussionPost)

//reply post api
router.post('/discussions/:id',replyPost)

// All discussions get api
router.get('/discussions',discussionsRead)

// individual discussion by id
router.get('/discussions/:id',discussionReadById)

// individual discussion by id and update likes
router.get('/discussions/likes/user',likes)



// payment
//------------------------------------------------------------------------------------
// Payment post api
router.post('/payment/:id', payment)

//payment success post api
router.post('/payment/success/:courseId', paymentSuccess)

//payment cancel api
router.post('/payment/cancel/:courseId', paymentCancel)

//payment failed api
router.post('/payment/fail/:courseId', paymentFail)

//purchased course api
router.get('/purchasedCourses/:email', purchasedCourses)

//homepage
router.get('/home', home)


// tutors
//-----------------------------------------------------------------------------------
// tuitions api
router.get('/tuitions', tuitions)

// tutors api
router.get('/tutors', tutors)

// specific tutor api
router.get('/tutor/:id', tutorDetails)

// cantact tutor api
router.post('/messages', messageTutor)

// allTuition request
router.get('/requestedTuition/:email', requestedTuition)


// student
// -----------------------------------------------------------------------------------

// create student api
router.post('/users', createUser)

// update student api
router.put('/user/:email', updateUser)

// read student api
router.get('/users', readUser)

// read student by email api
router.get('/user/:email', readUserByEmail)

module.exports = router