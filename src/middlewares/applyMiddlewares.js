const cors = require('cors')
const express = require('express')

// Middlewares

const applyMiddlewares = (app) => {

    app.use(cors());
    app.use(express.json())
}

module.exports = applyMiddlewares