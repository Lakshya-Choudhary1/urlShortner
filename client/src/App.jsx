import React, { use } from 'react'
import {Route, Routes,Navigate} from "react-router-dom"
import Dashboard from './pages/Dashboard.jsx';
import Home from './pages/Home.jsx';
import useUserStore from './store/useUserStore.js';
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx"
import PageNotFound from './pages/PageNotFound.jsx';


const AuthenticatedRoute = ({user,children}) => {
  if (!user)return <Navigate to="/login" replace/>;
  return children;
};

const RedirectAuthenticatedRoute = ({user, children}) => {
  if (user)  return <Navigate to="/dashboard" replace/>;
  return children;
}


 
const App = () => {

  const {user} =  useUserStore();

  

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
      

    </Routes>
  </>
  )
}

export default App
