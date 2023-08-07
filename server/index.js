import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import tourRouter from './routes/tourRoute.js'
import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'
import reviewRouter from './routes/reviewRoute.js'
import bookingRouter from './routes/bookingRoute.js'
// c User = require("./models/User")
// const Tour = require("./models/Tour")
// const Review = require("./models/Review")


dotenv.config();
const app = express();
const corsOptions = {
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
}
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

//ROUTES
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/bookings', bookingRouter)


const PORT = process.env.PORT || 4000;

// Add your routes and middleware here if needed


mongoose.set('strictQuery', false);
async function startServer() {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB successful!");
      app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
          /* ADD DATA ONE TIME */
      // User.insertMany(users);
      // Post.insertMany(posts);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
  
  startServer();


