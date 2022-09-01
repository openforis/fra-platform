import FraUtils from '@common/fraUtils'
import { TableData } from '@core/assessment'
import { Objects } from '@core/utils'
import { GenerateValuesField } from './field'

export enum Method {
  linear = 'linear',
  repeatLast = 'repeatLast',
  annualChange = 'annualChange',
  clearTable = 'clearTable',
}

export const Methods = {
  isValid: (data: TableData, method: Method, fields: Array<GenerateValuesField>): boolean => {
    // Clear table doesn't need any fields selected
    if (method === Method.clearTable) {
      return true
    }
    const fieldsSelected = fields.filter((field) => field.selected === true)
    // method and fields must be selected
    if (Objects.isEmpty(method) || Objects.isEmpty(fieldsSelected)) {
      return false
    }
    // Annual change
    // check that for all selected fields, past and future chage rates are not empty
    if (method === Method.annualChange) {
      return fieldsSelected.every((field) => {
        const { annualChangeRates } = field
        return !Objects.isEmpty(annualChangeRates.past) && !Objects.isEmpty(annualChangeRates.future)
      })
    }
    // Linear or Repeat last require a minimum number of ODP
    const noOdpsRequired = method === Method.linear ? 2 : 1
    const odps: any = FraUtils.getOdps(data)
    return odps.length >= noOdpsRequired
  },
}
