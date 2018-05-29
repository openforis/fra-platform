import axios from 'axios'
import { applicationError } from '../applicationError/actions'
import * as autosave from '../autosave/actions'

import { googleApiKey, fusionTableUrl, fusionTableTId, getBoundsFromGeometryCollections } from './views/countryMap/map'
import { getUploadedQuestionareInfo } from '../panEuropeanIndicators/actions'

export const countryLatLngBoundsLoading = 'landing/country/LatLngBoundsLoading'
export const countryLatLngBoundsLoaded = 'landing/country/LatLngBoundsLoaded'
export const countryOverviewLoaded = 'landing/country/OverviewLoaded'

export const loadCountryShape = countryIso => dispatch => {
  dispatch({type: countryLatLngBoundsLoading})

  const data = {
    sql: `SELECT geometry FROM ${fusionTableTId} WHERE ISO = '${countryIso}' ORDER BY NAME_FAO ASC`,
    key: googleApiKey
  }

  axios.get(fusionTableUrl, {params: {...data}})
    .then(resp => {
      if (resp.data.rows) {
        const countryLatLngBounds = getBoundsFromGeometryCollections(resp.data.rows[0])
        dispatch({type: countryLatLngBoundsLoaded, countryLatLngBounds})
      }

    })
    .catch((err) => dispatch(applicationError(err)))
}

export const getCountryOverview = countryIso => dispatch => {
  axios.get(`/api/landing/${countryIso}/overview`)
    .then(resp =>
      dispatch({type: countryOverviewLoaded, overview: resp.data.overview})
    )
    .catch(err =>
      dispatch(applicationError(err))
    )
}

// ================
//  file repository action creators
// ================

export const fileRepositoryFilesListLoad = 'fileRepository/filesList/load'

export const getFilesList = (countryIso) => dispatch => {
  axios
    .get(`/api/fileRepository/${countryIso}/filesList`)
    .then(resp => {
      const filesList = resp.data
      dispatch({type: fileRepositoryFilesListLoad, filesList})
    })
    .catch(err => dispatch(applicationError(err)))
}

export const uploadFile = (countryIso, file, global = false) => dispatch => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('global', global)

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  dispatch(autosave.start)

  axios
    .post(`/api/fileRepository/${countryIso}/upload`, formData, config)
    .then(resp => {
      const filesList = resp.data
      dispatch({type: fileRepositoryFilesListLoad, filesList})
      dispatch(autosave.complete)

    })
    .catch(err => dispatch(applicationError(err)))
}

export const deleteFile = (countryIso, fileId) => dispatch => {
  dispatch(autosave.start)

  axios
    .delete(`/api/fileRepository/${countryIso}/file/${fileId}`)
    .then(resp => {
      const filesList = resp.data
      dispatch({type: fileRepositoryFilesListLoad, filesList})
      dispatch(autosave.complete)
    })
    .catch(err => dispatch(applicationError(err)))
}
