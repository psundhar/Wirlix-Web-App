import React from 'react';
import Dropzone from 'react-dropzone';
import ImageDialog from '../components/ImageDialog';
import Draggable from 'react-draggable';




const ImagePage = React.createClass({

    getInitialState() {
        return {
            imageFile: {},
            user: {},
            isNewUser:{},
            isUploading: false,
            edits: {
                top: 0,
                left: 0,
            }
        };
    },

    handleReposition() {
        const that = this;
        var img = $('img#profile-img');

        var y1 = $('.img-container').height();
        var x1 = $('.img-container').width();

        $('.continue a').hover(function(event){
            var t = img.position().top,
                l = img.position().left;
            img.attr('data-top', t);
            img.attr('data-left', l);
        });

        var y2 = img.prop('naturalHeight');
        var x2 = img.prop('naturalWidth');

        img.draggable({
            disabled: false,
            scroll: false,
            axis: 'y, x',
            cursor : 'move',
            drag: function(event, ui) {

                if(ui.position.top >= 0) {
                    ui.position.top = 0;
                }
                if(ui.position.top < y1 - y2) {
                    ui.position.top = y1 - y2;
                }
                if (ui.position.left >= 0) {
                    ui.position.left = 0;
                }
                if(ui.position.left <= x1 - x2) {
                    ui.position.left = x1 - x2;
                }
            },
            stop(e, ui) {
                that.setState({edits: {top: ui.position.top, left: ui.position.left}});
            },
        });
    },

    componentDidMount() {
        if(initialState) {
            this.setState(initialState);
        }
    },

    onImageDrop(f) {
        console.log("test....." );
        const { imageFile, user, isNewUser } = this.state;
        user.image=f[0];
        console.log(user);
        this.setState({
            imageFile: f[0],

        });
    },

    handleUploadClick() {
        this.setState({isUploading: true});

        const { imageFile, user, isNewUser } = this.state;
        if(imageFile.preview) {
            // Initiate upload
            const data = new FormData();
            data.append('image', imageFile);

            const queries = [];

            if(this.state.edits.left) {
                queries.push({key: 'left', value: -this.state.edits.left})
            }
            if(this.state.edits.top) {
                queries.push({key: 'top', value: -this.state.edits.top});
            }

            const queryStrings = queries.map(q => {
                return q.key + '=' + q.value;
            });

            const queryString = queryStrings.join('&');

            let uri = '/api/images/' + user._id;

            if(queries.length > 0) {
                uri = uri + '?' + queryString;
            }

            fetch(uri, {
                method: 'POST',
                body: data,
                credentials: 'include',
            })
                .then(res => res.json())
                .then(user => {
                    this.setState({user, isUploading: false});
                })
                .then(newUser => {
                    this.setState({newUser, isUploading: false});
                })
                .catch(err =>  {
                    console.log(err);
                    this.setState({ isUploading: false });
                });
        }
        isNewUser ?  window.location = "/tutorial" : window.location =('/home');
    },

    handleContinueClick() {
        const { isNewUser } = this.state;
        isNewUser ?  window.location = "/tutorial" : window.location =('/home');
    },

    handleCancel() {

    },


    render() {
        const { user, imageFile, isUploading } = this.state;

        const previewImage = imageFile.preview || user.image || "/images/profile-pic-placeholder.png";

        return (
            <div>
            <link rel = "stylesheet" type= "text/css" href="/stylesheets/styles.css" />
            <div className="upload-container">
                <div className="container">
                    <h1>Upload a photo</h1>
                    <div className="img-container">
                        <img onLoad={ () => imageFile.preview ? this.handleReposition() : null } src={ previewImage } id = "profile-img" alt="your profile img" data-top="0"  data-left="0" />
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
                    <div className="col col-12">
                        <div className="continue">
                            {user.image? <button onClick={ this.handleUploadClick } disabled={ isUploading }>Save & Continue{ isUploading && (<img style={{maxHeight:"1em"}} src="/images/white-gear.gif" className="ml2 mr0 mt0 mb0" />)}</button> :
                                <button  data-toggle="modal"  data-target="#image-conf" aria-hidden="true"  onClick={ () => this.handleUploadClick } disabled={ isUploading }>Save & Continue{ isUploading && (<img style={{maxHeight:"1em"}} src="/images/white-gear.gif" className="ml2 mr0 mt0 mb0" />)}</button>}
                        </div>
                    </div>
                    <div className="col-md-4 continue">

                    </div>
                </div>
            </div>
            <ImageDialog showModal="user.image" handleConfirm={this.handleContinueClick} />
        </div>)
    },
});

export default ImagePage;