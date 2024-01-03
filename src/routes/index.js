const { blogs, blog, BlogPost, BlogsRead, BlogReadById } = require('../controller/blogController')
const { courses, categories, courseDetails } = require('../controller/courseController')

const router = require('express').Router()

// Course Router
router.get('/courses',courses)

// Unique category router
router.get('/categories',categories)

// individual course from courses database
router.get('/courses/:id',courseDetails)

// All blogs
router.post('/blogs',BlogPost)

// All blogs
router.get('/blogs',BlogsRead)

// individual blog by id
router.get('/blogs/:id',BlogReadById)

module.exports = router