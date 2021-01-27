import axios from 'axios'
import { applicationError } from '@webapp/components/error/actions'
import * as autosave from '../components/autosave/actions'

export const countryOverviewLoaded = 'landing/country/OverviewLoaded'

export const getCountryOverview = (countryIso: any) => (dispatch: any) => {
  axios
    .get(`/api/landing/${countryIso}/overview`)
    .then((resp) => dispatch({ type: countryOverviewLoaded, overview: resp.data.overview }))
    .catch((err) => dispatch(applicationError(err)))
}

// ================
//  file repository action creators
// ================

export const fileRepositoryFilesListLoad = 'fileRepository/filesList/load'

export const getFilesList = (countryIso: any) => (dispatch: any) => {
  axios
    .get(`/api/fileRepository/${countryIso}/filesList`)
    .then((resp) => {
      const filesList = resp.data
      dispatch({ type: fileRepositoryFilesListLoad, filesList })
    })
    .catch((err) => dispatch(applicationError(err)))
}

export const uploadFile = (countryIso: any, file: any, global = false) => (dispatch: any) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('global', '' + global)

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  }

  dispatch(autosave.start)

  axios
    .post(`/api/fileRepository/${countryIso}/upload`, formData, config)
    .then((resp) => {
      const filesList = resp.data
      dispatch({ type: fileRepositoryFilesListLoad, filesList })
      dispatch(autosave.complete)
    })
    .catch((err) => dispatch(applicationError(err)))
}

export const deleteFile = (countryIso: any, fileId: any) => (dispatch: any) => {
  dispatch(autosave.start)

  axios
    .delete(`/api/fileRepository/${countryIso}/file/${fileId}`)
    .then((resp) => {
      const filesList = resp.data
      dispatch({ type: fileRepositoryFilesListLoad, filesList })
      dispatch(autosave.complete)
    })
    .catch((err) => dispatch(applicationError(err)))
}
