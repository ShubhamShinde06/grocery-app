import { userModel } from "../models/user.model.js";
import { shopkeeperModel } from "../models/shopkeeper.model.js";
import { ProductModel } from "../models/product.model.js";
import { cartmodel } from "../models/cart.model.js";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size, finalPrice, shopId } = req.body;

    // Validate user, shop, and product existence
    const userData = await userModel.findById(userId);
    if (!userData)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const shopkeeper = await shopkeeperModel.findById(shopId);
    if (!shopkeeper)
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });

    const product = await ProductModel.findById(itemId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // Check if the item already exists in the user's cart
    const existingCartItem = await cartmodel.findOne({
      userId,
      itemId,
      size,
      finalPrice,
      shopId,
    });

    if (existingCartItem) {
      // If the item exists, update the quantity
      existingCartItem.quantity += 1;
      await existingCartItem.save();
    } else {
      // If the item doesn't exist, create a new cart entry
      await cartmodel.create({
        userId,
        itemId,
        shopId,
        size,
        finalPrice,
        quantity: 1,
      });
    }

    return res.json({
      success: true,
      message: "Added to cart",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error in addToCart",
    });
  }
};

export const updateToCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    // Validate quantity
    if (quantity < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be at least 1" });
    }

    const cartItem = await cartmodel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      itemId,
      size,
    });

    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    // Update quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({
      success: true,
      message: "Cart updated successfully",
      cartItem, // Return updated item for frontend state updates
    });

    //console.log("Received request for:", { userId, itemId, size, quantity });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error in updateToCart",
    });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate user
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Fetch cart items for the user
    const cartItems = await cartmodel.find({ userId });

    if (!cartItems.length) {
      return res.json({
        success: true,
        cartData: [],
        totalCartCount: 0,
        message: "Cart is empty",
      });
    }

    // Count total cart products
    const totalCartCount = await cartmodel.countDocuments({
      itemId: { $in: cartItems.map((item) => item.itemId) },
    });

    // Fetch product and shop details for each cart item
    const cartData = await Promise.all(
      cartItems.map(async (item) => {
        const product = await ProductModel.findById(item.itemId);
        const shop = await shopkeeperModel.findById(item.shopId);

        return {
          _id: item._id, // Cart item ID
          userId: item.userId,
          shopId: item.shopId,
          shopName: shop?.name || "Unknown Shop",
          itemId: item.itemId,
          productName: product?.name || "Unknown Product",
          productImage: product?.image?.[0] || "/default-image.jpg",
          size: item.size,
          finalPrice: item.finalPrice,
          quantity: item.quantity,
        };
      })
    );

    return res.json({ success: true, cartData, totalCartCount });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error in getUserCart" });
  }
};

export const deleteFromCart = async (req, res) => {
  try {
    const { userId, itemId, size, finalPrice, shopId } = req.body;

    // Find and delete the cart item
    const deletedItem = await cartmodel.findOneAndDelete({
      userId,
      itemId,
      size,
      finalPrice,
      shopId,
    });

    if (!deletedItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    res.json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error in deleteFromCart",
    });
  }
};
