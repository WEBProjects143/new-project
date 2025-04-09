// Task 2 model controller
const express = require('express');
const router = express.Router();
const multer = require('multer');// For file uploading
const path = require('path');
const { uploadImage, getImages } = require('../controllers/ImageController');

const storage = multer.diskStorage({
    destination: './images/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage, limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
});

router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getImages);

module.exports = router;