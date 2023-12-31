const { courses, categories, courseDetails } = require('../controller/courseController')

const router = require('express').Router()

// Course Router
router.get('/courses',courses)

// Unique category router
router.get('/categories',categories)

// individual course from courses database
router.get('/courses/:id',courseDetails)

module.exports = router