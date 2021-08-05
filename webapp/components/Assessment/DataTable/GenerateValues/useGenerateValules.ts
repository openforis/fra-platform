import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import FRAUtils from '@common/fraUtils'
import { AssessmentType, TableData } from '@core/assessment'
import { RowSpec, TypeSpec } from '@webapp/sectionSpec'
import { useI18n } from '@webapp/components/hooks'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { generateTableData } from '@webapp/components/Assessment/DataTable/actions'

import { GenerateValuesField } from './field'
import { Methods, Method } from './method'

export interface UseGenerateValues {
  method: Method
  fields: Array<GenerateValuesField>
  generateValues: () => void
  generating: boolean
  setFields: (fields: Array<GenerateValuesField>) => void
  setMethod: (method: Method) => void
  valid: boolean
}

const useGenerateValues = (
  assessmentType: AssessmentType,
  sectionName: string,
  tableName: string,
  rows: Array<RowSpec>,
  data: TableData
): UseGenerateValues => {
  const dispatch = useDispatch()
  const i18n = useI18n()
  const generating = useSelector(AssessmentState.getSectionDataGeneratingValues(assessmentType, sectionName, tableName))

  const [method, setMethod] = useState<Method>(null)
  const [fields, setFields] = useState<Array<GenerateValuesField>>(
    rows
      .filter((row) => row.type === TypeSpec.data && !row.calculateFn)
      .map((row) => {
        const { variableName, cols } = row
        const colHeader = cols.find((col) => col.type === TypeSpec.header)
        const { labelKey } = colHeader
        return {
          variableName,
          labelKey,
          selected: false,
          annualChangeRates: { past: '', future: '' },
        }
      })
  )

  const generateValues = () => {
    if (FRAUtils.isTableWithOdpEmpty(data) || window.confirm(i18n.t('tableWithOdp.confirmGenerateFraValues'))) {
      const fieldsToUpdate = method === Method.clearTable ? fields : fields.filter((field) => field.selected === true)
      const changeRates =
        method === Method.annualChange
          ? fieldsToUpdate.reduce((changeRatesAccumulator, field) => {
              const { variableName, annualChangeRates } = field
              const { past: ratePast, future: rateFuture } = annualChangeRates
              return { ...changeRatesAccumulator, [variableName]: { ratePast, rateFuture } }
            }, {})
          : null

      dispatch(
        generateTableData(
          assessmentType,
          sectionName,
          tableName,
          method,
          fieldsToUpdate.map((field) => field.variableName),
          changeRates
        )
      )
    }
  }
  const valid = Methods.isValid(data, method, fields)

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
