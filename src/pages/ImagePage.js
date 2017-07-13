import React from 'react';

const ImagePage = React.createClass({

    getInitialState() {
        return {

        };
    },

    componentDidMount() {
        if(initialState) {
            this.setState(initialState);
        }
    },

    render() {

        return (<div>
            <link rel = "stylesheet" type= "text/css" href="/stylesheets/styles.css" />
            <div className="upload-container">
                <div className="container">
                    <h1>Upload a photo</h1>
                    <div className="img-container">
                        <img src="/images/profile-pic-placeholder.png" id = "profile-img" alt="your profile img" data-top="0"  data-left="0" />
                            <div className="upload-group col-md-12">
                                <input type="file" name="profile-picture" id="file" className="inputfile" data-multiple-caption="{count} files selected"/>
                                <label htmlFor="file"><i className="fa fa-upload" aria-hidden="true"/> <span id = "filename">Upload Image</span></label>
                            </div>
                    </div>
                    <div className="change">
                        <input type="file" name="profile-picture" className="inputfile" data-multiple-caption="{count} files selected"/>
                        <label htmlFor="file"><i className="fa fa-upload" aria-hidden="true"/> <span>Change Image</span></label>
                    </div>
                    <div className="col-md-4 col-md-offset-4 continue">
                        <a href="tutorial.html">Continue <i className="fa fa-arrow-right" aria-hidden="true"/></a>
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
                        <a href="tutorial.html" className="col-md-6 cont">Continue</a>
                    </div>
                </div>
            </div>
            <script type="text/javascript" src="js/fileinput.js"></script>
        </div>)
    },
});

export default ImagePage;
