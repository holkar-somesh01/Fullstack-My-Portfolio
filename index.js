const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { adminProtected } = require("./middleware/Protected")
require("dotenv").config({ path: "./.env" })   // env File Path 

const app = express()
// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true}))
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/admin",adminProtected, require("./routes/admin.routes"))
app.use("/api/public",require("./routes/public.routes"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resours Not found" })
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "SERVER ERROR", error: err.message })
})
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT, console.log("SERVER RUNNING 🏃‍♂️"))
})