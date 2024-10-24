export { useCommentableDescriptionValue } from './hooks/useCommentableDescriptionValue'
export { useContacts } from './hooks/useContacts'
export { useDataSourcesLinked } from './hooks/useDataSourcesLinked'
export { useHasOriginalDataPointData } from './hooks/useHasOriginalDataPointData'
export { useHistoryCompareItem } from './hooks/useHistoryCompareItem'
export { useIsHistoryActive } from './hooks/useIsHistoryActive'
export { useIsOdpTableDataFetched } from './hooks/useIsOdpTableDataFetched'
export { useIsSectionDataEmpty } from './hooks/useIsSectionDataEmpty'
export { useIsSomeTableDataFetching } from './hooks/useIsSomeTableDataFetching'
export { useNodeValuesEstimation } from './hooks/useNodeValuesEstimation'
export { useNodeValueValidation, useTableHasErrors } from './hooks/useNodeValueValidations'
export { useOdpLastUpdatedTimestamp } from './hooks/useOdpLastUpdatedTimestamp'
export { useOriginalDataPointYears } from './hooks/useOriginalDataPointYears'
export { useRecordAssessmentData, useRecordAssessmentDataWithOdp } from './hooks/useRecordAssessmentData'
export { DataActions } from './slice'
export type {
  DataState,
  HistoryItemState,
  RecordAssessmentValidationsState,
  RecordCountryValidationsState,
  RecordCycleValidationsState,
  RecordTableDataStatus,
  RecordTableValidationsState,
} from './state'
export { TableDataStatus } from './state'
