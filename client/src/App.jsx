
import {Route, Routes} from "react-router-dom"
import HomePage from './screens/HomePage'
import CenterLoader from "./components/CenterLoader"
import SignupPage from './screens/SignupPage'
import LoginPage from "./screens/LoginPage"
import { useEffect } from "react"
import { useUserStore } from "./store/userStore"
import ProtectedRoute from "./routes/ProtectedRoute"
import PublicRoute from "./routes/PublicRoute"
import NotFoundPage from "./screens/NotFoundPage"


const App = () => {
  const {user, loading, checkAuth}  = useUserStore();
  useEffect(() => {
    checkAuth(); 
  }, []);

  useEffect(() => {
    console.log("auth user:", user);
  }, [user]);


  if(loading) return <CenterLoader />
  return (
    <div className='bg-gradient-to-br  from-sky-500 to-black min-h-screen'>
      <Routes>
        <Route path='/' element={<ProtectedRoute>
          <HomePage />
        </ProtectedRoute>} />
        <Route path='/register' element={<PublicRoute>
          <SignupPage />
          </PublicRoute>} />
        <Route path='/login' element={<PublicRoute>
          <LoginPage />
        </PublicRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
