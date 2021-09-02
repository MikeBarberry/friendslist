const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const path = require('path')
const cors = require("cors")
const mongoose = require("mongoose")

const friends = require("./routes/api/friends")
const app = express()
const db = process.env.MONGO_URI

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((database) => {
        console.log("Successfully connected to: " + database.connections[0].host)
    })
    .catch((err) => {
        console.log("Error connecting to database: " + err)
    })

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "100mb", }));

app.use(express.static(path.join(__dirname, "../client/dist")))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"))
})

app.get("/ping", (req, res) => {
  return res.send("pong")
})

app.use("/api/friends", friends)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Friends List server running on PORT: ${port}`)
})
