import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React from "react";

const priorityColorMap = {
    High: "#ef4444",    // red-500
    Medium: "#f59e0b",  // amber-500
    Low: "#22c55e",     // green-500
};

const TaskCalender = ({ tasks }) => {
    return (
        <div className="bg-black/70 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/10">
            <h2 className="text-xl font-semibold mb-3 text-white">
                Task Calendar
            </h2>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height="auto"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "",
                }}
                events={tasks.map((t) => ({
                    id: t._id,
                    title: t.title,
                    date: t.dueDate,
                    backgroundColor: priorityColorMap[t.priority],
                    borderColor: "transparent",
                    textColor: "#000",
                    extendedProps: {
                        description: t.description,
                        priority: t.priority,
                        status: t.status,
                    },
                }))}
                eventContent={(arg) => (
                    <div className="px-1 py-0.5 rounded text-xs font-medium truncate">
                        {arg.event.title}
                    </div>
                )}
                eventDidMount={(info) => {
                    info.el.title = `
${info.event.title}
Priority: ${info.event.extendedProps.priority}
Status: ${info.event.extendedProps.status}
${info.event.extendedProps.description ?? ""}
          `;
                }}
                dayMaxEventRows={3}
                fixedWeekCount={false}
            />
        </div>
    );
};

export default TaskCalender;
