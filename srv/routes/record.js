const router = require("express").Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
let Img = require("../models/img.modal");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

router.route("/").post(upload.single("myFile"), (req, res) => {
  if (req.file) {
    const photo = req.file.filename;
    const file = req.file;
    console.log(req.file);

    const newImgData = {
      photo,
    };

    const newImg = new Img(newImgData);

    newImg
      .save()
      .then(() =>
        res.send({
          status: true,
          message: "file uploaded",
          file,
        })
      )
      .catch((err) => res.status(400).send("Eror: " + err));
    console.log(file);
  } else {
    console.log("no file selected");
  }
});

module.exports = router;
