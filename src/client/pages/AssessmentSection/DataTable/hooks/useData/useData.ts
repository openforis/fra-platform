import { useEffect, useState } from 'react'

import { Objects } from 'utils/objects'

import { Cols } from 'meta/assessment'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { useAssessment, useCycle } from 'client/store/assessment'
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

  const [dataState, setDataState] = useState<RecordAssessmentData>(dataStore)

  useEffect(() => {
    const assessmentName = assessment.props.name
    const cycleName = cycle.name

    const countryData = RecordAssessmentDatas.getCountryData({
      assessmentName,
      cycleName,
      countryIso,
      data: dataStore,
    })
    if (Objects.isEmpty(countryData)) {
      setDataState(dataStore)
      return
    }

    const data = Objects.cloneDeep(dataStore)

    // console.log('1. ---- Start calculation ', data)

    rowsData.forEach((row) => {
      const { variableName } = row.props

      row.cols.forEach((col) => {
        const { colName } = col.props
        const formula = Cols.getCalculateFn({ cycle, row, col })

        if (colName && formula) {
          const paramsValue = { assessmentName, cycleName, countryIso, tableName, variableName, colName, data }
          const value = RecordAssessmentDatas.getNodeValue(paramsValue)

          if (Objects.isEmpty(value) || value.calculated) {
            const paramsCalculate = { assessment, countryIso, cycle, data, colName, row, formula }
            const raw = ExpressionEvaluator.evalFormula<string | unknown>(paramsCalculate)
            // console.log('2 ---- calculating using data ', data)
            // console.log('    params', assessmentName, cycleName, countryIso, tableName, variableName, colName, formula)
            // console.log('    value', value)
            // console.log('    raw result ', raw)
            RecordAssessmentDatas.updateDatum({ ...paramsValue, value: { raw, calculated: true } })
            // console.log('3 --- data after update ', data)
          }
        }
      })
    })
    setDataState(data)
  }, [assessment, countryIso, cycle, dataStore, rowsData, table, tableName])

  return dataState
}
