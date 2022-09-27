const express = require("express");
const cors = require("cors"); 

//Require route-logger
const logRoute = require("./route-logger")
// Require wishes
const wishes = require("./wishes")

// Make the server
const app = express();

//Allow requests from other origins
app.use(cors())

app.use(express.json())

// Add middleware to log routes
app.use(logRoute);

// Set up the server routes
app.get("/", (req, res) => {
    res.send("Welcome to the Wishing Well");
});

app.get("/wishes", (req, res) => {
    res.send(wishes)
})

app.post("/vote", (req, res) => {
    const id = req.body.id
    const type = req.body.type

    if (type == 'grant'){
        wishes[id].grant++
        res.status(201).send("Wish grant increased")
    } else if (type == 'deny'){
        wishes[id].deny++
        res.status(201).send("Wish deny increased")
    } else {
        res.status(400).send("Incorrect type")
    }
    
})

app.post("/create", (req, res) => {
    const wish = req.body
    wish.id = wishes.length
    wishes.push(wish)
    res.status(201).send("Wish added!")
})







module.exports = app;
