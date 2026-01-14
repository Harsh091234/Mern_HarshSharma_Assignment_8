import { X } from "lucide-react";
import { useState } from "react";
import { useTaskStore } from "../../store/taskStore";

export const AddTaskModal = ({ onClose}) => {
    const { createTask,} = useTaskStore();
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        category: "",
        dueDate: "",
        priority: "Medium",

    });

    const onAdd = () => {
        createTask(newTask);
        onClose();
    }
    return (
        <div className="fixed px-2 inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-900 w-full max-w-lg rounded-xl p-6 shadow-lg text-white">
         
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add New Task</h2>
                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

           
                <div className="space-y-4">
                 
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={newTask.title}
                        onChange={(e) =>
                            setNewTask({ ...newTask, title: e.target.value })
                        }
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-sky-500"
                    />

                
                    <textarea
                        placeholder="Task Description"
                        value={newTask.description}
                        onChange={(e) =>
                            setNewTask({ ...newTask, description: e.target.value })
                        }
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-sky-500"
                    />

                
                    <input
                        type="text"
                        placeholder="Category (e.g. Study, Work)"
                        value={newTask.category}
                        onChange={(e) =>
                            setNewTask({ ...newTask, category: e.target.value })
                        }
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-sky-500"
                    />

             
                    <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) =>
                            setNewTask({ ...newTask, dueDate: e.target.value })
                        }
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-sky-500"
                    />

           
                    <select
                        value={newTask.priority}
                        onChange={(e) =>
                            setNewTask({ ...newTask, priority: e.target.value })
                        }
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-sky-500"
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                
                    <button
                        onClick={onAdd}
                        className="w-full bg-sky-600 hover:bg-sky-500 text-black py-2 rounded-lg font-semibold transition"
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
};
