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
    console.log(wishes)
    res.send(wishes)
})

app.post("/vote", (req, res) => {
    let id = req.body.id
    id = Number(id)
    const type = req.body.type
    if (type == 'grant'){
        wishes[id].grant++
        console.log(wishes)
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

app.get("/ascending", (req, res) => {
    wishes.sort((a,b) => {return b.grant - a.grant})
    console.log(wishes)
    res.send(wishes)
})

module.exports = app;
