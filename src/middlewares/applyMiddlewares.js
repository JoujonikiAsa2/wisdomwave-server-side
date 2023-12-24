const cors = require('cors')
const express = require('express')

const applyMiddlewares = (app) => {

    app.use(cors());
    app.use(express.json())
}

module.exports = applyMiddlewares