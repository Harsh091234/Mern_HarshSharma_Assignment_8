import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";


const PublicRoute = ({ children }) => {
    const { user} = useUserStore();
    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;
