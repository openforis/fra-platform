import { AreaCode } from 'meta/area'
import { AssessmentName, CycleName, OriginalDataPoint } from 'meta/assessment'

export type RecordYearOriginalDataPoint = Record<string, OriginalDataPoint>
export type RecordCountryOriginalDataPoint = { [key in AreaCode]?: RecordYearOriginalDataPoint }
export type RecordCycleOriginalDataPoint = Record<CycleName, RecordCountryOriginalDataPoint>
export type RecordAssessmentOriginalDataPoint = Record<AssessmentName, RecordCycleOriginalDataPoint>
