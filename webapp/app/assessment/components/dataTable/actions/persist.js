import axios from 'axios'
import * as AppState from '@webapp/app/appState'

import * as autosave from '@webapp/app/components/autosave/actions'

export const persistTableData = (tableName, data, url = null) => {
  const debounced = async (dispatch, getState) => {
    const urlPost = url || `/api/traditionalTable/${AppState.getCountryIso(getState())}/${tableName}`
    await axios.post(urlPost, data)
    dispatch(autosave.complete)
  }
  debounced.meta = {
    debounce: {
      time: 800,
      key: `persistTableData/${tableName}`,
    },
  }
  return debounced
}
