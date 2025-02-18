import React from "react";
import { Link } from "react-router-dom";
import CartTotal from "../components/CartTotal";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Cart = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col lg:gap-0 gap-20 py-10">
        {/* header */}
        <div>
          <Header />
        </div>
        <div className=" border-t pt-14 lg:px-10 px-5 ">
          <div className=" text-2xl mb-3">
            {/* Title */}
            <div className=" inline-flex gap-2 items-center mb-3">
              <p className="text-gray-500">
                {"YOUR"}{" "}
                <span className="text-gray-700 font-medium">{"CART"}</span>
              </p>
              <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
            </div>
          </div>

          {/* <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id)

            return(
              <div key={index} className=' py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_o.5fr] sm:grid-cols-[4fr_2fr_0.5fr] item-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img 
                    src={productData.image[0]} 
                    className='w-16 sm:w-20'
                    alt="prodcuimg" 
                  />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input 
                  type="number"
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 h-[30px] my-auto' 
                  defaultValue={item.quantity} 
                  min={1}
                  onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null :  updateQuantity(item._id,item.size,Number(e.target.value))}
                />
                <img 
                  src={assets.bin_icon} 
                  alt="delete"
                  className='w-4 mr-4 cursor-pointer my-auto'
                  onClick={()=>updateQuantity(item._id, item.size,0)}
                />
              </div>
            )
            
          })
        }
      </div> */}

          <div className="flex justify-end  my-20 w-[99%]">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <Link to="/placeorder">
                  <button className="bg-[#baf8ca] text-[#71f349] text-sm my-8 px-8 py-3">
                    PROCEED TO ORDER
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Footer/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
