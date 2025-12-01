import { useEffect, useState } from 'react'

import { NodeCalculations } from 'meta/assessment/nodeCalculations'
import { RowCache } from 'meta/assessment/rowCache'
import { Table } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data/recordData'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { Objects } from 'utils/objects'

import { useRecordAssessmentData } from 'client/store/data/tableData/nodeValues/hooks/data'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryIso } from 'client/hooks/country'
import { useRowsData } from 'client/pages/Section/DataTable/hooks/useRowsData'

export const useData = (table: Table): RecordAssessmentData => {
  const { name: tableName } = table.props
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const dataStore = useRecordAssessmentData()
  const [dataState, setDataState] = useState<RecordAssessmentData>(dataStore)
  const rowsData = useRowsData({ table })

  useEffect(() => {
    const { name: assessmentName } = assessment.props
    const { name: cycleName } = cycle

    const propsData = { assessmentName, cycleName, countryIso, data: dataStore }
    const countryData = RecordAssessmentDatas.getCountryData(propsData)

    if (Objects.isEmpty(countryData)) {
      setDataState(dataStore)
      return
    }

    const data = Objects.cloneDeep(dataStore)

    rowsData.forEach((row) => {
      const { variableName } = row.props

      row.cols.forEach((col) => {
        const { colName } = col.props

        if (colName) {
          const propsCalculate = {
            assessments: { [assessmentName]: assessment },
            assessmentName,
            cycleName,
            countryIso,
            tableName,
            row: row as RowCache,
            col,
            data,
          }
          const valueCalc = NodeCalculations.calculate(propsCalculate)
          if (valueCalc) {
            const propsUpdate = { assessmentName, cycleName, countryIso, tableName, variableName, colName, data }
            RecordAssessmentDatas.updateDatum({ ...propsUpdate, value: valueCalc })
          }
        }
      })
    })
    setDataState(data)
  }, [assessment, countryIso, cycle, dataStore, rowsData, tableName])

  return dataState
}
