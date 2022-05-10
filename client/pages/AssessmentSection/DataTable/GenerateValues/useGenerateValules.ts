import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentName, ColType, Row, RowType } from '@meta/assessment'
import { TableData } from '@meta/data'

import { GenerateValuesField } from './field'
import { Method } from './method'

export interface UseGenerateValues {
  method: Method
  fields: Array<GenerateValuesField>
  generateValues: () => void
  generating: boolean
  setFields: (fields: Array<GenerateValuesField>) => void
  setMethod: (method: Method) => void
  valid: boolean
}

const isTableWithOdpEmpty = (data: TableData) => {
  return (
    Object.values(data).flatMap((section) =>
      Object.values(section).flatMap((year) =>
        Object.values(year).flatMap((v) => Object.values(v).filter((variable) => !variable.odp))
      )
    ).length > 0
  )
}

const useGenerateValues = (
  assessmentName: AssessmentName,
  sectionName: string,
  tableName: string,
  rows: Array<Row>,
  data: TableData
): UseGenerateValues => {
  const i18n = useTranslation()
  const generating = false // useSelector(AssessmentState.getSectionDataGeneratingValues(assessmentType, sectionName, tableName))

  const [method, setMethod] = useState<Method>(null)
  const [fields, setFields] = useState<Array<GenerateValuesField>>(
    rows
      .filter((row) => row.props.type === RowType.data && !row.props.calculateFn)
      .map((row) => {
        const { variableName } = row.props
        const colHeader = row.cols.find((col) => col.props.colType === ColType.header)
        const { key } = colHeader.props.label
        return {
          variableName,
          labelKey: key,
          selected: false,
          annualChangeRates: { past: '', future: '' },
        }
      })
  )

  const generateValues = () => {
    if (isTableWithOdpEmpty(data) || window.confirm(i18n.t('tableWithOdp.confirmGenerateFraValues'))) {
      const fieldsToUpdate = method === Method.clearTable ? fields : fields.filter((field) => field.selected === true)
      const changeRates =
        method === Method.annualChange
          ? fieldsToUpdate.reduce((changeRatesAccumulator, field) => {
              const { variableName, annualChangeRates } = field
              const { past: ratePast, future: rateFuture } = annualChangeRates
              return { ...changeRatesAccumulator, [variableName]: { ratePast, rateFuture } }
            }, {})
          : null

      // Send to backend
      console.log({ method, changeRates, assessmentName, sectionName, tableName })

      // ref components/Assessment/DataTable/actions/generate.ts
      // dispatch(
      //   generateTableData(
      //     assessmentType,
      //     sectionName,
      //     tableName,
      //     method,
      //     fieldsToUpdate.map((field) => field.variableName),
      //     changeRates
      //   )
      // )
    }
  }
  const valid = true // Methods.isValid(data, method, fields)

  return {
    method,
    setMethod,
    fields,
    setFields,
    valid,
    generating,
    generateValues,
  }
}

export default useGenerateValues
