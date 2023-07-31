import { useMemo } from 'react'

import { TableNames } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useRecordAssessmentData } from 'client/store/data/hooks/useRecordAssessmentData'
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
