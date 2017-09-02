import { IMG_UPLOAD_REQUEST, IMG_UPLOAD_SUCCESS, IMG_UPLOAD_FAILURE } from '../types/ImageUploadTypes'

const INITIAL_STATE = {
  isRequesting: false,
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case IMG_UPLOAD_REQUEST:
      return { ...state, isRequesting: true };
    case IMG_UPLOAD_SUCCESS:
      return { ...state, isRequesting: false };
    case IMG_UPLOAD_FAILURE:
      return { ...state, errorMessage: action.errorMessage, isRequesting: false };
    default:
      return state;
  }
};