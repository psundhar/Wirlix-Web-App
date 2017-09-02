import { IMG_UPLOAD_REQUEST, IMG_UPLOAD_SUCCESS, IMG_UPLOAD_FAILURE,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE } from '../types/ImageUploadTypes'

export const uploadProfileImage = (userId, imgFormData) => {
  const uploadProfileConfig = {
    uri: '/api/images/' + userId,
  }

  return dispatch => {
    dispatch({ type: IMG_UPLOAD_REQUEST })
    return fetch(uploadProfileConfig.uri, {
      method: 'POST',
      body: imgFormData,
      credentials: 'include',
    })
      .then(res => {
        dispatch({type: IMG_UPLOAD_SUCCESS})
      })
      .catch(err => {
        dispatch({ type: IMG_UPLOAD_FAILURE, errorMessage: 'Could not upload the specified image. Please try again with a different image.' })
      })
  }
}
