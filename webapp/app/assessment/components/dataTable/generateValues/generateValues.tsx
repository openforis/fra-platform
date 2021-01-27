import './generateValues.less'
import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
import { methods } from '@webapp/app/assessment/components/dataTable/generateValues/methods'
import FieldsOption from '@webapp/app/assessment/components/dataTable/generateValues/fieldsOption'
import useI18n from '@webapp/components/hooks/useI18n'
import useGenerateValuesState from '@webapp/app/assessment/components/dataTable/generateValues/useGenerateValulesState'

type Props = {
  assessmentType: string
  sectionName: string
  tableName: string
  rows: any[]
  data: any[]
}
const GenerateValues = (props: Props) => {
  const { assessmentType, sectionName, tableName, rows, data } = props
  const { method, setMethod, fields, setFields, valid, generating, generateValues } = useGenerateValuesState(
    assessmentType,
    sectionName,
    tableName,
    rows,
    data
  )
  const i18n = useI18n()
  const isMethodClearTable = method === methods.clearTable
  return (
    <div className="app-view__section-toolbar no-print">
      <div className="data-table-generate-values">
        <select className="select-s" value={method} onChange={(evt) => setMethod(evt.target.value)}>
          <option value="" disabled>
            {(i18n as any).t('tableWithOdp.placeholderSelect')}
          </option>
          <option value={methods.linear}>{(i18n as any).t('tableWithOdp.linearExtrapolation')}</option>
          <option value={methods.repeatLast}>{(i18n as any).t('tableWithOdp.repeatLastExtrapolation')}</option>
          <option value={methods.annualChange}>{(i18n as any).t('tableWithOdp.annualChangeExtrapolation')}</option>
          <option disabled>---</option>
          <option value={methods.clearTable}>{(i18n as any).t('tableWithOdp.clearTable')}</option>
        </select>

        <button
          type="button"
          className={`btn-s ${isMethodClearTable ? 'btn-secondary' : 'btn-primary'}`}
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'boolean'... Remove this comment to see the full error message
          disabled={generating || !valid}
          onClick={generateValues}
        >
          {isMethodClearTable
            ? (i18n as any).t('tableWithOdp.clearTable')
            : (i18n as any).t('tableWithOdp.generateFraValues')}
        </button>

        {!R.isEmpty(method) && !isMethodClearTable && (
          <FieldsOption method={method} fields={fields} setFields={setFields} />
        )}
      </div>
    </div>
  )
}
export default GenerateValues
