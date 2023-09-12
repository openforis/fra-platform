import { useMemo } from 'react'

import { RecordAssessmentData } from 'meta/data'

import { useRecordAssessmentData, useRecordAssessmentDataWithOdp } from 'client/store/data'

import { useUseOriginalDataPointData } from '../useUseOriginalDataPointData'
import { Props } from './props'

export const useDataStore = (props: Props): RecordAssessmentData => {
  const { table } = props

  const dataWithOdp = useRecordAssessmentDataWithOdp()
  const dataWithoutOdp = useRecordAssessmentData()
  const useOriginalDataPointData = useUseOriginalDataPointData({ table })

  return useMemo<RecordAssessmentData>(() => {
    return useOriginalDataPointData ? dataWithOdp : dataWithoutOdp
  }, [dataWithOdp, dataWithoutOdp, useOriginalDataPointData])
}
