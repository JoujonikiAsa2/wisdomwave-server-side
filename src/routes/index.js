const { payment, paymentSuccess, paymentFail, paymentCancel, home, totalEarningByInstructor, platformEarningCalculation, totalEarningByMonth } = require('../controller/paymentController')
const { tutorDetails, createProfile, tuitions, requestedTuitionByTutorEmail, messageStudent, tutorProfile, updatePhoto, updateInfo, deleteProfile, tuitionMessageFromStudent, getTuitionRequestFromStudent, tuitionMessageFromTutor } = require('../controller/tutorsController')
const { courses, totalCourse, totalCategory, categories, courseDetails, searchedCategories, searchCourses, deleteCourse, findCourseByEmail, updateCourse, createCourse, updateRating,reviews } = require('../controller/courseController')
const { discussionPost, replyPost, discussionsRead, discussionReadById, deleteDiscussion, discussionLikes, isLikedOnDiscussion } = require('../controller/discussionController')
const { purchasedCourses, openCerticates, closeCerticates, searchPurchasedCourses } = require('../controller/purchasedCoursesController')
const { createUser, readUser, readUserByEmail, updateUser, deleteUser, updateUserType, updateUserStatus } = require('../controller/userController')
const { createAnnouncement, StudentAnnouncements, readStatusUpdate, isReadStatus, instructorAnnouncements } = require('../controller/AnnouncementController')
const { createLiveClass } = require('../controller/LiveClassController')
const { enrolledStudents, totalStudents, coursebyId, purchasedById } = require('../controller/InstructorController')
const { tuitionsByEmail, tutors, requestedTuition, messageTutor } = require('../controller/StudentController')
const { createQuiz, assignments } = require('../controller/AssignmentController')
const { quizResponse, readQuiz } = require('../controller/QuizController')
const { tuitionCreate } = require('../controller/TuitionController')
const { readDistricts, readDistrictByName } = require('../controller/DistrictController')
const { readUpazilasByDistrictId, readUpazilas } = require('../controller/UpazilaController')
const { institutes, eduLevels, subjects } = require('../controller/EduBgController')
const { deleteCourseAdmin,tuitionUpdate, tuitionDetails, tuitionRemove, searchCoursebyEmail } = require('../controller/AdminController')
const { signInToken } = require('../middlewares/signInToken')
const { logOut } = require('../middlewares/logOut')
const { verifyAdmin } = require('../middlewares/verifyAdmin')
const { readFAQs, createFAQs, deleteFAQs } = require('../controller/FAQsController')

const router = require('express').Router()

// jwt
router.post('/jwt', signInToken)

// logout
router.post('/logout', logOut)


// courses
//---------------------------------------------------------------------------
// Course api
router.get('/courses', courses)


// toalcourse api
router.get('/totalCourse', totalCourse)

// toalcategory api
router.get('/totalCategory', totalCategory)

// Unique category api
router.get('/categories', categories)

// individual course from courses database
router.get('/courses/:id', courseDetails)

//searchedCourse by course category
router.get('/searchedCategory/:category', searchedCategories)

//searchedCourse by course title
router.get('/search/key/:searchValue', searchCourses)

// all reviews of a instructor
router.get('/reviews/:courseId', reviews)



// discussions
// ------------------------------------------------------------------------------------------
// All discussions post api
router.post('/discussions', discussionPost)

//reply post api
router.post('/discussions/:id', replyPost)

// All discussions get api
router.get('/discussions', discussionsRead)

// individual discussion by id
router.get('/discussions/:id', discussionReadById)

// individual discussion by id
router.delete('/discussions/:id', deleteDiscussion)

// likes count
router.patch('/likes/:id', discussionLikes)

// checking rout either a user liked or not
router.get('/likes/:id/:email', isLikedOnDiscussion)



// FAQ
// -----------------------------------------------------------------------------------

// read all faqs api
router.get('/faqs', readFAQs)

// create faq api
router.post('/faqs', createFAQs)

// delete faqs api
router.delete('/faqs/:id', deleteFAQs)

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
router.post('/courses', createCourse)

// // individual course from courses database
router.get('/instructorUpdateCourses/:id', purchasedById)


// individual course from courses database
router.get('/courses/email/:instructorEmail', findCourseByEmail)

// delete course from courses database by 
router.delete('/courses/id/:id/email/:instructorEmail', deleteCourse)

// update course info after searching by id
router.patch('/courses/:id', updateCourse)

