const { courses, categories } = require('../controller/courseController')

const router = require('express').Router()

// Course Router
router.get('/courses',courses)

// Unique category router
router.get('/categories',categories)

module.exports = router