import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Search from "./pages/search";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordSet from "./pages/PasswordSet";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import Product from "./pages/Product";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./Store/authStore";
import { useEffect } from "react";

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

function App() {
  const { user ,checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
 
  }, [checkAuth]);

  console.log(user)

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RedirectAuthenticatedUser>
              <Auth />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />

        <Route path="/verify-email" element={<EmailVerification />} />

        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <PasswordSet />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/category"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sub-category"
          element={
            <ProtectedRoute>
              <SubCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
