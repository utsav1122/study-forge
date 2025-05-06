const express = require("express")
const dotenv = require("dotenv")
const userRoutes = require("./routes/User")
const courseRoutes = require("./routes/Course")
const paymentRoutes = require("./routes/Payments")
const profileRoutes = require("./routes/Profile")
const contactRoutes = require("./routes/Contact")
const chatRoutes = require("./routes/chatRoutes")

const cookieParser = require("cookie-parser")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const { dbConnect } = require("./config/database")
const { cloudinaryConnect } = require("./config/cloudinaryConnect")
dotenv.config()

const PORT = process.env.PORT || 8000

dbConnect().then(() => {
    console.log("DB Connected Successfully")

    
})

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
)
app.use(
  fileUpload({
    useTempFiles: true,
    //  tempFileDir: '/tmp/',
    //  debug: true,
  })
)

cloudinaryConnect()

app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/course", courseRoutes)
app.use("/api/v1/payment", paymentRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/reach", contactRoutes)
app.use("/api/v1", chatRoutes)

// app.get("/",(req,res)=>{
//    res.send(`<h1>Server Started</h1>`)
// });

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
