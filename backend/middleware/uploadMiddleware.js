// backend/middleware/uploadMiddleware.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const sku = req.body.sku || `temp-${Date.now()}`;
        const ext = path.extname(file.originalname);
        const filename = `${sku}${ext}`;
        req.savedImageName = filename; // <-- Save for use in controller
        cb(null, filename);
    }
});

const upload = multer({ storage });

module.exports = upload;