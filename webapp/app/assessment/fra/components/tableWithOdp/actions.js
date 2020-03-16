import axios from 'axios'
import { applicationError } from '@webapp/app/components/error/actions'
import * as autosave from '../../../../components/autosave/actions'

export const valuesFetched = name => `${name}/value/fetch/completed`
export const valueChangeStart = name => `${name}/value/change/start`
export const pasteChangeStart = name => `${name}/value/paste/start`
export const generateFraValuesStart = name => `${name}/generateFraValues/start`

export const odpDirtyAction = 'tableWithOdp/odpDirtyAction'
export const odpCleanAction = name => `${name}/odpCleanAction`
export const markOdpDirty = { type: odpDirtyAction }

const fetched = (itemName, countryIso, data) => ({
  type: valuesFetched(itemName),
  countryIso,
  data,
})

/**
 * @deprecated
 */
export const fetchItem = (itemName, countryIso) => dispatch => {
  axios
    .get(`/api/nde/${itemName}/${countryIso}`)
    .then(resp => {
      dispatch(fetched(itemName, countryIso, resp.data))
    })
    .catch(err => dispatch(applicationError(err)))
}

const change = ({ section, countryIso, name, value }) => {
  const dispatched = dispatch => {
    return axios
      .post(`/api/nde/${section}/country/${countryIso}/${name}`, value)
      .then(() => {
        dispatch(autosave.complete)
      })
      .catch(err => {
        dispatch(applicationError(err))
      })
  }
  dispatched.meta = {
    debounce: {
      time: 800,
      key: `valueChangeStart_${name}`,
    },
  }
  return dispatched
}
const start = ({ section, name, value }) => ({ type: valueChangeStart(section), name, value })

/**
 * @deprecated
 */
export const save = (section, countryIso, name, newValue, fraValue, field, sanitizer) => dispatch => {
  const sanitizedValue = sanitizer(newValue, fraValue[field])
  const newFraValue = { ...fraValue, [field]: sanitizedValue, [`${field}Estimated`]: false }
  dispatch(start({ section, name, value: newFraValue }))
  dispatch(autosave.start)
  dispatch(change({ section, countryIso, name, value: newFraValue }))
}

/**
 * @deprecated
 */
const changeMany = ({ section, countryIso, columnData }) => {
  const dispatched = dispatch => {
    return axios
      .post(`/api/nde/${section}/${countryIso}`, { columns: columnData })
      .then(() => {
        dispatch(autosave.complete)
      })
      .catch(err => {
        dispatch(applicationError(err))
      })
  }
  return dispatched
}

/**
 * @deprecated
 */
export const saveMany = (section, countryIso, columnData) => dispatch => {
  dispatch({ type: pasteChangeStart(section), columnData })
  dispatch(autosave.start)
  dispatch(changeMany({ section, countryIso, columnData }))
}

/**
 * @deprecated
 */
export const generateFraValues = (section, countryIso, generateSpec) => dispatch => {
  dispatch({ type: generateFraValuesStart(section) })
  dispatch({ type: odpCleanAction(section) })

  axios
    .post(`/api/nde/${section}/generateFraValues/${countryIso}`, generateSpec)
    .then(() => {
      dispatch(fetchItem(section, countryIso))
    })
    .catch(err => {
      dispatch(applicationError(err))
    })
}
