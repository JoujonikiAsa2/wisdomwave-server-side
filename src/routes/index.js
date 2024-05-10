const { payment, paymentSuccess, paymentFail, paymentCancel, home, totalEarning } = require('../controller/paymentController')
const { tuitions, tutors, tutorDetails, messageTutor, requestedTuition } = require('../controller/tutorsController')
const { courses, totalCourse, totalCategory, categories, courseDetails, searchedCategories, searchCourses, deleteCourse, findCourseByEmail, updateCourse, createCourse } = require('../controller/courseController')
const { discussionPost, replyPost, discussionsRead, discussionReadById } = require('../controller/discussionController')
const { likes } = require('../controller/likesController')
const { purchasedCourses } = require('../controller/purchasedCoursesController')
const { createUser, readUser, readUserByEmail, updateUser } = require('../controller/userController')
const { createAnnouncement, deleteAnnouncement, announcements } = require('../controller/AnnouncementController')
const { createLiveClass } = require('../controller/LiveClassController')
const { enrolledStudents, totalStudents } = require('../controller/InstructorController')

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

// instructor
// -------------------------------------------------------------------------------------


// Course api
router.post('/courses',createCourse)

// individual course from courses database
router.get('/courses/email/:instructorEmail',findCourseByEmail)

// delete course from courses database by 
router.delete('/courses/id/:id/email/:instructorEmail',deleteCourse)

// update course info after searching by id
router.put('/courses/:id', updateCourse)

// create announcement api
router.post('/announcements', createAnnouncement)

// delete announcement api
router.delete('/announcement/:id', deleteAnnouncement)

// find announcement by email
router.get('/announcements/email/:email', announcements)

// find quiz by email
router.get('/quizs/:email', announcements)

// create quiz api
router.post('/quizs', createAnnouncement)

// live class link update api
router.put('/liveClasses/id/:id', createLiveClass)

// live class link update api
router.put('/totalEarning/:email', totalEarning)

// live class link update api
router.get('/totalEarning/:email', totalEarning)

// enrolled students
router.get('/enrolledStudents/instructor/:instructorEmail', enrolledStudents)

// Total Student counter
router.get('/totalStudents/instructor/email/:instructorEmail', totalStudents)



// tutors
//-----------------------------------------------------------------------------------

// tuitor api
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

// update student info api
router.put('/user/:email', updateUser)

// read student api
router.get('/users', readUser)

// read student by email api
router.get('/user/:email', readUserByEmail)

module.exports = router