const { payment, paymentSuccess, paymentFail, paymentCancel, home, totalEarningByInstructor, platformEarningCalculation, transactions, totalEarningByMonth } = require('../controller/paymentController')
const { tutorDetails, createProfile, tuitions, requestedTuitionByTutorEmail, messageStudent, getTuitionRequestFromTutor, tutorProfile, updatePhoto, updateInfo, deleteProfile } = require('../controller/tutorsController')
const { courses, totalCourse, totalCategory, categories, courseDetails, searchedCategories, searchCourses, deleteCourse, findCourseByEmail, updateCourse, createCourse } = require('../controller/courseController')
const { discussionPost, replyPost, discussionsRead, discussionReadById, deleteDiscussion } = require('../controller/discussionController')
const { likes } = require('../controller/likesController')
const { purchasedCourses } = require('../controller/purchasedCoursesController')
const { createUser, readUser, readUserByEmail, updateUser, deleteUser, updateUserType } = require('../controller/userController')
const { createAnnouncement, deleteAnnouncement, announcements, StudentAnnouncements, readStatusUpdate, isReadStatus } = require('../controller/AnnouncementController')
const { createLiveClass } = require('../controller/LiveClassController')
const { enrolledStudents, totalStudents, coursebyId } = require('../controller/InstructorController')
const { createTuitions, tuitionsByEmail, tutors, requestedTuition, messageTutor } = require('../controller/StudentController')
const { createQuiz, assignments } = require('../controller/AssignmentController')
const { quizResponse, readQuiz } = require('../controller/QuizController')
const { tuitionCreate } = require('../controller/TuitionController')
const { readDistricts, readDistrictByName } = require('../controller/DistrictController')
const { readUpazilasByDistrictId, readUpazilas } = require('../controller/UpazilaController')
const { institutes, eduLevels, subjects } = require('../controller/EduBgController')
const { deleteCourseAdmin, searchCourse, searchCourseAdmin, updateCourseByAdmin } = require('../controller/AdminController')

const router = require('express').Router()


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
router.delete('/discussions/:id/:email', deleteDiscussion)

// individual discussion by id and update likes
router.get('/discussions/likes/user', likes)

// create tuition
router.post('/tuitions', tuitionCreate)



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
router.get('/instructorUpdateCourses/:id', coursebyId)


// individual course from courses database
router.get('/courses/email/:instructorEmail', findCourseByEmail)

// delete course from courses database by 
router.delete('/courses/id/:id/email/:instructorEmail', deleteCourse)

// update course info after searching by id
router.patch('/courses/:id', updateCourse)

// create announcement api
router.post('/announcements', createAnnouncement)

// delete announcement api
router.delete('/announcement/:id', deleteAnnouncement)

// find announcement student eamil
router.get('/announcements/:email', StudentAnnouncements)

// find announcement student eamil
router.patch('/announcements/:email', readStatusUpdate)

// find announcement email and satatus
router.post('/announcements/isRead', isReadStatus)
// find announcement email and satatus
router.get('/announcements/isRead/email/:email', isReadStatus)

// find announcement by email
router.get('/announcements/email/:email', announcements)

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
router.post('/student/messages', messageStudent)




// student
// -----------------------------------------------------------------------------------

// specific tutor api
router.get('/tutor/:id', tutorDetails)

// cantact tutor api
router.post('/messages', messageTutor)

// all tutors api
router.get('/tutors', tutors)

// tuitions api
router.get('/tuitions/:userEmail', tuitionsByEmail)

// create tuitions api
router.post('/tuitions', createTuitions)

// allTuition request by email
router.get('/requestedTuition/:email', requestedTuition)

// read request from tutor api
router.get('/student/tuitionRequest/:email', getTuitionRequestFromTutor)


// user's api
// ---------------------------------------------------------------------------

// create student api
router.post('/users', createUser)

// update student info api
router.put('/user/:email', updateUser)

// read student api
router.get('/users', readUser)

// read student by email api
router.get('/user/:email', readUserByEmail)

// delete user
router.delete('/user/:email', deleteUser)

// update user type as admin
router.patch('/user/:email', updateUserType)


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

// calculate total earning for platform
router.get('/platformEarning', platformEarningCalculation)

// calculate earning by month
router.get('/earningByMonth', totalEarningByMonth)

// delete course
router.delete('/courses/id/:id', deleteCourseAdmin)

// search course
router.get('/courses/email/query/:email', searchCourseAdmin)


module.exports = router