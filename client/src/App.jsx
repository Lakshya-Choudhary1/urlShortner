import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

import useUserStore from "./store/useUserStore.js";

// 🔐 Guards
const AuthenticatedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  if (!user.emailVerified) return <Navigate to="/emailVerification" replace />;
  return children;
};

const RedirectAuthenticatedRoute = ({ user, children }) => {
  if (user?.emailVerified) return <Navigate to="/dashboard" replace />;
  if (user && !user.emailVerified)
    return <Navigate to="/emailVerification" replace />;
  return children;
};

const UnverifiedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  if (user.emailVerified) return <Navigate to="/dashboard" replace />;
  return children;
};

const App = () => {
  const { user, checkAuth, isChecking } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 🚀 Prevent flicker
  if (isChecking) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/dashboard"
        element={
          <AuthenticatedRoute user={user}>
            <Dashboard />
          </AuthenticatedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <RedirectAuthenticatedRoute user={user}>
            <Login />
          </RedirectAuthenticatedRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <RedirectAuthenticatedRoute user={user}>
            <Signup />
          </RedirectAuthenticatedRoute>
        }
      />

      <Route
        path="/emailVerification"
        element={
          <UnverifiedRoute user={user}>
            <EmailVerification />
          </UnverifiedRoute>
        }
      />

      <Route path="/forgotPassword" element={<ForgotPassword />} />

      <Route
        path="/resetPassword/:resetPasswordToken"
        element={<ResetPassword />}
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;