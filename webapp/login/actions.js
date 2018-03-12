import axios from 'axios'

export const localLoginResponseLoaded = 'localLogin/Response/Loaded'

export const localLoginReset = () => dispatch =>
  dispatch({type: localLoginResponseLoaded, message: null})

export const localLoginSubmit = (user, invitationUUID) => dispatch => {

  axios.post('/auth/local/login', {email: 'hackPassport', invitationUUID, ...user})
    .then(resp => {
      const data = resp.data
      if (data.redirectUrl) {
        window.location = data.redirectUrl
      } else if (data.message) {
        dispatch({type: localLoginResponseLoaded, message: data.message})
      }
    }).catch(error => dispatch({type: localLoginResponseLoaded, message: error}))

}
