// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FraUtils from '@common/fraUtils'

export const methods = {
  linear: 'linear',
  repeatLast: 'repeatLast',
  annualChange: 'annualChange',
  clearTable: 'clearTable',
}

export const isMethodValid = (data: any, method: any, fields: any) => {
  // Clear table doesn't need any fields selected
  if (method === methods.clearTable) {
    return true
  }
  const fieldsSelected = fields.filter(R.propEq('selected', true))
  // method and fields must be selected
  if (R.isEmpty(method) || R.isEmpty(fieldsSelected)) {
    return false
  }
  // Annual change
  // check that for all selected fields, past and future chage rates are not empty
  if (method === methods.annualChange) {
    return fieldsSelected.every((field: any) => {
      const annualChangeRates = R.prop('annualChangeRates', field)
      return !R.isEmpty(annualChangeRates.past) && !R.isEmpty(annualChangeRates.future)
    })
  }
  // Linear or Repeat last require a minimum number of ODP
  const noOdpsRequired = method === methods.linear ? 2 : 1
  const odps = FraUtils.getOdps(data)
  return odps.length >= noOdpsRequired
}
