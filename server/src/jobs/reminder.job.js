import cron from "node-cron";
import Task from "../models/task.model.js"
import { sendTaskReminder } from "../services/email.service.js";

cron.schedule("*/10 * * * *", async () => {
    console.log("⏳ Running reminder job...");

    const now = new Date();
    const oneDayLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    const tasks = await Task.find({
        status: "pending",
        reminderSent: false,
    }).populate({
        path: "author",
        select: "email", 
    });
  
    const due = new Date(task.dueDate);

    let sendReminder = false;

    // Check if task is due in ~1 day
    if (
        Math.abs(due - oneDayLater) < 10 * 60 * 1000 // 10-minute window
    ) {
        sendReminder = true;
        task.reminderType = "1-day";
    }

    // Check if task is due in ~1 hour
    if (
        Math.abs(due - oneHourLater) < 10 * 60 * 1000 // 10-minute window
    ) {
        sendReminder = true;
        task.reminderType = "1-hour";
    }

    if (sendReminder) {
        try {
            await sendTaskReminder({
                to: task.author.email,
                task,
            });

            console.log(
                `✅ Reminder sent for task: ${task.title} (${task.reminderType})`
            );

        
            if (!task.remindersSent) task.remindersSent = [];
            task.remindersSent.push(task.reminderType);

            await task.save();
        } catch (err) {
            console.error(`❌ Failed for task ${task._id}:`, err.message);
        }
    }
});
