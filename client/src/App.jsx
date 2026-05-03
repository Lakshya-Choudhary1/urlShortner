import React, { useEffect ,useRef} from 'react'
import {Route, Routes,Navigate} from "react-router-dom"
import Dashboard from './pages/Dashboard.jsx';
import Home from './pages/Home.jsx';
import useUserStore from './store/useUserStore.js';
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx"
import PageNotFound from './pages/PageNotFound.jsx';
import EmailVerification from './pages/EmailVerification.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';


const AuthenticatedRoute = ({user,children}) => {
  if(user && user.emailVerified) return children;
  if(!user) return <Navigate to={"/login"} replace />;
  if(user && !user.emailVerified) return <Navigate to={"/emailVerification"} />
};

const RedirectAuthenticatedRoute = ({user, children}) => {
  if(user && user.emailVerified) return <Navigate to={"/dashboard"} />
  if(user && !user.emailVerified) return <Navigate to={"/emailVerification"} />

  return children;
}


 
const App = () => {

  const {user,checkAuth} =  useUserStore();

  const hasChecked = useRef(false);
  useEffect(() => {
  if (hasChecked.current) return;
    hasChecked.current = true;
    checkAuth();
  }, []);

  return (<>
    <Routes>
      <Route path="/dashboard" element={
        <AuthenticatedRoute user={user}>
          <Dashboard />
        </AuthenticatedRoute>
      } />
      <Route path="/" element={
          <Home />
      } />
      <Route path="/login" element={
        <RedirectAuthenticatedRoute user={user}>
          <Login />
        </RedirectAuthenticatedRoute>
      } />
      <Route path='/signup' element={
        <RedirectAuthenticatedRoute user={user}>
          <Signup />
        </RedirectAuthenticatedRoute>
      } />
      <Route path='/emailVerification' element={
        <AuthenticatedRoute user={user}>
          <EmailVerification/>
        </AuthenticatedRoute>
        } />
      <Route path='/forgotPassword' element={<ForgotPassword/>} />
      <Route path='/resetPassword/:resetPasswordToken' element={<ResetPassword/>} />
      <Route path='*' element={<PageNotFound />} />

    </Routes>
  </>
  )
}

export default App
