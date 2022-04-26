const router = require("express").Router();
const {
  AddProduct,
  AllProducts,
  DeleteProductById,
} = require("../controllers/product_Controller");
const upload = require("../middleware/multer");

router.post("/add", upload.array("imageFiles"), AddProduct);
router.get("/get", AllProducts);
router.delete("/delete/:id", DeleteProductById);

module.exports = router;
