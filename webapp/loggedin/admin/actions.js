import axios from 'axios'
import { applicationError } from '@webapp/loggedin/applicationError/actions'

export const versioningGetSuccess = 'versioning/get/success'
export const versioningDeleteSuccess = 'versioning/get/success'
export const versioningPostMissingData = 'versioning/post/missingdata'
export const versioningPostVersionInvalid = 'versioning/post/versioninvalid'
export const versioningPostSuccess = 'versioning/post/success'
export const versioningUpdateForm = 'versioning/update/form'

export const getVersions = () => dispatch => {
  axios.get(`/api/versioning/`).then(({ data }) => {
    dispatch({
      type: versioningGetSuccess,
      versions: data
    })
  }).catch(err => dispatch(applicationError(err)))
}

export const createVersion = (e) => (dispatch, getState) => {
  // Prevent <form> element doing page refresh on submit
  e.preventDefault();
  const state = getState();
  const { newVersionForm } = state.admin
  // Required fields for new version: version number and timestamp
  const validForm = newVersionForm && newVersionForm.version && newVersionForm.timestamp

  // Form missing data?
  if (!validForm) {
    dispatch({
      type: versioningPostMissingData
    })
    return
  }

  // Versioning in correct format
  // Major.Minor.Patch
  // <num>.<num>.<num> ex. 1.0.0
  const versionValid = /\d+\.\d+\.\d+/.test(newVersionForm.version)
  if (!versionValid) {
    dispatch({
      type: versioningPostMissingData
    })
    return
  }

  axios.post(`/api/versioning/`, newVersionForm).then(res => {
    console.log(res)
    return dispatch({
      type: versioningPostSuccess,
      versions: res.data
    })
  }).catch(err => dispatch(applicationError(err)))
}

export const deleteVersion = (id) => (dispatch, getState) => {
  console.log(id)
  axios.delete(`/api/versioning/${id}`).then(res => {
    console.log(res)
    return dispatch({
      type: versioningDeleteSuccess,
      versions: res.data
    })
  }).catch(err => dispatch(applicationError(err)))
}

export const onChangeNewVersionForm = (e) => dispatch => {
  dispatch({
    type: versioningUpdateForm,
    payload: { [e.target.name]: e.target.value }
  })
}
