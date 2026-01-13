import { Loader2 } from "lucide-react";

const CenterLoader = () => {
    return (
        <div className="fixed bg-gradient-to-br from-sky-500 to-black inset-0 flex items-center justify-center  z-50">
            <div className="flex flex-col items-center gap-3">
                <Loader2
                    className="animate-spin text-sky-500"
                    size={48}
                    strokeWidth={2.5}
                />
                <p className="text-gray-300 text-sm">Loading...</p>
            </div>
        </div>
    );
};

export default CenterLoader;
