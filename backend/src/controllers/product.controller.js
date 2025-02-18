import { ProductModel } from "../models/product.model.js";
import { shopkeeperModel } from "../models/shopkeeper.model.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

export const productAdd = async (req, res) => {
  try {
    const {
      name,
      category,
      subCategory,
      unit,
      stock,  
      price,
      description,
      shopkeeper,
      more_details,
      publish,
      quantity
    } = req.body;

    const shop = await shopkeeperModel.findById(shopkeeper);
    if (!shop) {
      return res.status(404).json("Shopkeeper not found!");
    } 

    if (
      !name ||
      !stock ||
      !category[0] ||
      !subCategory[0] ||
      !unit ||
      !price ||
      !description
    ) {
      return response.status(400).json({
        message: "Enter required fields",
        error: true,
        success: false,
      });
    }

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = new ProductModel({
      name,
      category,
      subCategory,
      shopkeeper,
      unit,
      stock: stock === 'true' ? 'true' : 'false',
      price,
      description,
      more_details,
      publish,
      quantity: JSON.parse(quantity),
      image: imagesUrl,
    });

    const product = new ProductModel(productData);
    await product.save();

    return res.json({
      message: "Product Created Successfully",
      data: product,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server down, productAdd",
      success: false,
    });
  }
};

export const productGet = async (req, res) => {
  try {
    const product = await ProductModel.find()
      .sort({ createdAt: -1 })
      .populate("category subCategory shopkeeper");

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "category not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server down, productGet",
      success: false,
    });
  }
};

export const productPut = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid product ID" });
    }

    // Fetch existing product
    const product = await ProductModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    // Extract new data from request body
    const updatedData = { ...req.body };

    // Extract uploaded images
    const images = ["image1", "image2", "image3", "image4"]
      .map((key) => req.files?.[key]?.[0])
      .filter(Boolean);

    if (images.length > 0) {
      // Delete previous images from Cloudinary
      if (Array.isArray(product.image)) {
        await Promise.all(
          product.image.map(async (imgUrl) => {
            const publicId = imgUrl.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(publicId);
          })
        );
      }

      // Upload new images to Cloudinary
      updatedData.image = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
    }

    // Update product with new data
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true, // Ensures validation rules apply
      }
    ).populate("category subCategory shopkeeper");

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const productSingleGet = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id).populate(
      "category subCategory shopkeeper"
    );

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "product not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server down, productSingleGet",
      success: false,
    });
  }
};

export const productDelete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Product not found! ",
        error: true,
        success: false,
      });
    }

    const deleteProduct = await ProductModel.findByIdAndDelete(id);

    return res.json({
      message: "Delete successfully",
      error: false,
      success: true,
      data: deleteProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server down, productSingleGet",
      success: false,
    });
  }
};

export const ownShopkeeperProducts = async (req, res) => {
  try {
    const { id } = req.params; // Extract shopkeeper ID

    // Validate if _id is provided and is a valid MongoDB ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing shopkeeper ID",
      });
    }

    // Fetch products where shopkeeper ID matches
    const products = await ProductModel.find({ shopkeeper: id }).populate('category subCategory')

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for this shopkeeper",
      });
    }

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching shopkeeper products:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

