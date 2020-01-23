import axios from 'axios'
import { applicationError } from '@webapp/loggedin/applicationError/actions'

import FRAVersion from '@common/versioning/fraVersion'
import * as AdminState from '@webapp/loggedin/admin/adminState'

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
  const state = getState();
  const newVersionForm = AdminState.getNewVersionForm(state)

  // Required fields for new version: version number and publishedAt
  const validForm = FRAVersion.getVersionNumber(newVersionForm) && FRAVersion.getPublishedAt(newVersionForm)

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
  const versionValid = /\d+\.\d+\.\d+/.test(FRAVersion.getVersionNumber(newVersionForm))
  if (!versionValid) {
    dispatch({
      type: versioningPostMissingData
    })
    return
  }

  // use iso-String, for correct date/time in db
  newVersionForm.publishedAt = new Date(FRAVersion.getPublishedAt(newVersionForm)).toISOString()

  axios.post(`/api/versioning/`, newVersionForm).then(res => {
    return dispatch({
      type: versioningPostSuccess,
      versions: res.data
    })
  }).catch(err => dispatch(applicationError(err)))
}

export const deleteVersion = (id) => (dispatch, getState) => {
  if (!window.confirm('Are you sure?')) {
    return
  }
  console.log(id)
  axios.delete(`/api/versioning/${id}`).then(res => {
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
