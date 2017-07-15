const cloudinary = require('cloudinary');
const multer = require('multer');
const btoa = require('btoa');

const ImagesController = {
    postCollection: [
        multer({ dest: '/tmp' }).fields([{name: 'image', maxCount: 1}]), // File upload middleware
        function(req, res, next) {
            // Save to cloudinary
            cloudinary.uploader.upload(req.files.image[0].path, function(result) {
                if(!result.error) {
                    // Update user record to refer to image
                    // Return user
                }
                else console.log(result);
            },
                {public_id: req.files.image[0].filename}
            );

            res.send("ok");
    } ],
};

module.exports = ImagesController;