import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {loading, signup} = useUserStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await signup(formData);
    if(res === true) return navigate('/');
   
  };

  return (
    <div className="min-h-screen px-2 flex items-center justify-center bg-gradient-to-br from-sky-500 to-black">
      <div className="w-full max-w-md bg-black/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-white">

 
        <h2 className="text-3xl font-bold text-center mb-2">
          Register Account 
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Join us and manage your tasks smarter
        </p>


        <form onSubmit={handleSubmit} className="space-y-5">

    
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg bg-black border border-gray-600 focus:outline-none focus:border-sky-500"
            />
          </div>

      
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-black border border-gray-600 focus:outline-none focus:border-sky-500"
            />
          </div>

     
          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg bg-black border border-gray-600 focus:outline-none focus:border-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-sky-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          
          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg bg-black border border-gray-600 focus:outline-none focus:border-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-sky-500"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

        
          <button
                                  type="submit"
                                  disabled={loading}
                                  className={`
              w-full flex items-center justify-center gap-2
              bg-sky-500 text-black font-semibold py-2 rounded-lg
              transition-all duration-300
              ${loading
                                          ? "opacity-60 cursor-not-allowed"
                                          : "hover:bg-sky-600"}
            `}
                              >
                                  {loading && <Loader2 className="animate-spin" size={18} />}
                                  {loading ? "Registering..." : "Register"}
                              </button>
        </form>

      
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to={"/login"} className="text-sky-500 hover:underline cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage
