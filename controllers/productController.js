import Product from "../models/Product.js";

// CREATE PRODUCT (with Cloudinary image upload)
export const createProduct = async (req, res) => {
  try {
    // Extract uploaded image URLs (if any)
    const images = req.files ? req.files.map(file => file.path) : [];

    const { title, description, price, category, stock } = req.body;

    const product = new Product({
      title,
      description,
      price,
      category,
      stock,
      images
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
