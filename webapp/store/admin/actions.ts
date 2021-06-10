import axios from 'axios'
import { applicationError } from '@webapp/components/error/actions'

import * as FRAVersion from '@common/versioning/fraVersion'
import * as AdminState from '@webapp/store/admin/state'
import { ApiEndPoint } from '@common/api/endpoint'

export const versioningGetSuccess = 'versioning/get/success'
export const versioningDeleteSuccess = 'versioning/get/success'
export const versioningPostMissingData = 'versioning/post/missingdata'
export const versioningPostSuccess = 'versioning/post/success'
export const versioningUpdateForm = 'versioning/update/form'

export const getVersions = () => (dispatch: any) => {
  axios
    .get(ApiEndPoint.Versioning.getAll())
    .then(({ data }) => {
      dispatch({
        type: versioningGetSuccess,
        versions: data,
      })
    })
    .catch((err) => dispatch(applicationError(err)))
}

export const createVersion = (_: any) => (dispatch: any, getState: any) => {
  const state = getState()
  const newVersionForm: any = AdminState.getNewVersionForm(state)

  // Required fields for new version: version number and publishedAt
  const validForm = FRAVersion.getVersionNumber(newVersionForm) && FRAVersion.getPublishedAt(newVersionForm)

  // Form missing data?
  if (!validForm) {
    dispatch({
      type: versioningPostMissingData,
    })
    return
  }

  // Versioning in correct format
  // Major.Minor.Patch
  // <num>.<num>.<num> ex. 1.0.0
  // @ts-ignore
  const versionValid = /\d+\.\d+\.\d+/.test(FRAVersion.getVersionNumber(newVersionForm))
  if (!versionValid) {
    dispatch({
      type: versioningPostMissingData,
    })
    return
  }

  // use iso-String, for correct date/time in db
  // @ts-ignore
  newVersionForm.publishedAt = new Date(FRAVersion.getPublishedAt(newVersionForm)).toISOString()

  axios
    .post(ApiEndPoint.Versioning.create(), newVersionForm)
    .then((res) => {
      return dispatch({
        type: versioningPostSuccess,
        versions: res.data,
      })
    })
    .catch((err) => dispatch(applicationError(err)))
}

export const deleteVersion = (id: any) => (dispatch: any) => {
  if (!window.confirm('Are you sure?')) {
    return
  }
  console.log(id)
  axios
    .delete(ApiEndPoint.Versioning.delete(id))
    .then((res) => {
      return dispatch({
        type: versioningDeleteSuccess,
        versions: res.data,
      })
    })
    .catch((err) => dispatch(applicationError(err)))
}

export const onChangeNewVersionForm = (e: any) => (dispatch: any) => {
  dispatch({
    type: versioningUpdateForm,
    payload: { [e.target.name]: e.target.value },
  })
}
