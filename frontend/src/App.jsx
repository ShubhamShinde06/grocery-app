import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Search from "./pages/search";
import Iteam from "./pages/Iteam";
import Cart from "./pages/Cart";
import {ToastContainer} from 'react-toastify'

export const server = "http://localhost:8000"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product" element={<Iteam />}>
          <Route path=":productId" element={<Iteam />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
