const { courses } = require('../controller/courseController')

const router = require('express').Router()


router.get('/courses',courses)
// router.post('/logout',logout)

module.exports = router