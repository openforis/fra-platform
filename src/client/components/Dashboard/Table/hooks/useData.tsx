import { useEffect, useState } from 'react'

import { Objects } from 'utils/objects'

import { NodeCalculations, RowCache, Table as TableType } from 'meta/assessment'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { useAppSelector } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'
import { useRowsData } from 'client/pages/Section/DataTable/hooks/useRowsData'

export const useData = (table: TableType) => {
  const tableName = table.props.name
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const dataStore = useAppSelector((state) => state.data.tableData)
  const [dataState, setDataState] = useState<RecordAssessmentData>(dataStore)
  const rowsData = useRowsData({ table })

  useEffect(() => {
    const assessmentName = assessment.props.name
    const cycleName = cycle.name

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
            assessments: { [assessment.props.name]: assessment },
            assessment,
            cycle,
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
