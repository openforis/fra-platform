import axios from 'axios'
import * as R from 'ramda'
import { batch } from 'react-redux'

import * as FRA from '@common/assessment/fra'
import * as FRAUtils from '@common/fraUtils'

import * as AppState from '@webapp/app/appState'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'

import * as autosave from '@webapp/app/components/autosave/actions'

export const assessmentSectionDataUpdate = 'assessment/section/data/update'
export const assessmentSectionDataGeneratingValuesUpdate = 'assessment/section/data/generatingValues/update'

export const updateTableData = (assessmentType, sectionName, tableName, data) => ({
  type: assessmentSectionDataUpdate,
  assessmentType,
  sectionName,
  tableName,
  data,
})

// ====== READ

const urlFetchData = {
  // 1a
  [FRA.sections['1'].children.a.tables
    .extentOfForest]: `/api/nde/${FRA.sections['1'].children.a.tables.extentOfForest}/`,
  // 1b
  [FRA.sections['1'].children.b.tables
    .forestCharacteristics]: `/api/nde/${FRA.sections['1'].children.b.tables.forestCharacteristics}/`,
  // 2a
  [FRA.sections['2'].children.a.name]: `/api/growingStock/`,
}

export const fetchTableData = (assessmentType, sectionName, tableName) => async (dispatch, getState) => {
  const countryIso = AppState.getCountryIso(getState())

  if (!R.isEmpty(tableName)) {
    let url = urlFetchData[tableName]
    url = url ? `${url}${countryIso}` : `/api/traditionalTable/${countryIso}/${tableName}`

    const { data } = await axios.get(url)

    dispatch(updateTableData(assessmentType, sectionName, tableName, data))
  }
}

// ====== UPDATE

const _postTableData = (tableName, data, odp = false) => {
  const debounced = async (dispatch, getState) => {
    const countryIso = AppState.getCountryIso(getState())

    const url = odp
      ? `/api/nde/${tableName}/country/${countryIso}/${data.name}`
      : `/api/traditionalTable/${countryIso}/${tableName}`
    await axios.post(url, data)

    dispatch(autosave.complete)
  }

  debounced.meta = {
    debounce: {
      time: 800,
      key: `${assessmentSectionDataUpdate}/${tableName}`,
    },
  }

  return debounced
}

// ====== Update Cell value

export const updateTableDataCell = (assessmentType, sectionName, tableName, rowIdx, colIdx, value) => async (
  dispatch,
  getState
) => {
  const data = R.pipe(
    AssessmentState.getSectionData(assessmentType, sectionName, tableName),
    R.assocPath([rowIdx, colIdx], value)
  )(getState())

  batch(() => {
    dispatch(autosave.start)
    dispatch(updateTableData(assessmentType, sectionName, tableName, data))
    dispatch(_postTableData(tableName, data))
  })
}

export const updateTableWithOdpCell = (assessmentType, sectionName, tableName, datum) => (dispatch, getState) => {
  const state = getState()

  const fra = R.pipe(
    AssessmentState.getFra(assessmentType, sectionName, tableName),
    FRAUtils.updateTableWithOdpDatum(datum)
  )(state)
  const fraNoNdps = R.pipe(
    AssessmentState.getFraNoNDPs(assessmentType, sectionName, tableName),
    FRAUtils.updateTableWithOdpDatum(datum)
  )(state)

  const data = {
    [AssessmentState.keysDataTableWithOdp.fra]: fra,
    [AssessmentState.keysDataTableWithOdp.fraNoNDPs]: fraNoNdps,
  }

  batch(() => {
    dispatch(autosave.start)
    dispatch(updateTableData(assessmentType, sectionName, tableName, data))
    dispatch(_postTableData(sectionName, datum, true))
  })
}

// ====== Generate values action

export const generateTableData = (assessmentType, sectionName, tableName, method, fields, changeRates) => async (
  dispatch,
  getState
) => {
  const countryIso = AppState.getCountryIso(getState())

  batch(() => {
    dispatch({
      type: assessmentSectionDataGeneratingValuesUpdate,
      assessmentType,
      sectionName,
      tableName,
      generating: true,
    })
    dispatch(autosave.start)
  })

  await axios.post(`/api/nde/${sectionName}/generateFraValues/${countryIso}`, { method, fields, changeRates })

  batch(() => {
    dispatch(fetchTableData(assessmentType, sectionName, tableName))
    dispatch({
      type: assessmentSectionDataGeneratingValuesUpdate,
      assessmentType,
      sectionName,
      tableName,
      generating: false,
    })
    dispatch(autosave.complete)
  })
}
