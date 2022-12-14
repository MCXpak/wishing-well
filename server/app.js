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

let order = 'ascending'

// Set up the server routes
app.get("/", (req, res) => {
    res.send("Welcome to the Wishing Well");
});

app.get("/wishes", (req, res) => {
    body = {
        wishes: wishes,
        order: order 
    }
    res.send(body)
})

app.post("/vote", (req, res) => {
    //Get id
    let id = req.body.id
    id = Number(id)
    //Get type
    const type = req.body.type
    //Get correct wish with id
    let wish;
    for(const w of wishes){
        if(w["id"] == id) {
            wish = w
        }
    }

    if (type == 'grant'){
        wish.grant++
        res.status(201).send("Wish grant increased")
    } else if (type == 'deny'){
        wish.deny++
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
    order = 'ascending'
    res.send(wishes)
})

app.get("/descending", (req, res) => {
    wishes.sort((a,b) => {return a.grant - b.grant})
    order = 'descending'
    res.send(wishes)
})

module.exports = app;
