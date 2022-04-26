const router = require("express").Router();
const {
  register,
  login,
  forgotPassword,
  changePassword,
} = require("../controllers/auth_Controller");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", changePassword);

module.exports = router;
