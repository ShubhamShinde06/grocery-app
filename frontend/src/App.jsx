import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Search from "./pages/search";
import Iteam from "./pages/Iteam";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import { userAuthStore } from "./store/authStore";
import { useEffect } from "react";

export const server = "http://localhost:8000";

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = userAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = userAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

function App() {

  const { checkAuth, user } = userAuthStore();

  useEffect(() => {
    checkAuth();
  }, [user & checkAuth]);

  return (
    <>
      <Routes>
        {/* Default Route Redirects to Home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Public Routes */}
        <Route path="/home" element={<Home />} />

        <Route
          path="/auth"
          element={
            <RedirectAuthenticatedUser>
              <Auth />
            </RedirectAuthenticatedUser>
          }
        />

        <Route path="/search" element={<Search />} />
        <Route path="/product" element={<Iteam />}>
          <Route path=":productId" element={<Iteam />} />
        </Route>

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
  
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
