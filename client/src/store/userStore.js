import toast from "react-hot-toast";
import { create } from "zustand";
import api from "../config/axios";

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,

    signup: async ({ name, email, password, confirmPassword }) => {
        set({ loading: true });
        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Passwords do not match");
        }

        try {
            const res = await api.post("/user/register", { name, email, password });

            set({ user: res.data.user, loading: false });
            toast.success("User registered successfully");
            return true;
        } catch (error) {
            set({ loading: false });
            toast.error(
                error.response.data.message || "Something went wrong. Please try again."
            );
        }
    },

    login: async ({ email, password }) => {
        set({ loading: true });

        try {
            const res = await api.post("/user/login", { email, password });
            set({ user: res.data.user, loading: false });
            toast.success("User authenticated successfully");
            return true;
        } catch (error) {
            set({ loading: false});
            toast.error(
                error.response.data.message || "Something went wrong. Please try again."
            );
        }
    },
    checkAuth: async () => {
        set({ loading: true });
        try {
            const res = await api.get("/user/profile");

            set({ user: res.data.user, loading: false });
        } catch (error) {
            set({ user: null, loading: false });
            console.error(
                "Auth check failed:",
                error.response?.data?.message || error.message
            );
        }
    },
    logout: async () => {
        try {
             await api.post("/user/logout");
            set({ user: null });
            toast.success("User logout successfully.");
            return true;
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error(error.response?.data?.message || "Failed to log out.");
        }
    },

}));