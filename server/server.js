const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const path = require('path')
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "100mb", }));


const db = process.env.MONGO_URI
mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then((database) => {
    console.log("Successfully connected to: " + database.connections[0].host)
})
.catch((err) => {
    console.log("Error connecting to database: " + err)
})

const friends = require("./routes/api/friends")
app.use("/api/friends", friends)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'))
    app.get('/.*/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    })
}

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Friends List server running on PORT: ${port}`)
})
