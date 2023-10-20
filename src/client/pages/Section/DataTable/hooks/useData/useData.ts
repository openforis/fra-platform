import { useEffect, useState } from 'react'

import { Objects } from 'utils/objects'

import { NodeCalculations, RowCache } from 'meta/assessment'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useIsSomeTableDataFetching } from 'client/store/data'
import { useCountryIso } from 'client/hooks'

import { useRowsData } from '../useRowsData'
import { Props } from './props'
import { useDataStore } from './useDataStore'

export const useData = (props: Props): RecordAssessmentData => {
  const { table } = props
  const tableName = table.props.name

  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const dataStore = useDataStore({ table })
  const rowsData = useRowsData({ table })
  const tableDataFetching = useIsSomeTableDataFetching()
  const [dataState, setDataState] = useState<RecordAssessmentData>(dataStore)

  useEffect(() => {
    // do not update calculated variables if some tableData is still fetching
    if (tableDataFetching) return

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
          const propsCalculate = { assessment, cycle, countryIso, tableName, row: row as RowCache, col, data }
          const valueCalc = NodeCalculations.calculate(propsCalculate)
          if (valueCalc) {
            const propsUpdate = { assessmentName, cycleName, countryIso, tableName, variableName, colName, data }
            RecordAssessmentDatas.updateDatum({ ...propsUpdate, value: valueCalc })
          }
        }
      })
    })
    setDataState(data)
  }, [assessment, countryIso, cycle, dataStore, rowsData, tableDataFetching, tableName])

  return dataState
}
