import express from "express";

import {protectRoute} from "../middlewares/protectedRoute.js"
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createTask);
router.get("/get", protectRoute, getTasks);
router.patch("/update/:id", protectRoute, updateTask);
router.delete("/delete/:id", protectRoute, deleteTask);


export default router;
