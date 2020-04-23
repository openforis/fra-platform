import * as API from '@webapp/main/api'
import * as autosave from '../components/autosave/actions'

export const countryOverviewLoaded = 'landing/country/OverviewLoaded'

export const getCountryOverview = (countryIso) => async (dispatch) => {
  const overview = await API.getCountryOverview(countryIso)
  dispatch({ type: countryOverviewLoaded, overview })
}

// ================
//  file repository action creators
// ================

export const fileRepositoryFilesListLoad = 'fileRepository/filesList/load'

export const getFilesList = (countryIso) => async (dispatch) => {
  const filesList = await API.getFilesList(countryIso)
  dispatch({ type: fileRepositoryFilesListLoad, filesList })
}

export const uploadFile = (countryIso, file, global = false) => async (dispatch) => {
  dispatch(autosave.start)
  const filesList = await API.uploadFile(countryIso, file, global)
  dispatch({ type: fileRepositoryFilesListLoad, filesList })
  dispatch(autosave.complete)
}

export const deleteFile = (countryIso, fileId) => async (dispatch) => {
  dispatch(autosave.start)
  const filesList = await API.deleteFile(countryIso, fileId)

  dispatch({ type: fileRepositoryFilesListLoad, filesList })
  dispatch(autosave.complete)
}
