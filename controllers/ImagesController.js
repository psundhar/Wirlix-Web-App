const cloudinary = require('cloudinary');
const multer = require('multer');

const ImagesController = {
    postCollection: [
        multer().fields([{name: 'image', maxCount: 1}]),
        function(req, res, next) {
        console.log(req.files);
        // Receive an image
        // Save to cloudinary
        // Update user record to refer to image
        // Return user
        cloudinary.config({
            cloud_name: 'wirlix',
            api_key: '874837483274837',
            api_secret: 'a676b67565c6767a6767d6767f676fe1'
        });

        // cloudinary.uploader.upload(req.files)

        res.send("ok");
    } ],
};

module.exports = ImagesController;