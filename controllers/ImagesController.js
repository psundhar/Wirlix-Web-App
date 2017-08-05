const cloudinary = require('cloudinary');
const multer = require('multer');
const btoa = require('btoa');
const User = require('../models/users');

const ImagesController = {
    postCollection: [
        multer({ dest: '/tmp' }).fields([{name: 'image', maxCount: 1}]), // File upload middleware
        function(req, res, next) {
            // Save to cloudinary
            let options = {
                public_id: Date.now() + req.files.image[0].filename,
            };

            let cropOptions;

            if(req.query.left || req.query.top) {
                const targetImageWidth = 400;
                const startX = 0 + parseInt(req.query.left);
                const startY = 0 + parseInt(req.query.top);

                cropOptions = {x: startX, y: startY, width: targetImageWidth, height: targetImageWidth, crop: "crop"};
            }


            if(cropOptions) {
                options['eager'] = [cropOptions];
            }

            cloudinary.v2.uploader.upload(req.files.image[0].path, options, function(error, result) {
                if(!error) {
                    User.findById(req.user._id).exec() // Update user record to refer to image
                    .then(function(user) {
                        if(cropOptions) {
                            user.image = result.eager[0].secure_url;
                        }
                        else {
                            user.image = result.secure_url;
                        }

                        user.save(function(err, savedUser) {
                            if(err) {
                                throw err;
                            }

                            req.login(savedUser, function(err) { // Save new image info to logged-in user
                                if(err) {
                                    throw err;
                                }
                                res.send(savedUser);
                            });
                        })
                    })
                    .catch(function(err) {
                        console.log(err);
                        res.status(422);
                        res.end();
                    });
                }
                else console.log(error + '   test');
            });
    } ],
};

module.exports = ImagesController;