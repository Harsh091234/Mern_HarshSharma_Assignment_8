import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React from "react";

const priorityColorMap = {
    High: "#ef4444",   
    Medium: "#f59e0b",
    Low: "#22c55e",   
};

const TaskCalender = ({ tasks }) => {
    return (
        <div className="bg-black/70 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-xl border border-white/10 overflow-x-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white">
                Task Calendar
            </h2>

            <div className="min-w-[320px]">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    height="auto"
                    aspectRatio={1.2}
                    headerToolbar={{
                        left: "prev,next",
                        center: "title",
                        right: "today",
                    }}
                    dayMaxEventRows={2}
                    fixedWeekCount={false}
                    expandRows
                    handleWindowResize
                    windowResizeDelay={100}
                    eventDisplay="block"

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
                        <div className="px-1 py-0.5 rounded text-[10px] sm:text-xs font-medium truncate">
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
                />
            </div>
        </div>
    );
};


export default TaskCalender;
