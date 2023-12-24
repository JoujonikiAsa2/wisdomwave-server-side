const express = require("express");
const app = express();
const applyMiddlewares = require("./src/middlewares/applyMiddlewares");
const globalErrorHandler = require("./src/utils/globalErrorHandler");
const connectDB = require("./src/db/connectDB");
const router = require("./src/routes");
require("dotenv").config();
const port = 5000

// import the middlewares
applyMiddlewares(app)


// Check if the server is running  
app.get('/health', (req, res) => {
    res.send('Wisdomwave is running.........')
})

// Routing Implement
app.use("/api", router);

// handle error for all method 
app.all("*", (req, res, next) => {
    const error = new Error(`The requested [${req.url}] is invalid`)
    error.status = 404
    next(error)
})

// HandleError for all routes
app.use(globalErrorHandler);

const main = async () => {
    await connectDB()
    try {
        app.listen(port, () => {
            console.log(`WisdomWave Server is running on port ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
}

main()
module.exports = app;