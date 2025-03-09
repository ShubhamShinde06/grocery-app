import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Search from "./pages/Search.jsx";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordSet from "./pages/PasswordSet";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import Product from "./pages/Product";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./Store/authStore";
import { useEffect } from "react";
import CategoryUpdate from "./pages/CategoryUpdate";
import SubcategoryUpdate from "./pages/SubcategoryUpdate";
import ProductUpdate from "./pages/ProductUpdate";
import Orders from "./pages/Orders";

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
  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [user && checkAuth]);

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

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

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
          path="/category-update/:id"
          element={
            <ProtectedRoute>
              <CategoryUpdate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sub-category-update/:id"
          element={
            <ProtectedRoute>
              <SubcategoryUpdate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product-update/:id"
          element={
            <ProtectedRoute>
              <ProductUpdate />
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

        <Route path="/verify-email" element={<EmailVerification />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