// create announcement api
router.post('/announcements', createAnnouncement)


// find announcement student eamil
router.get('/announcements/:email', StudentAnnouncements)

// find announcement student eamil
router.patch('/announcements/:email', readStatusUpdate)

// find announcement email and satatus
router.get('/announcements/isRead/email/:email', isReadStatus)

// find announcement by instructor Email
router.get('/announcements/email/:email', instructorAnnouncements)

// live class link update api
router.put('/liveClasses/id/:id', createLiveClass)

// create assignmentTask
router.post('/assignments', createQuiz)

// read quiz response
router.get('/quiz/:email/:patternTitle', readQuiz)

// create quiz response
router.post('/quiz', quizResponse)

// read assignmentTask
router.get('/assignments/:id/:title', assignments)

// live class link update api
router.get('/totalEarningByInstructor/:email', totalEarningByInstructor)

// enrolled students
router.get('/enrolledStudents/instructor/:instructorEmail', enrolledStudents)

// Total Student counter
router.get('/totalStudents/instructor/email/:instructorEmail', totalStudents)

// certificate
router.patch('/certification/id/:id', openCerticates)

// close certificate
router.patch('/certification/close/id/:id', closeCerticates)

// find student by course name
router.get('/course/:searchValue', searchPurchasedCourses)


// tutors
//-----------------------------------------------------------------------------------

// read profile data api
router.get('/tutors/:userEmail', tutorProfile)

// update profile photo api
router.patch('/tutors/:userEmail', updatePhoto)

// update profile info api
router.patch('/tutors/info/:userEmail', updateInfo)

// delete profile api
router.delete('/tutors/:userEmail', deleteProfile)

// create tutor api
router.post('/tutors/:userEmail', createProfile)

// allTuition request
router.get('/requestedTuition/tutor/:tutorEmail', requestedTuitionByTutorEmail)

// tuitions api
router.get('/tuitions', tuitions)

// update tution requeststatus
router.put('/requestedTuition/:tutorEmail', requestedTuition)

// send message to student api
router.get('/student/messages/:email', tuitionMessageFromTutor)

// send message to student api
router.post('/student/messages', messageStudent)




// student
// -----------------------------------------------------------------------------------

// specific tutor api
router.get('/tutor/:id', tutorDetails)

// cantact tutor api
router.post('/messages', messageTutor)

// all tutors api
router.get('/tutors', tutors)

// create tuition
router.post('/tuitions', tuitionCreate)

// allTuition request by email
router.get('/requestedTuition/:email', requestedTuition)

// read request from tutor api
router.get('/student/tuitionRequest/:email', getTuitionRequestFromStudent)

// update rating status
router.patch('/student/rating/:courseId', updateRating)




// user sign up and validation api
// ---------------------------------------------------------------------------

// create student api
router.post('/users', createUser)

// update student info api
router.put('/user/:email', updateUserStatus)


// others
// -----------------------------------------------------------------------

// read district value
router.get('/districts', readDistricts)

// read district by name
router.get('/districts/:name', readDistrictByName)

// read upazilas
router.get('/upazilas', readUpazilas)

// read upazila by district_id
router.get('/upazilas/:id', readUpazilasByDistrictId)

// get institutes name
router.get('/institutes', institutes)

// get subjects name
router.get('/subjects', subjects)

// get education levels
router.get('/educationLevels', eduLevels)


// admin
// ------------------------------------------------------------------------

// read student api
router.get('/users', verifyAdmin, readUser)

// read student by email api
router.get('/user/:email', readUserByEmail)

// delete user
router.delete('/user/:email', verifyAdmin, deleteUser)

// calculate total earning for platform
router.get('/platformEarning',verifyAdmin, platformEarningCalculation)

// calculate earning by month
router.get('/earningByMonth',verifyAdmin, totalEarningByMonth)

// delete course
router.delete('/courses/id/:id',verifyAdmin, deleteCourseAdmin)

// search course
router.get('/courses/email/query/:email',verifyAdmin, searchCoursebyEmail)

// updateTuition details
router.patch('/tuitions/:email',verifyAdmin, tuitionUpdate)

// get tuition details
router.post('/tuitions/:email', tuitionDetails)

// delete tuition details
router.delete('/tuitions/:tuitionCode',verifyAdmin, tuitionRemove)

// update user type as admin
router.patch('/user/:email',verifyAdmin, updateUserType)

// tuitions api
router.get('/tuitions/:userEmail', verifyAdmin, tuitionsByEmail)


module.exports = router