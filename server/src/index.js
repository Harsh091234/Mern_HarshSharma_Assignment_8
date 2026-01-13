import express from 'express';
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from 'path';
import connectDB from './config/db.js';
import userRoutes from "./routes/user.route.js"
import taskRoutes from "./routes/task.routes.js"
import "./jobs/reminder.job.js"


dotenv.config();

const __dirname = path.resolve()
const app = express();
const PORT = process.env.PORT || 5000;

app.use('/pictures', express.static('public/pictures'));

app.use(cookieParser());
app.use(express.json());;
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,               
}))


app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

if (process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    connectDB();
});