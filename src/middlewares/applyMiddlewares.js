const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')


const applyMiddlewares = (app) => {

    app.use(cors(  {origin: ["http://localhost:5173", "https://wisdomwave-project.netlify.app"],
        credentials: true}));
    app.use(express.json())
    app.use(cookieParser())
}

module.exports = applyMiddlewares