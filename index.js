// IMPORT EXPRESS
const express = require("express");
const cors = require("cors");
const parser = require("body-parser");

// CREATE HTTP_SERVER
const HTTP_SERVER = express();

// PARSER DETAILS - PARSE ALL INCOMING DETAILS AS JSON
HTTP_SERVER.use(parser.json());

// SERVER DETAILS
const CONFIG = {
    PORT: 3000,
    HOSTNAME: "0.0.0.0"
};

var whitelist = ['http://127.0.0.1:5500', 'http://127.0.0.1:5501', undefined]
var corsOptions = {
    origin: function (origin, callback) {
        console.log(origin)
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// INJECT CORS
HTTP_SERVER.use(cors(corsOptions));

// START AND LISTEN TO THE SERVER
HTTP_SERVER.listen(CONFIG.PORT, CONFIG.HOSTNAME, () => {
    console.log(`SERVER STARTED AT ${CONFIG.PORT}`)
})

const data = [{
    task: "Get up at 4.00AM"
}, {
    task: "Brush teeth"
}];

// ROUTE | GET | ALL TASKS
HTTP_SERVER.get('/', (req, res) => {
    return res.status(200).json({
        tasks: data,
        message: "Tasks fetched successfully!"
    })
})

// ROUTE | POST | CREATE NEW TASK
HTTP_SERVER.post('/create', (req, res) => {
    if (req.body && req.body.task) {
        data.push(req.body)
        return res.status(201).json({
            message: "Task created successfully!"
        })
    } else {
        return res.status(500).json({
            message: "Something went wrong!"
        })
    }
})