import { useState } from "react";
import { useTaskStore } from "../../store/taskStore";

export const EditTaskModal = ({task, onClose}) => {
    const [formData, setFormData] = useState({ ...task });
    const {updateTask, isLoading} = useTaskStore();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {_id, ...updatedData} = formData;
     
        updateTask(_id, updatedData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-900 w-full max-w-lg rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
           
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        required
                    />

                 
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    />

                  
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                  
                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    />

                  
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category (e.g. Study, Work)"
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    />

                 
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
