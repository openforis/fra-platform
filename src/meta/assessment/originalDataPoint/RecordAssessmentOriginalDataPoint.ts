import { AreaCode } from 'meta/area/areaCode'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

export type RecordYearOriginalDataPoint = Record<string, OriginalDataPoint>
export type RecordCountryOriginalDataPoint = { [key in AreaCode]?: RecordYearOriginalDataPoint }
export type RecordCycleOriginalDataPoint = Record<CycleName, RecordCountryOriginalDataPoint>
export type RecordAssessmentOriginalDataPoint = Record<AssessmentName, RecordCycleOriginalDataPoint>
