import axios from 'axios'

const noop = function() {}

const loginPage = ''

const goToLoginPageIfNotThereYet = () => {
  if (window.location.hash !== loginPage) window.location.hash = loginPage
}

const check = () => {
  axios.get(`/api/loggedInUser/`)
    .then(noop)
    .catch(err => {
      if (err.response.status === 401) {
        goToLoginPageIfNotThereYet()
      } else {
        console.log('Error occurred while polling logged-in state', err)
      }
    })
}

export const startPeriodicCheck = (pollInterval) => {
  setTimeout(() => {
    check()
    startPeriodicCheck(pollInterval)
  },
  pollInterval)
}
