const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "sherry7",
  api_key: "759688945178373",
  api_secret: "5ioigajShdK2JnFhp0wQE96szJU",
});

const cloudinaryImageUpload = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(500).send("upload image error");
      resolve({
        res,
      });
    });
  });
};

module.exports = { cloudinaryImageUpload };
