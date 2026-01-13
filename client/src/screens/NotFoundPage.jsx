import { ArrowLeftCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-500 to-black">
            <div className="w-full max-w-md bg-black/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-white text-center">

              
                <h1 className="text-7xl font-extrabold text-sky-500 mb-4">404</h1>

             
                <h2 className="text-2xl font-semibold mb-2">
                    Page Not Found
                </h2>
                <p className="text-gray-300 mb-8">
                    The page you’re looking for doesn’t exist or was moved.
                </p>

           
                <button
                    onClick={() => navigate("/")}
                    className="
            w-full flex items-center justify-center gap-2
            bg-sky-500 hover:bg-sky-600
            text-black font-semibold py-2 rounded-lg
            transition-all duration-300
          "
                >
              
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;
