import { useMemo } from 'react'

import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName, TableName, TableNames } from 'meta/assessment'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  data: RecordAssessmentData
  tableName: TableName
  countryIso: CountryIso
}

export const useAreChartVariablesEmpty = (props: Props) => {
  return useMemo(() => {
    const { tableName } = props
    if (tableName === TableNames.extentOfForest) {
      return ['forestArea', 'otherWoodedLand'].every((variableName) =>
        RecordAssessmentDatas.isVariableDataEmpty({ ...props, variableName })
      )
    }

    if (tableName === TableNames.forestCharacteristics) {
      return ['plantedForest', 'naturalForestArea'].every((variableName) =>
        RecordAssessmentDatas.isVariableDataEmpty({ ...props, variableName })
      )
    }
    return false
  }, [props])
}
