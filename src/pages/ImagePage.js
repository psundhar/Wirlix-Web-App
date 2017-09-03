import React from 'react';
import Dropzone from 'react-dropzone';
import ImageDialog from '../components/ImageDialog';
import { connect } from 'react-redux';
import * as actions from '../actionCreators/ImageUploadActions'

const ImagePage = React.createClass({

  getInitialState() {
    return {
      imageFile: {},
      user: {},
      isUploading: false,
      edits: {
        top: 0,
        left: 0,
        height: 0,
        width: 0
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
      console.log("t" +t);
    });
    console.log(" test....before..."+img[0].height);

    if(img[0].height > img[0].width){
      var x2 = x1;
      img[0].width = x2;
      var y2 = img[0].height;
      img[0].height = y2;

    };
    if(img[0].width > img[0].height){
      var y2 = y1;
      img[0].height = y2;
      var x2 = img[0].width;
      img[0].width = x2;
      console.log(y2);

    };

    img.draggable({
      disabled: false,
      scroll: false,
      axis: 'y, x',
      cursor : 'move',
      drag: function(event, ui) {
        console.log(ui.helper[0]);
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
        console.log("hello    "+ x2 + y2);

        that.setState({edits: {top: ui.position.top, left: ui.position.left, width: x2, height: y2}});
      },
    });

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
    const {user, isNewUser}=this.props;
    const { imageFile } = this.state;
    if(imageFile.preview) {
      // Initiate upload
      const data = new FormData();
      data.append('image', imageFile);

      this.props.uploadProfileImage(user._id, data)

    }

    setTimeout(() => { isNewUser ? window.location = '/profile' : window.location = '/home' }, 5000);
  },

  handleContinueClick() {
    const { isNewUser } = this.props;
    isNewUser ? window.location = '/profile' : window.location = '/home';
  },

  handleCancel() {

  },

  render() {
    const {isUploading,imageFile}=this.state;
    const { user } = this.props;

    const previewImage = imageFile.preview || user.image || "/images/profile-pic-placeholder.png";

    return (
      <div>
          <link rel = "stylesheet" type= "text/css" href="/stylesheets/styles.css" />
          <div className="upload-container">
              <div className="container">
                  <h1>Upload a photo</h1>
                  <div className="img-container">
                      <img onLoad={ () => imageFile.preview ? this.handleReposition() : null } src={ previewImage } style={{width: 400}} id = "profile-img" alt="your profile img" data-top="0"  data-left="0" />
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
                        {(user.image || imageFile.preview) ? <button onClick={ this.handleUploadClick } disabled={ isUploading }>Save & Continue{ isUploading && (<img style={{maxHeight:"1em"}} src="/images/white-gear.gif" className="ml2 mr0 mt0 mb0" />)}</button> :
                          <button data-toggle="modal" data-target="#image-conf" aria-hidden="true"  onClick={ () => this.handleUploadClick } disabled={ isUploading }>Save & Continue{ isUploading && (<img style={{maxHeight:"1em"}} src="/images/white-gear.gif" className="ml2 mr0 mt0 mb0" />)}</button>}
                          <p><br/>Please upload image with 400 x 400px for best results.</p>
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

const mapStateToProps = state => {
  const user = state.users.find(u => u._id == state.authUserId)

  const {
    errorMessage,
    isRequesting,
    currentImgUrl,
  } = state.imageUpload
  return {
    errorMessage,
    isRequesting,
    isNewUser:state.isNewUser,
    currentImgUrl,
    user
  }
}
export default connect(mapStateToProps, { ...actions })(ImagePage)
