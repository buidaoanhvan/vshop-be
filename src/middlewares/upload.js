const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img");
  },
  // doi ten truoc khi luu
  filename: (req, file, cb) => {
    let fileName = Date.now() + "_" + file.originalname;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

module.exports = { upload };
