const cloudinary = require("cloudinary").v2;
const Product_Modal = require("../models/product_Model");
const { cloudinaryImageUpload } = require("../utils/cloudinary");

const AddProduct = async (req, res) => {
  try {
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newPath = await cloudinaryImageUpload(path);
      urls.push(newPath.res);
    }

    let {
      title,
      description,
      quantity,
      price,
      dexterity,
      club_number,
      shaft_brand,
      shaft_model,
      sst_pure_service,
      playing_length_6i,
      lie_6i,
      loft_6i,
      grip_brand,
      grip_model,
      extra_wrap,
      grip_logo,
    } = req.body;

    const product = new Product_Modal({
      title,
      description,
      quantity,
      price,
      dexterity,
      club_number,
      shaft_brand,
      shaft_model,
      sst_pure_service,
      playing_length_6i,
      lie_6i,
      loft_6i,
      grip_brand,
      grip_model,
      extra_wrap,
      grip_logo,
      images: urls.map((image) => {
        return { public_id: image.public_id, url: image.url };
      }),
    });

    await product.save();
    res.status(200).json({ message: "Product saved successfully!" });
  } catch (err) {
    res.status(400).json(err);
  }
};

const AllProducts = async (req, res) => {
  try {
    const allProducts = await Product_Modal.find();
    res.status(200).json({ allProducts });
  } catch (err) {
    res.status(500).json({ message: "Server error at getting all products!" });
  }
};

const DeleteProductById = async (req, res) => {
  try {
    const product = await Product_Modal.findById(req.params.id);

    for (const image of product.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await Product_Modal.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error at delete product!" });
  }
};

module.exports = { AddProduct, AllProducts, DeleteProductById };
