export { DataActions } from './actions'
export { useCommentableDescriptionValue } from './hooks/useCommentableDescriptionValue'
export { useContacts } from './hooks/useContacts'
export { useDataSourcesLinked } from './hooks/useDataSourcesLinked'
export { useHasOriginalDataPointData } from './hooks/useHasOriginalDataPointData'
export { useHistoryActivities } from './hooks/useHistoryActivities'
export { useHistoryActivitiesCompareItem } from './hooks/useHistoryActivitiesCompareItem'
export { useHistoryActivitiesIsActive } from './hooks/useHistoryActivitiesIsActive'
export { useHistoryLastApprovedIsActive } from './hooks/useHistoryLastApprovedIsActive'
export { useIsOdpTableDataFetched } from './hooks/useIsOdpTableDataFetched'
export { useIsSectionDataEmpty } from './hooks/useIsSectionDataEmpty'
export { useIsSomeTableDataFetching } from './hooks/useIsSomeTableDataFetching'
export { useNodeValuesEstimation } from './hooks/useNodeValuesEstimation'
export { useNodeValueValidation, useTableHasErrors } from './hooks/useNodeValueValidations'
export { useOdpLastUpdatedTimestamp } from './hooks/useOdpLastUpdatedTimestamp'
export { useOriginalDataPointYears } from './hooks/useOriginalDataPointYears'
export { useRecordAssessmentData, useRecordAssessmentDataWithOdp } from './hooks/useRecordAssessmentData'
export type {
  DataState,
  HistoryActivitiesItemState,
  RecordAssessmentValidationsState,
  RecordCountryValidationsState,
  RecordCycleValidationsState,
  RecordTableValidationsState,
  TableDataStatusState,
} from './state'
export { TableDataStatus } from './state'
