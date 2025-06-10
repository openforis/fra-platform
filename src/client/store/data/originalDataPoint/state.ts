import { ODPReservedYear, OriginalDataPoint } from 'meta/assessment/originalDataPoint'

export type OriginalDataPointState = {
  data?: OriginalDataPoint
  reservedYears?: Array<ODPReservedYear>
  updating?: boolean
  // odpLastUpdatedTimestamp: Record<AssessmentName, Record<CycleName, Record<CountryIso, { time?: string }>>>
}

export const initialState: OriginalDataPointState = {}
