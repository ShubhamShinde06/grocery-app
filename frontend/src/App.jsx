import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Search from "./pages/Search.jsx";
import Iteam from "./pages/Iteam";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import { userAuthStore } from "./store/authStore";
import { useEffect } from "react";
import ShopOwnerProducts from "./pages/ShopOwnerProducts";
import Filtered from "./pages/Filtered";
import Seemore from "./pages/Seemore";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Verify from "./pages/Verify";

export const server = "https://grocery-app-es2e.onrender.com";

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = userAuthStore();

  if (isAuthenticated && user) {
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
        <Route path='/verify' element={<Verify/>} />

        <Route
          path="/auth"
          element={
            <RedirectAuthenticatedUser>
              <Auth />
            </RedirectAuthenticatedUser>
          }
        />

        <Route path="/search" element={<Search />} />

        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order" element={<Orders />} />

        <Route path="/product" element={<Iteam />}>
          <Route path=":id" element={<Iteam />} />
        </Route>
        <Route path="/shop" element={<ShopOwnerProducts />}>
          <Route path=":shopkeeperId" element={<ShopOwnerProducts />} />
        </Route>
        <Route path="/filtered" element={<Filtered />}>
          <Route path=":categoryId" element={<Filtered />} />
        </Route>
        <Route path="/category" element={<Seemore />}>
          <Route path=":id" element={<Seemore />} />
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
