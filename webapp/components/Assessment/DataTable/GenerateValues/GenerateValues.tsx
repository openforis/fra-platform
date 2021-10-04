import './GenerateValues.scss'
import React from 'react'

import { Objects } from '@core/utils'
import { AssessmentType, TableData } from '@core/assessment'
import { RowSpec } from '@webapp/sectionSpec'
import { useI18n } from '@webapp/hooks'

import { Method } from './method'
import useGenerateValues from './useGenerateValules'
import FieldsOption from './FieldsOption'

type Props = {
  assessmentType: AssessmentType
  sectionName: string
  tableName: string
  rows: Array<RowSpec>
  data: TableData
}

const GenerateValues: React.FC<Props> = (props) => {
  const { assessmentType, sectionName, tableName, rows, data } = props

  const i18n = useI18n()
  const { method, setMethod, fields, setFields, valid, generating, generateValues } = useGenerateValues(
    assessmentType,
    sectionName,
    tableName,
    rows,
    data
  )
  const isMethodClearTable = method === Method.clearTable

  return (
    <div className="app-view__section-toolbar no-print">
      <div className="data-table-generate-values">
        <select className="select-s" value={method} onChange={(evt) => setMethod(evt.target.value as Method)}>
          <option value="" disabled>
            {i18n.t('tableWithOdp.placeholderSelect')}
          </option>
          <option value={Method.linear}>{i18n.t('tableWithOdp.linearExtrapolation')}</option>
          <option value={Method.repeatLast}>{i18n.t('tableWithOdp.repeatLastExtrapolation')}</option>
          <option value={Method.annualChange}>{i18n.t('tableWithOdp.annualChangeExtrapolation')}</option>
          <option disabled>---</option>
          <option value={Method.clearTable}>{i18n.t('tableWithOdp.clearTable')}</option>
        </select>

        <button
          type="button"
          className={`btn-s ${isMethodClearTable ? 'btn-secondary' : 'btn-primary'}`}
          disabled={generating || !valid}
          onClick={generateValues}
        >
          {isMethodClearTable ? i18n.t('tableWithOdp.clearTable') : i18n.t('tableWithOdp.generateFraValues')}
        </button>

        {!Objects.isEmpty(method) && !isMethodClearTable && (
          <FieldsOption method={method} fields={fields} setFields={setFields} />
        )}
      </div>
    </div>
  )
}

export default GenerateValues
