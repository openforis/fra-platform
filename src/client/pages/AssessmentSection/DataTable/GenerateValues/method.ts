import { Objects } from 'utils/objects'

import { NodeValue } from 'meta/assessment'

import { GenerateValuesField } from 'client/pages/AssessmentSection/DataTable/GenerateValues/field'

export enum Method {
  placeholder = 'placeholder',
  linear = 'linear',
  repeatLast = 'repeatLast',
  annualChange = 'annualChange',
}

export const Methods = {
  isValid: (props: {
    data?: Record<string, Record<string, NodeValue>>
    method: Method
    fields: Array<GenerateValuesField>
  }): boolean => {
    const { data, method, fields } = props
    const fieldsSelected = fields.filter((field) => field.selected === true)

    // method and fields must be selected
    if (Objects.isEmpty(method) || Objects.isEmpty(fieldsSelected)) {
      return false
    }

    // Annual change
    // check that for all selected fields, past and future change rates are not empty
    if (method === Method.annualChange) {
      return fieldsSelected.every((field) => {
        const { annualChangeRates } = field
        return !Objects.isEmpty(annualChangeRates.past) && !Objects.isEmpty(annualChangeRates.future)
      })
    }

    // Linear or Repeat last require a minimum number of ODP
    const minimumODPCount = method === Method.linear ? 2 : 1
    const odpYears = Object.keys(data).filter((year) =>
      fieldsSelected.every(({ variableName }) => Boolean(data?.[year]?.[variableName]?.odp))
    )

    return odpYears.length >= minimumODPCount
  },
}
