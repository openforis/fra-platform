import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentName } from 'meta/assessment/assessment'
import { ColType } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { Row, RowType } from 'meta/assessment/row'
import { RecordAssessmentData, RecordAssessmentDatas, RecordCountryData } from 'meta/data'

import { EstimationsActions } from 'client/store/data/tableData/estimations/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryIso } from 'client/hooks'
import { GenerateValuesField } from 'client/pages/Section/DataTable/GenerateValues/field'
import { Method, Methods } from 'client/pages/Section/DataTable/GenerateValues/method'

export interface UseGenerateValues {
  method: Method
  fields: Array<GenerateValuesField>
  generateValues: () => void
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

export const useGenerateValues = (
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
        EstimationsActions.postEstimate({
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
    generateValues,
  }
}
