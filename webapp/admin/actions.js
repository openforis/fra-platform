import axios from 'axios'
export const versioningGetSuccess = 'versioning/get/success'

export const getVersions = () => dispatch => {
  axios.get(`/api/versioning/`).then(({ data }) => {
    console.log(data)
    dispatch({
      type: versioningGetSuccess,
      versions: data
    })
  }).catch(console.error)
} 
