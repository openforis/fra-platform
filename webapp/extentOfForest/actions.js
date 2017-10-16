import axios from 'axios'

import {fetchItem} from '../originalDataPoint/actions'

export const generateFraValuesStart = 'extentOfForest/generateFraValues/start'

export const generateFraValues = (countryIso) => dispatch => {
  dispatch({type: generateFraValuesStart})

  axios.post(`/api/country/estimation/generateFraValues/${countryIso}`).then(resp => {
    dispatch(fetchItem('extentOfForest', countryIso))
  })
}
