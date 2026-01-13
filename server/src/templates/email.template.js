export const taskReminderTemplate = ({ task, clientUrl }) => {
    return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Task Reminder</title>
    </head>
    <body style="
      margin:0;
      padding:0;
      background-color:#0f172a;
      font-family: Arial, Helvetica, sans-serif;
      color:#ffffff;
    ">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:40px 16px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="
              max-width:420px;
              background-color: rgba(0,0,0,0.85);
              border-radius:16px;
              padding:32px;
              box-shadow: 0 20px 40px rgba(0,0,0,0.6);
            ">

              <!-- Header -->
              <tr>
                <td align="center">
                  <h1 style="
                    margin:0 0 8px;
                    font-size:26px;
                    font-weight:700;
                  ">
                    ⏰ Task Reminder
                  </h1>
                  <p style="
                    margin:0 0 24px;
                    font-size:14px;
                    color:#cbd5f5;
                  ">
                    You have a pending task to complete
                  </p>
                </td>
              </tr>

              <!-- Task Card -->
              <tr>
                <td style="
                  background-color:#020617;
                  border-radius:12px;
                  padding:20px;
                  margin-bottom:24px;
                ">
                  <p style="margin:0 0 6px; font-size:12px; color:#94a3b8;">
                    TASK
                  </p>
                  <h2 style="
                    margin:0 0 12px;
                    font-size:18px;
                    font-weight:600;
                  ">
                    ${task.title}
                  </h2>

                  <p style="margin:6px 0; font-size:14px;">
                    📅 <b>Due:</b> ${new Date(task.dueDate).toDateString()}
                  </p>
                  <p style="margin:6px 0; font-size:14px;">
                    🚀 <b>Priority:</b> ${task.priority}
                  </p>
                </td>
              </tr>

              <!-- CTA -->
              <tr>
                <td align="center" style="padding-top:24px;">
                  <a href="${clientUrl}" target="_blank" style="
                    display:inline-block;
                    background-color:#38bdf8;
                    color:#020617;
                    text-decoration:none;
                    padding:12px 28px;
                    border-radius:10px;
                    font-size:15px;
                    font-weight:600;
                  ">
                    Go to Dashboard
                  </a>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="padding-top:32px;">
                  <p style="
                    margin:0;
                    font-size:12px;
                    color:#94a3b8;
                  ">
                    © ${new Date().getFullYear()} Task Manager  
                    <br />
                    Stay productive ✨
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
