import { create } from "zustand";
import api from "../config/axios"
import toast from "react-hot-toast"

export const useTaskStore = create((set, get) => ({
    tasks: [],
    isLoading: false,

    createTask: async (taskData) => {
        try {
            set({ isLoading: true });

            const res = await api.post("/task/create" , taskData);

            set((state) => ({
                tasks: [...state.tasks, res.data.task],
                isLoading: false,
            }));
            toast.success("Task created successfully");
        } catch (error) {
            set({  isLoading: false });
            toast.error("Task creation failed");
        }
    },

    getTasks: async () => {
        try {
            set({ isLoading: true});

            const res = await api.get(`/task/get`);
            set({tasks: res.data.tasks, isLoading: false});
            

          
        } catch (error) {
            set({ tasks: null, isLoading: false });
        }
    },


    updateTask: async (id, updatedData) => {
        try {
            set({ isLoading: true});

            const res = await api.patch(`task/update/${id}`, updatedData);


            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task._id === id ? res.data.task : task
                ),
                isLoading: false,
            }));

        } catch (error) {
            set({ error: error.message, isLoading: false });
            toast.error("Task updation failed");
        }
    },

    deleteTask: async (id) => {
        try {
            set({ isLoading: true});

            const res = await api.delete(`task/delete/${id}`);
            
            set((state) => ({
                tasks: state.tasks.filter((task) => task._id !== id),
                isLoading: false,
            }));
            toast.success("Task done successful");
        } catch (error) {
            set({isLoading: false });
            toast.error("Task complete failed")
        }
    },
}));
