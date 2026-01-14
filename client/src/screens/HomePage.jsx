import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { LogOut, Plus, X } from "lucide-react";
import { EditTaskModal } from "../components/modals/EditTaskModal";
import { AddTaskModal } from "../components/modals/AddTaskModal";
import { useTaskStore } from "../store/taskStore";
import {useUserStore} from "../store/userStore"
import TaskCalender from "../components/TaskCalender";
import {useNavigate} from "react-router-dom"
const HomePage = () => {
    const {tasks, isLoading, getTasks, deleteTask, updateTask} = useTaskStore();                   
    const {user, logout} = useUserStore();
    const [editTask, setEditTask] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
const navigate = useNavigate();
    const priorityColors = {
        High: "bg-red-500",
        Medium: "bg-yellow-500",
        Low: "bg-green-500",
    };
  const formatDate = (date) => {
    if (!date) return "No due date";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const handleLogout = () => {
   const res = logout();
    if(res === true) navigate("/login")
  }
  const handleCheckbox = async (task) => {
    await updateTask(task._id, {
      status: "completed",
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    deleteTask(task._id);

  };

    const setEditingTask = (task) => {
        setShowEditModal(true);
        setEditTask(task);
    }
    useEffect(() => {
  
      getTasks();
    }, [])

    if(isLoading) return;
    return (
        <div className="min-h-screen py-6 max-sm:px-2 px-10 bg-gradient-to-br from-sky-500 to-black text-white">

  
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
            My Tasks
          </h1>

          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-black px-4 py-2 rounded-lg font-semibold transition w-full md:w-auto"
            >
              <Plus size={18} />
              Add Task
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition w-full md:w-auto"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className={`flex flex-col gap-4 p-4 rounded-lg shadow-md md:flex-row md:items-center md:justify-between ${task.status === "completed" ? "bg-gray-700 line-through" : "bg-black/70"
                    }`}
                >
                  {/* Left section */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.status === "completed"}
                      onChange={() => handleCheckbox(task)}
                      className="accent-sky-500 w-5 h-5 mt-1"
                    />

                    <div className="space-y-1 break-words">
                      <p className="font-semibold text-base">
                        {task.title}
                      </p>

                      {task.description && (
                        <p className="text-sm text-gray-400">
                          {task.description}
                        </p>
                      )}

                      <p className="text-xs text-gray-300">
                        Due: {formatDate(task.dueDate)} • Priority: {task.priority} • Status:{" "}
                        <span
                          className={`font-medium ${task.status === "completed"
                              ? "text-green-400"
                              : task.status === "in-progress"
                                ? "text-yellow-400"
                                : "text-red-400"
                            }`}
                        >
                          {task.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Right section */}
                  <div className="flex items-center justify-end gap-3 md:justify-center">
                    <span
                      className={`w-3 h-3 rounded-full ${priorityColors[task.priority]}`}
                    />

                    <button
                      onClick={() => setEditingTask(task)}
                      className="text-blue-400 hover:text-blue-500 transition text-lg"
                      title="Edit task"
                    >
                      ✏️
                    </button>
                  </div>
                </div>

))}

                {
                    showEditModal && (
                        <EditTaskModal task={editTask} onClose={() => setShowEditModal(false)}/>
                    )
                }
            </div>


           

            
            {showModal && (
                <AddTaskModal
                
                    onClose={() => setShowModal(false)}
                  />

            )}

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Task Calendar</h2>
          <TaskCalender tasks={tasks} />
        </div>

        </div>
    );
}

export default HomePage
