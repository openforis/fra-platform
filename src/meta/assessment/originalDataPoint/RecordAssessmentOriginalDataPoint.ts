import { AreaCode } from 'meta/area'
import { OriginalDataPoint } from 'meta/assessment'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

export type RecordYearOriginalDataPoint = Record<string, OriginalDataPoint>
export type RecordCountryOriginalDataPoint = { [key in AreaCode]?: RecordYearOriginalDataPoint }
export type RecordCycleOriginalDataPoint = Record<CycleName, RecordCountryOriginalDataPoint>
export type RecordAssessmentOriginalDataPoint = Record<AssessmentName, RecordCycleOriginalDataPoint>
