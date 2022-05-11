// ---- package imports ----
const express = require('express')
const cookieParser = require("cookie-parser")
const cors = require('cors')

// ---- routes imports -----
const authRoutes = require('./routes/authRoutes')
const uiRoutes = require("./routes/uiRoutes")

// ---- server vars ----
const app = express()
const PORT = process.env.PORT || 5000
const corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
};

// ---- app use ----
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.text())
app.use(express.static("static"))
app.use(cookieParser())
app.use(cors(corsOptions))

// ---- using routes ----
app.use(authRoutes)
app.use(uiRoutes)



// ---- listening ----
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))