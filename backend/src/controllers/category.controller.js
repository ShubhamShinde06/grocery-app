import { categoryModel } from "../models/category.model.js";
import cloudinary from "cloudinary";
import {SubCategoryModel} from '../models/subCategory.models.js' 
import {ProductModel} from '../models/product.model.js'

export const categoryAdd = async (req, res) => {
  try {
    const { name } = req.body;
    const { file } = req;

    if (!name) {
      return res.status(400).json({
        message: "Enter required name",
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
      folder: "categories", // Optional: specify a folder in Cloudinary
    });

    // Create and save category
    const newCategory = new categoryModel({
      name,
      image: result.secure_url, // Store the URL of the uploaded image
    });

    const saveCategory = await newCategory.save();

    if (!saveCategory) {
      return res.status(500).json({
        message: "Category Not Created!",
        success: false,
      });
    }

    return res.json({
      message: "Category Added",
      data: saveCategory,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server down, categoryAdd",
      success: false,
    });
  }
};

export const categoryGet = async (req, res) => {
  try {
    const category = await categoryModel.find();

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "category not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server down, categoryGet",
      success: false,
    });
  }
};

export const categoryPut = async (req, res) => {
  try {
    const { file } = req; // Image file (optional)
    const { categoryId } = req.params; // Extract category ID
    const { name } = req.body; // Extract category name

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        message: "Category name is required",
        success: false,
      });
    }

    // Find existing category
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    let updatedData = { name }; // Default update data

    // If a new image is uploaded, delete the old one & upload a new one
    if (file) {
      if (category.image) {
        const publicId = category.image
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0]; // Extract public ID
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "categories",
      });

      updatedData.image = result.secure_url; // Add new image URL to update data
    }

    // Update category with new name and (optional) image
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      updatedData,
      { new: true }
    );

    return res.status(200).json({
      message: "Category updated successfully",
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const categorySingleGet = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await categoryModel.findById(categoryId);

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "category not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server down, categoryGet",
      success: false,
    });
  }
};

export const categoryDelete = async (req, res) => {
  try {
    
    const {_id} = req.body

    const checkSubCategory = await SubCategoryModel.find({
      category:{
        "$in":[_id]
      }
    })

    const checkProduct = await ProductModel.find({
      category:{
        "$in":[_id]
      }
    })

    if(checkSubCategory >  0 || checkProduct > 0 ){
      return response.status(400).json({
          message : "Category is already use can't delete",
          error : true,
          success : false
      })
    }

    const deleteCategory = await categoryModel.deleteOne({_id: _id})

    return res.json({
      message: "Category deleted",
      data : deleteCategory,
      success : true
    })

  } catch (error) {
     console.log(error);
     return res.status(500).json({
      message: "Server down, categoryDelete",
      success: false,
    });
  }
}