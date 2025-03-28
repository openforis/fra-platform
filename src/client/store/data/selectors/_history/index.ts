import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'
import { AssessmentName, SectionName } from 'meta/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { HistoryTarget } from 'meta/cycleData/historyActivities'

import { RootState } from 'client/store/RootState'

const getHistory = createSelector(
  (state: RootState) => state.data.history,
  (history) => history
)

// ==== history activities
const getHistoryActivities = createSelector(getHistory, (history) => history.activities ?? {})

const getHistoryCompareItem = createSelector(
  [getHistoryActivities, (_, target: HistoryTarget) => target],
  (history, target) => history?.compareItem?.[target]
)

const getHistoryItems = createSelector(getHistoryActivities, (history) => history?.items)

// ==== history last approved
const getHistoryLastApproved = createSelector(getHistory, (history) => history.lastApproved ?? {})
const isHistoryLastApprovedActive = createSelector(getHistoryLastApproved, (history) => Boolean(history?.active))

type Params = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
}

const getLastApprovedDescriptions = createSelector(
  [getHistoryLastApproved, (_, params: Params & { sectionName: SectionName }) => params],
  (lastApproved, { assessmentName, cycleName, countryIso, sectionName }) =>
    lastApproved?.descriptions?.[assessmentName]?.[cycleName]?.[countryIso]?.[sectionName]
)

const getLastApprovedOriginalDataPoint = createSelector(
  [getHistoryLastApproved, (_, params: Params & { year: string }) => params],
  (lastApproved, { assessmentName, countryIso, cycleName, year }) =>
    lastApproved?.originalDataPoints?.[assessmentName]?.[cycleName]?.[countryIso]?.[year]
)

const getLastApprovedTableData = createSelector(getHistoryLastApproved, (lastApproved) => lastApproved?.tableData)

export const History = {
  getHistory,
  // activities
  getHistoryActivities,
  getHistoryCompareItem,
  getHistoryItems,
  // lastApproved
  isHistoryLastApprovedActive,
  // descriptions
  getLastApprovedDescriptions,
  // tableData
  getLastApprovedTableData,
  // originalDataPoint
  getLastApprovedOriginalDataPoint,
}
