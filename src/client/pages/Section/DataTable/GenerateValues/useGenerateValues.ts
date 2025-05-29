import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentName } from 'meta/assessment/assessment'
import { ColType } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { Row, RowType } from 'meta/assessment/row'
import { RecordAssessmentData, RecordAssessmentDatas, RecordCountryData } from 'meta/data'

import { DataActions } from 'client/store/data'
import { useAppDispatch } from 'client/store/hooks'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useIsEstimationPending } from 'client/store/ui/assessmentSection'
import { useCountryIso } from 'client/hooks'

import { GenerateValuesField } from './field'
import { Method, Methods } from './method'

export interface UseGenerateValues {
  method: Method
  fields: Array<GenerateValuesField>
  generateValues: () => void
  isEstimationPending: boolean
  setFields: (fields: Array<GenerateValuesField>) => void
  setMethod: (method: Method) => void
  valid: boolean
}

const isTableWithOdpEmpty = (data: RecordCountryData) => {
  return (
    Object.values(data).flatMap((section) =>
      Object.values(section).flatMap((year) =>
        Object.values(year).flatMap((v) => Object.values(v).filter((variable) => variable && !variable.odp))
      )
    ).length > 0
  )
}

const useGenerateValues = (
  assessmentName: AssessmentName,
  cycleName: CycleName,
  sectionName: string,
  tableName: string,
  rows: Array<Row>,
  data: RecordAssessmentData
): UseGenerateValues => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const i18n = useTranslation()
  const isEstimationPending = useIsEstimationPending()

  const [method, setMethod] = useState<Method>(null)
  const [fields, setFields] = useState<Array<GenerateValuesField>>(
    rows
      .filter((row) => row.props.type === RowType.data && !row.props.calculateFn?.[cycle.uuid] && !row.props.readonly)
      .map((row) => {
        const { variableName } = row.props
        const colHeader = row.cols.find((col) => col.props.colType === ColType.header)
        const { key } = colHeader.props.labels[cycle.uuid]
        return {
          variableName,
          labelKey: key,
          selected: false,
          annualChangeRates: { past: '', future: '' },
        }
      })
  )

  const generateValues = () => {
    if (
      isTableWithOdpEmpty(RecordAssessmentDatas.getCycleData({ data, assessmentName, cycleName })) ||
      window.confirm(i18n.t('tableWithOdp.confirmGenerateFraValues'))
    ) {
      const fieldsToUpdate = fields.filter((field) => field.selected === true)
      const changeRates =
        method === Method.annualChange
          ? fieldsToUpdate.reduce((changeRatesAccumulator, field) => {
              const { annualChangeRates, variableName } = field
              const { future: rateFuture, past: ratePast } = annualChangeRates
              return { ...changeRatesAccumulator, [variableName]: { ratePast, rateFuture } }
            }, {})
          : null

      dispatch(
        DataActions.postEstimate({
          countryIso,
          assessmentName,
          cycleName: cycle.name,
          method,
          sectionName,
          tableName,
          fields: fields
            .filter((f) => f.selected)
            .map(({ annualChangeRates, variableName }) => ({
              annualChangeRates,
              variableName,
              changeRates,
            })),
        })
      )
    }
  }

  const valid = Methods.isValid({ data: data?.[assessmentName]?.[cycleName][countryIso]?.[tableName], method, fields })

  return {
    method,
    setMethod,
    fields,
    setFields,
    valid,
    isEstimationPending,
    generateValues,
  }
}

export default useGenerateValues
