import axios from 'axios'
// import * as ApiRoutes from '@common/apiRoutes'
// import ./create
// import ./read

export const instance = axios.create({
  baseURL: '/api/',
  timeout: 1000,
})

// ====== CREATE
export const uploadFile = async (countryIso, file, global) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('global', global)

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  }

  const { data } = await instance.post(`fileRepository/${countryIso}/upload`, formData, config)
  return data
}

// ====== READ
export const getCountryOverview = async (countryIso) => {
  const {
    data: { overview },
  } = await instance.get(`landing/${countryIso}/overview`)
  return overview
}

export const getFilesList = async (countryIso) => {
  const { data } = await instance.get(`fileRepository/${countryIso}/filesList`)
  return data
}

// ====== UPDATE

// ====== DELETE
export const deleteFile = async (countryIso, fileId) => {
  const { data } = await instance.delete(`fileRepository/${countryIso}/file/${fileId}`)
  return data
}
