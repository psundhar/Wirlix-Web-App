import { GET_IMG_REQUEST, GET_IMG_SUCCESS, GET_IMG_FAILURE,
  IMG_UPLOAD_REQUEST, IMG_UPLOAD_SUCCESS, IMG_UPLOAD_FAILURE } from '../types/ImageUploadTypes'


const INITIAL_STATE = {
  errorMessage: '',
  isRequesting: false,
  currentImgUrl: '/images/profile-pic-placeholder.png',
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_IMG_REQUEST:
      return { ...state, isRequesting: true };
    case GET_IMG_SUCCESS:
      return { ...state, currentImgUrl: action.profileImage, isRequesting: false };
    case GET_IMG_FAILURE:
      return { ...state, isRequesting: false };
    case IMG_UPLOAD_REQUEST:
      return { ...state, isRequesting: true };
    case IMG_UPLOAD_SUCCESS:
      return { ...state, currentImgUrl: action.profileImage, isRequesting: false };
    case IMG_UPLOAD_FAILURE:
      return { ...state, errorMessage: 'There was an issue uploading your profile image. Please try again later.',
        isRequesting: false };
    default:
      return state;
  }
};