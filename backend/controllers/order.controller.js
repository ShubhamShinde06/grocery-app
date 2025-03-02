import { orderModel } from "../models/order.model.js";
import { cartmodel } from "../models/cart.model.js";
import Stripe from 'stripe'

//getway stripe initialize
const stripe = new Stripe("sk_test_51QGdpTCvK0uWWnjPx4eWsK1GJf2RPFFVHwvQSkkYKKS3ueWuGxEAeqmPqRQV6qxDV0esEmo1MZpA13f4c8pLJMzp003L491CBY")

//global varibales
const currency = 'inr'
const deliveryCharge = 25

//COD
export const placeOrder = async (req, res) => {
  try {
    const { userId, shopId, items, amount, address, size, quantity } = req.body;

    const orderData = {
      userId,
      shopId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      size, 
      quantity,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // **Clear the cart for the user after placing the order**
    await cartmodel.deleteMany({ userId });

    res.json({
      success: true,
      message: "Order Placed Successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error in placeOrder:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error, placeOrder" });
  }
};

//Stripe
export const placeOrderStripe = async (req, res) => {
  try {

    const {userId, shopId, items, amount, address, size, quantity } = req.body;
    const { origin } = req.headers

    const orderData = {
      userId,
      shopId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      size: size || "default-size",
      quantity: quantity || 1,  
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    const line_items = (items || []).map((item, index) => ({
      price_data: {
          currency: "inr", // Ensure currency is defined
          product_data: { name: item?.name || "Unknown Item" },
          unit_amount: item?.price ? item.price * 100 : 0
      },
      quantity: parseInt(quantity?.[index] || 1, 10) // Ensure quantity is always an integer
  }));
  
  

    line_items.push({
        price_data:{
            currency: currency,
            product_data: {
                name:'Delivery Charges'
            },
            unit_amount: deliveryCharge * 100
        },
        quantity: 1
    })

    const session = await stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url : `${origin}/verify?success=true&orderId=${newOrder._id}`,
        line_items,
        mode: 'payment',
    })

    res.json({
        success: true,
        session_url: session.url
    })

  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error, placeOrderStripe" });
  }
};

//verify stripe
export const verifyStripe = async (req,res) => {
    
  const {orderId, success, userId} = req.body

  try {
      
      if(success === "true"){
          await orderModel.findByIdAndUpdate(orderId, {payment: true})
          await cartmodel.deleteMany({ userId });

          res.json({
              success:true
          })
      } 
      else {
          await orderModel.findByIdAndUpdate(orderId)
          res.json({
              success: false
          })
      }

  } catch (error) {
      console.log(error)
      return res.status(500).json({
          success:false,
          message:"Error in verifyStripe"
      })
  }
  
}

//Order Show Shopkeepers
export const ShopkeeperOrders = async (req, res) => {
  try {

    const {shopId} = req.params

    if(!shopId){
      return res.json({
        success: false,
        error: true,
        message: "ShopId not found!"
      })
    }

    const shopkeeper = await orderModel.find({ shopId: { $in: [shopId] } }).sort({ createdAt: -1 });
    const totalOrders = await orderModel.countDocuments({ shopId: { $in: [shopId] } })

    return res.json({
      message: "shopkeeper Order list",
      data: shopkeeper,
      total: totalOrders,
      success: true,
      error: false,
    });

  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error, ShopkeeperOrders" });
  }
};

//Users Orders
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        message: "Provide userId",
        error: true,
        success: false,
      });
    }

    const orders = await orderModel.find({userId}).sort({ createdAt: -1 });

    return res.json({
      message: "Order list",
      data: orders,
      success: true,
      error: false,
    });
    
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error, UserOrders" });
  }
};

//status change from shopkeeper panel
export const updateOrdersStatuS = async (req, res) => {

  try {
      
      const {orderId, status} = req.body

      await orderModel.findByIdAndUpdate(orderId, {status})

      res.json({
          success: true,
          message: "Status Updated"
      })

  } catch (error) {
      console.log(error)
      return res.status(500).json({
          success:false,
          message:"Error in updateStatus"
      })
  }

}