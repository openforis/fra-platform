import axios from 'axios'
import { applicationError } from '@webapp/components/error/actions'
import { ApiEndPoint } from '@common/api/endpoint'
import * as autosave from '../components/autosave/actions'

export const countryOverviewLoaded = 'landing/country/OverviewLoaded'

export const getCountryOverview = (countryIso: any) => (dispatch: any) => {
  axios
    .get(ApiEndPoint.Landing.Get.overview(countryIso))
    .then((resp) => dispatch({ type: countryOverviewLoaded, overview: resp.data.overview }))
    .catch((err) => dispatch(applicationError(err)))
}

// ================
//  file repository action creators
// ================

export const fileRepositoryFilesListLoad = 'fileRepository/filesList/load'

export const getFilesList = (countryIso: any) => (dispatch: any) => {
  axios
    .get(ApiEndPoint.FileRepository.getFileList(countryIso))
    .then((resp) => {
      const filesList = resp.data
      dispatch({ type: fileRepositoryFilesListLoad, filesList })
    })
    .catch((err) => dispatch(applicationError(err)))
}

export const uploadFile =
  (countryIso: any, file: any, global = false) =>
  (dispatch: any) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('global', `${global}`)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    dispatch(autosave.start)

    axios
      .post(ApiEndPoint.FileRepository.create(countryIso), formData, config)
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
    .delete(ApiEndPoint.FileRepository.delete(countryIso, fileId))
    .then((resp) => {
      const filesList = resp.data
      dispatch({ type: fileRepositoryFilesListLoad, filesList })
      dispatch(autosave.complete)
    })
    .catch((err) => dispatch(applicationError(err)))
}
