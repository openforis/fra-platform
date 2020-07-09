import axios from 'axios'

import { applicationError } from '@webapp/components/error/actions'

export const sustainableDevelopmentFetchCompleted = 'sustainableDevelopment/fetch/completed'

export const fetch = countryIso => dispatch =>
  axios
    .get(`/api/sustainableDevelopment/${countryIso}`)
    .then(resp => dispatch({type: sustainableDevelopmentFetchCompleted, data: resp.data}))
    .catch(err => dispatch(applicationError(err)))
