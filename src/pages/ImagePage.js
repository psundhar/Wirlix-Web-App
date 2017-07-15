import React from 'react';
import Dropzone from 'react-dropzone';

const ImagePage = React.createClass({

    getInitialState() {
        return {
            imageFile: {},
            user: {},
            isUploading: false,
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

    handleUploadClick() {
        this.setState({isUploading: true});

        const { imageFile, user } = this.state;

        if(imageFile.preview) {
            // Initiate upload
            const data = new FormData();
            data.append('image', imageFile);

            fetch('/api/images/' + user._id, {
                method: 'POST',
                body: data,
                credentials: 'include',
            })
            .then(res => res.json())
            .then(user => {
                this.setState({user, isUploading: false});
            })
            .catch(err =>  {
                console.log(err);
                this.setState({ isUploading: false });
            });
        }
    },

    handleContinueClick() {
        window.location = "/profile/" + this.state.user._id;
    },

    render() {
        const { user, imageFile, isUploading } = this.state;

        const previewImage = imageFile.preview || user.image || "/images/profile-pic-placeholder.png";
        console.log(imageFile, user.image);

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
                                <label htmlFor="file"><i className="fa fa-upload" aria-hidden="true"/> <span id = "filename">Profile Photo</span></label>
                                </Dropzone>
                            </div>
                    </div>
                    <div className="change">
                        <input type="file" name="profile-picture" className="inputfile" data-multiple-caption="{count} files selected"/>
                        <label htmlFor="file"><i className="fa fa-upload" aria-hidden="true"/> <span>Change Image</span></label>
                    </div>
                    <div className="col-md-4 col-md-offset-4">
                        <div className="continue">
                            <button onClick={ this.handleUploadClick } disabled={ isUploading }>Save Photo</button>
                        </div>
                        <div className="continue">
                            <button onClick={ this.handleContinueClick }>To Profile <i className="fa fa-arrow-right" aria-hidden="true"/></button>
                        </div>
                    </div>
                    <div className="col-md-4 continue">

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
