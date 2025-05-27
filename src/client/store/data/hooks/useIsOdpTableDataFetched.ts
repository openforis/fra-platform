import { useMemo } from 'react'

import { TableNames } from 'meta/assessment/table'
import { RecordAssessmentDatas } from 'meta/data'

import { useRecordAssessmentData } from 'client/store/data/hooks/useRecordAssessmentData'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryIso } from 'client/hooks'

export const useIsOdpTableDataFetched = (): boolean => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const data = useRecordAssessmentData()
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  return useMemo<boolean>(() => {
    return Object.hasOwn(
      RecordAssessmentDatas.getCountryData({ assessmentName, cycleName, countryIso, data }),
      TableNames.originalDataPointValue
    )
  }, [assessmentName, countryIso, cycleName, data])
}
