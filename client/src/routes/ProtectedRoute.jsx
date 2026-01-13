import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

const ProtectedRoute = ({ children }) => {
    const { user} = useUserStore();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
