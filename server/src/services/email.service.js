import { taskReminderTemplate } from "../templates/email.template.js";
import transporter from "../config/mailer.js";

export const sendTaskReminder = async ({ to, task }) => {
  
    await transporter.sendMail({
        from: `"Task Manager" <${process.env.SMTP_USER}>`,
        to,
        subject: `⏰ Reminder: ${task.title}`,
        html: taskReminderTemplate({task, clientUrl: process.env.CLIENT_URL}),
    });
};
