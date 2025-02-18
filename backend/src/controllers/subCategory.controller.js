import mongoose from "mongoose";
import { SubCategoryModel } from "../models/subCategory.models.js";
import cloudinary from "cloudinary";

export const subCategoryAdd = async (req, res) => {
  try {
    const { name, category } = req.body;
    const { file } = req;

    if (!name && !category[0]) {
      return response.status(400).json({
        message: "Provide name, category",
        success: false,
      });
    }
    if (!file) {
      return res.status(400).json({
        message: "Enter required image",
        success: false,
      });
    }
  

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "subCategories", // Optional: specify a folder in Cloudinary
    });

    // const payload = {
    //   name,
    //   image: result.secure_url,
    //   category,
    //   shopkeeper
    // };

    // const createSubCategory = new SubCategoryModel(payload);
    // const save = await createSubCategory.save();

    const newSubCategory = new SubCategoryModel({
      name,
      category,
      image: result.secure_url, // Store the URL of the uploaded image
    });

    const save = await newSubCategory.save();

    return res.json({
      message: "Sub Category Created",
      data: save,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server down, subCategoryAdd",
      success: false,
    });
  }
};

export const subCategoryGet = async (req, res) => {
  try {
    const data = await SubCategoryModel.find()
      .sort({ createdAt: -1 })
      .populate("category");
    return res.json({
      message: "Sub Category data",
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server down, subCategoryGet",
      success: false,
    });
  }
};

export const subCategoryPut = async (req, res) => {
  try {
    const { file } = req; // Image file (optional)
    const { name, category } = req.body;
    const { id } = req.params;

    const checkSubCategory = await SubCategoryModel.findById(id);

    if (!checkSubCategory) {
      return res.status(400).json({
        message: "Check your id",
        error: true,
        success: false,
      });
    }

    let updatedData = { name }; // Default update data

    // If a new image is uploaded, delete the old one & upload a new one
    if (file) {
      if (checkSubCategory.image) {
        // Use checkSubCategory instead of category
        const publicId = checkSubCategory.image
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0]; // Extract public ID
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "subCategories",
      });

      updatedData.image = result.secure_url; // Add new image URL to update data
    }

    // Update category with new name and (optional) image
    const updatedCategory = await SubCategoryModel.findByIdAndUpdate(
      id,
      { category, ...updatedData }, // Spread updatedData correctly
      { new: true }
    );

    return res.status(200).json({
      message: "Updated successfully",
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server down, subCategory",
      success: false,
    });
  }
};

export const subCategorySingleGet = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategoryModel.findById(id).populate(
      "category"
    );

    if (!subCategory) {
      return res.status(400).json({
        success: false,
        message: "Subcategory not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: subCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server down, subCategorySingleGet",
      success: false,
    });
  }
};

export const subCategoryDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteSubCategory = await SubCategoryModel.findByIdAndDelete(id);

    return res.json({
      message: "Delete Successfully",
      data: deleteSubCategory,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server down, subCategoryDelete",
      success: false,
    });
  }
};

export const ownShopkeeperSubCategory = async (req, res) => {
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
    const Subcategores = await SubCategoryModel.find({ shopkeeper: id }) 
    .sort({ createdAt: -1 })
    .populate("category");

    if (!Subcategores || Subcategores.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for this shopkeeper",
      });
    }

    return res.status(200).json({
      success: true,
      data: Subcategores,
    });
  } catch (error) {
    console.error("Error fetching ownShopkeeperSubCategory:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
