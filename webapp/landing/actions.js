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
export const uploadFile = (countryIso, file) => dispatch => {
  const formData = new FormData()
  formData.append('file', file)

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  dispatch(autosave.start)

  axios
    .post(`/api/fileRepository/${countryIso}/upload`, formData, config)
    .then(() => {
      dispatch(autosave.complete)
      dispatch(getUploadedQuestionareInfo(countryIso))
    })
    .catch(err => dispatch(applicationError(err)))
}
