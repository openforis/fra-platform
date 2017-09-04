import axios from 'axios'

const noop = function() {}

const loginPage = '/login'

const check = () => {
  axios.get(`/api/loggedInUser/`)
    .then(noop)
    .catch(err => {
      if (err.response.status === 401) {
        window.location = loginPage
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
