import axios from 'axios'

import { GET_IMG_REQUEST, GET_IMG_SUCCESS, GET_IMG_FAILURE,
  IMG_UPLOAD_REQUEST, IMG_UPLOAD_SUCCESS, IMG_UPLOAD_FAILURE } from '../types/ImageUploadTypes'

export const getUserProfile = (userId) => {
  return dispatch => {
    dispatch({ type: GET_IMG_REQUEST })
    return axios.get('/api/users/' + userId)
      .then(res => {
        dispatch({ type: GET_IMG_SUCCESS, currentImgUrl: 'Successful Image!' })
      })
      .catch(err => {
          dispatch({ type: GET_IMG_FAILURE })
      })
  }
}

export const uploadProfileImage = (userId, imgFormData) => {
  const uploadProfileConfig = {
    url: '/api/images/' + userId,
  }

  return dispatch => {
    dispatch({ type: IMG_UPLOAD_REQUEST })
    return axios.post(uploadProfileConfig.url, imgFormData)
      .then(res => {
        dispatch({ type: IMG_UPLOAD_SUCCESS, profileImage: res.data.data.image })
      })
      .catch(err => {
        dispatch({ type: IMG_UPLOAD_FAILURE, errorMessage: 'Could not upload the specified image. Please try again with a different image.' })
      })
  }
}