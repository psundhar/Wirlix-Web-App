import React from 'react';
import Dropzone from 'react-dropzone';
import cloudinary from 'cloudinary-core';

const ImagePage = React.createClass({

    getInitialState() {
        return {
            imageFile: {},
            user: {},
        };
    },

    componentDidMount() {
        if(initialState) {
            this.setState(initialState);
        }
    },

    onImageDrop(f) {
        this.setState({
            imageFile: f[0],
        });
    },

    handleContinueClick() {
        const { imageFile, user } = this.state;

        if(!user.image && !imageFile.preview) {
            // Warn user not to continue
        }

        if(imageFile.preview) {
            // Initiate upload
            const cl = cloudinary.Cloudinary.new({ cloud_name: "wirlix" });

        }
    },

    render() {
        const { user, imageFile } = this.state;

        const previewImage = user.image || imageFile.preview || "/images/profile-pic-placeholder.png";

        console.log(previewImage, imageFile.preview);

        return (<div>
            <link rel = "stylesheet" type= "text/css" href="/stylesheets/styles.css" />
            <div className="upload-container">
                <div className="container">
                    <h1>Upload a photo</h1>
                    <div className="img-container">
                        <img src={ previewImage } id = "profile-img" alt="your profile img" data-top="0"  data-left="0" />
                            <div className="upload-group col-md-12">
                                <Dropzone style={{visibility: "none"}} onDrop={ this.onImageDrop }>
                                <div className="inputfile"/>
                                <label htmlFor="file"><i className="fa fa-upload" aria-hidden="true"/> <span id = "filename">Upload Image</span></label>
                                </Dropzone>
                            </div>
                    </div>
                    <div className="change">
                        <input type="file" name="profile-picture" className="inputfile" data-multiple-caption="{count} files selected"/>
                        <label htmlFor="file"><i className="fa fa-upload" aria-hidden="true"/> <span>Change Image</span></label>
                    </div>
                    <div className="col-md-4 col-md-offset-4 continue">
                        <button onClick={ this.handleContinueClick }>Continue <i className="fa fa-arrow-right" aria-hidden="true"/></button>
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-md-offset-4 modal-continue">
                <p>Are you sure you want to continue without a profile picture?</p>
                <div className="button-group">
                    <div className="col-md-6">
                        <a href="#" className="cancel">Cancel</a>
                    </div>
                    <div className="col-md-6">
                        <button onClick={ this.handleContinueClick }>Continue</button>
                    </div>
                </div>
            </div>
            <script type="text/javascript" src="js/fileinput.js"></script>
        </div>)
    },
});

export default ImagePage;
