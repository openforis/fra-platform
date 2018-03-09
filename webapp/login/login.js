import './login.less'

import axios from 'axios'

if (location.search.indexOf('loginFailed') !== -1) {
  document.getElementById('login-failed-indicator').style.display = 'block'
}

function getParameterByName (name, url) {
  if (!url) {
    url = window.location.href
  }
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  var results = regex.exec(url)
  if (!results) {
    return null
  }
  if (!results[2]) {
    return ''
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

var invitationUUID = getParameterByName('i')
var loginUrl = invitationUUID ? '/auth/google?i=' + invitationUUID : '/auth/google'
document.getElementById('btnGoogleSignIn').setAttribute('href', loginUrl)

// init fra login
if (invitationUUID) {
  document.getElementById('invitationUUID').setAttribute('value', invitationUUID)
  document.getElementById('email').remove()
} else {
  document.getElementById('invitationUUID').remove()
  document.getElementById('password2').remove()
}

var showSignin = function () {
  document.getElementById('loginContainer').style.display = 'none'
  document.getElementById('signInContainer').style.display = 'block'
}

var showFraLogin = function () {
  document.getElementById('signInContainer').style.display = 'none'
  document.getElementById('loginError').style.display = 'none'
  document.getElementById('loginContainer').style.display = 'block'
}

var setReadOnlyForm = function (disabled) {
  var form = document.getElementById('loginForm')
  var elements = form.elements
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = disabled
  }
}

var submitLoginForm = function () {
  setReadOnlyForm(true)

  var params = null
  if (invitationUUID) {
    params = {
      invitationUUID: invitationUUID,
      password: document.getElementById('password').value,
      password2: document.getElementById('password2').value,
      // passportjs local strategy hack
      email: invitationUUID,
    }
  } else {
    params = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    }
  }

  axios.post('/auth/local/login', params)
    .then(resp => {
      const data = resp.data
      setReadOnlyForm(false)
      if (data.message) {
        document.getElementById('loginError').style.display = 'flex'
        document.getElementById('loginErrorMessage').innerHTML = data.message
      } else if (data.redirectUrl) {
        window.location = data.redirectUrl
      }
    })
    .catch(err => {throw new Error(err)})

  return false
}

document.getElementById('btnFraSignIn').onclick = showFraLogin
document.getElementById('fraLoginBtnCancel').onclick = showSignin
document.getElementById('loginForm').onsubmit = submitLoginForm
