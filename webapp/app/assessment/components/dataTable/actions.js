import axios from 'axios'
import * as R from 'ramda'

import * as FRA from '@common/assessment/fra'
import * as FRAUtils from '@common/fraUtils'
import { batchActions } from '@webapp/main/reduxBatch'

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
  const state = getState()
  const dataLoaded = AssessmentState.isSectionDataLoaded(assessmentType, sectionName, tableName)(state)
  if (!dataLoaded) {
    const countryIso = AppState.getCountryIso(state)

    if (!R.isEmpty(tableName)) {
      let url = urlFetchData[tableName]
      url = url ? `${url}${countryIso}` : `/api/traditionalTable/${countryIso}/${tableName}`

      const { data } = await axios.get(url)

      dispatch(updateTableData(assessmentType, sectionName, tableName, data))
    }
  }
}

// ====== UPDATE

export const postTableData = (tableName, data, url = null) => {
  const debounced = async (dispatch, getState) => {
    const urlPost = url || `/api/traditionalTable/${AppState.getCountryIso(getState())}/${tableName}`
    await axios.post(urlPost, data)
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

export const updateTableDataCell = (assessmentType, sectionName, tableName, rowIdx, colIdx, value) => async (
  dispatch,
  getState
) => {
  const state = getState()
  const data = R.pipe(
    AssessmentState.getSectionData(assessmentType, sectionName, tableName),
    R.assocPath([rowIdx, colIdx], value)
  )(state)

  dispatch(batchActions([autosave.start, updateTableData(assessmentType, sectionName, tableName, data)]))
  dispatch(postTableData(tableName, data))
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
  const countryIso = AppState.getCountryIso(state)

  dispatch(batchActions([autosave.start, updateTableData(assessmentType, sectionName, tableName, data)]))
  dispatch(postTableData(sectionName, datum, `/api/nde/${tableName}/country/${countryIso}/${datum.name}`))
}

// ====== Generate values action

export const generateTableData = (assessmentType, sectionName, tableName, method, fields, changeRates) => async (
  dispatch,
  getState
) => {
  const countryIso = AppState.getCountryIso(getState())

  dispatch(
    batchActions([
      {
        type: assessmentSectionDataGeneratingValuesUpdate,
        assessmentType,
        sectionName,
        tableName,
        generating: true,
      },
      autosave.start,
    ])
  )

  const { data } = await axios.post(`/api/nde/${sectionName}/generateFraValues/${countryIso}`, {
    method,
    fields,
    changeRates,
  })

  dispatch(
    batchActions([
      updateTableData(assessmentType, sectionName, tableName, data),
      {
        type: assessmentSectionDataGeneratingValuesUpdate,
        assessmentType,
        sectionName,
        tableName,
        generating: false,
      },
      autosave.complete,
    ])
  )
}
