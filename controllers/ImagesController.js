const cloudinary = require('cloudinary');
const multer = require('multer');
const btoa = require('btoa');
const User = require('../models/users');

const ImagesController = {
    postCollection: [
        multer({ dest: '/tmp' }).fields([{name: 'image', maxCount: 1}]), // File upload middleware
        function(req, res, next) {
            // Save to cloudinary
            cloudinary.uploader.upload(req.files.image[0].path, function(result) {
                if(!result.error) {
                    User.findById(req.user._id).exec() // Update user record to refer to image
                    .then(function(user) {
                        user.image = result.secure_url;
                        user.save(function(err, savedUser) {
                            if(err) {
                                throw err;
                            }

                            req.login(savedUser, function(err) {
                                if(err) {
                                    return next(err);
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
                else console.log(result);
            },
                { public_id: Date.now() + req.files.image[0].filename }
            );
    } ],
};

module.exports = ImagesController;