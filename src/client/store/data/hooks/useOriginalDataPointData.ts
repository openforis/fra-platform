import { TableNames } from 'meta/assessment'
import { RecordAssessmentDatas, RecordColumnData } from 'meta/data'

import { useAppSelector } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'

export const useOriginalDataPointData = (): RecordColumnData => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  return useAppSelector((state) =>
    RecordAssessmentDatas.getTableData({
      assessmentName: assessment.props.name,
      cycleName: cycle.name,
      data: state.data.tableData,
      countryIso,
      tableName: TableNames.originalDataPointValue,
    })
  )
}
