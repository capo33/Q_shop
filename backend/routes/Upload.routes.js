import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Set Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // we describe how we want the filename to be formatted
  filename: (req, file, cb) => {
    //extname = extension name of the file (e.g. .jpg, .png, .pdf)
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check File Type
const checkFileType = (file, cb) => {
  // Allowed extensions
  const filetypes = /jpg|jpeg|png|pdf/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    // cb = callback
    cb("Error: Images Only!");
  }
};

// Init Upload
const upload = multer({
  storage,
});

// @route POST /upload
// @desc Uploads file to DB
router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image Uploaded Successfully",
    image: `/${req.file.path}`,
  });
});


export default router;