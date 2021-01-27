import axios from 'axios'
import * as AppState from '@webapp/store/app/state'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'

import * as autosave from '@webapp/app/components/autosave/actions'
import { updateTableData } from './update'

const extentOfForest = FRA.sections['1'].children.a
const forestCharacteristics = FRA.sections['1'].children.b
const growingStock = FRA.sections['2'].children.a

/**
 * Returns the api endpoint url.
 * Now the endpoint is not consistent. That is why it's needed to get different url based on section.
 * TODO: Make api endpoints consistent and remove this function.
 */
const getPostUrl = ({ countryIso, sectionName, tableName }: any) => {
  if ([extentOfForest.name, forestCharacteristics.name].includes(sectionName)) {
    return `/api/nde/${sectionName}/${countryIso}`
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
const getPostData = ({ sectionName, data }: any) => {
  if ([extentOfForest.name, forestCharacteristics.name].includes(sectionName)) {
    return data[AssessmentState.keysDataTableWithOdp.fraNoNDPs]
  }
  return data
}

const postTableData = ({ sectionName, tableName, data }: any) => {
  const debounced = async (dispatch: any, getState: any) => {
    const countryIso = AppState.getCountryIso(getState())
    const url = getPostUrl({ countryIso, sectionName, tableName })
    await axios.post(url, getPostData({ sectionName, data }))
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

export const persistTableData = ({ assessmentType, sectionName, tableName, data }: any) => (dispatch: any) => {
  dispatch(updateTableData({ assessmentType, sectionName, tableName, data, autoSaveStart: true }))
  dispatch(postTableData({ sectionName, tableName, data }))
}
