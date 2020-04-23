import axios from 'axios'
import * as AppState from '@webapp/app/appState'

import * as FRA from '@common/assessment/fra'

import * as autosave from '@webapp/app/components/autosave/actions'
import { updateTableData } from './update'

const extentOfForest = FRA.sections['1'].children.a
const forestCharacteristics = FRA.sections['1'].children.a
const growingStock = FRA.sections['2'].children.a

/**
 * Returns the api endpoint url.
 * Now the endpoint is not consistent. That is why it's needed to get different url based on section.
 * TODO: Make api endpoints consistent and remove this function.
 */
const getPostUrl = ({ countryIso, sectionName, tableName, datum }) => {
  if ([extentOfForest.name, forestCharacteristics.name].includes(sectionName)) {
    return `/api/nde/${sectionName}/country/${countryIso}/${datum.name}`
  }
  if (growingStock.name === sectionName) {
    return `/api/growingStock/${countryIso}`
  }
  return `/api/traditionalTable/${countryIso}/${tableName}`
}

/**
 * Returns the data to post.
 * Now the endpoint is not consistent. That is why it's needed to get different data to post based on section.
 * TODO: Make api endpoints consistent and remove this function.
 */
const getPostData = ({ sectionName, data, datum }) => {
  if ([extentOfForest.name, forestCharacteristics.name].includes(sectionName)) {
    return datum
  }
  return data
}

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

const _persistTableData = ({ sectionName, tableName, data, datum }) => {
  const debounced = async (dispatch, getState) => {
    const countryIso = AppState.getCountryIso(getState())
    const url = getPostUrl({ countryIso, sectionName, tableName, datum })
    await axios.post(url, getPostData({ sectionName, data, datum }))
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

export const persistTableTableCell = (params) => (dispatch, getState) => {
  const { assessmentType, sectionName, tableName, updateTableDataCell } = params

  const { data, datum } = updateTableDataCell(params)(getState())

  dispatch(updateTableData({ assessmentType, sectionName, tableName, data, autoSaveStart: true }))
  dispatch(_persistTableData({ data, datum, sectionName, tableName }))
}
