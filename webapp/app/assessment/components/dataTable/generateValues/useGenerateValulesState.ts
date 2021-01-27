import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRAUtils from '@common/fraUtils'
import { isMethodValid, methods } from '@webapp/app/assessment/components/dataTable/generateValues/methods'
import useI18n from '@webapp/components/hooks/useI18n'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { generateTableData } from '@webapp/app/assessment/components/dataTable/actions'

const useGenerateValuesState = (assessmentType: any, sectionName: any, tableName: any, rows: any, data: any) => {
  const dispatch = useDispatch()
  const i18n = useI18n()
  const generating = useSelector(AssessmentState.getSectionDataGeneratingValues(assessmentType, sectionName, tableName))
  const [method, setMethod] = useState('')
  const [fields, setFields] = useState(
    rows
      .filter((row: any) => R.propEq('type', 'data', row) && !R.prop('calculateFn', row))
      .map((row: any) => {
        const { variableName, cols } = row
        const colHeader = cols.find((col: any) => col.type === 'header')
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
    if (
      FRAUtils.isTableWithOdpEmpty(data) ||
      window.confirm((i18n as any).t('tableWithOdp.confirmGenerateFraValues'))
    ) {
      const fieldsToUpdate = method === methods.clearTable ? fields : fields.filter(R.propEq('selected', true))
      const changeRates =
        method === methods.annualChange
          ? fieldsToUpdate.reduce((changeRatesAccumulator: any, field: any) => {
              const { variableName, annualChangeRates } = field
              const { past: ratePast, future: rateFuture } = annualChangeRates
              return R.assoc(variableName, { ratePast, rateFuture })(changeRatesAccumulator)
            }, {})
          : null
      dispatch(
        generateTableData(
          assessmentType,
          sectionName,
          tableName,
          method,
          fieldsToUpdate.map(R.prop('variableName')),
          changeRates
        )
      )
    }
  }
  const valid = isMethodValid(data, method, fields)
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
export default useGenerateValuesState
