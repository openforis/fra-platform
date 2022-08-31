import './GenerateValues.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@utils/objects'

import { AssessmentName, Row } from '@meta/assessment'
import { TableData } from '@meta/data'

import FieldsOption from './FieldsOption'
import { Method } from './method'
import useGenerateValues from './useGenerateValules'

type Props = {
  assessmentName: AssessmentName
  sectionName: string
  tableName: string
  rows: Array<Row>
  data: TableData
}

const GenerateValues: React.FC<Props> = (props) => {
  const { assessmentName, sectionName, tableName, rows, data } = props

  const i18n = useTranslation()
  // const { method, setMethod, fields, setFields, valid, generating, generateValues } = useGenerateValues(
  const { method, setMethod, fields, setFields, valid, generateValues } = useGenerateValues(
    assessmentName,
    sectionName,
    tableName,
    rows,
    data
  )
  const isMethodClearTable = method === Method.clearTable

  return (
    <div className="app-view__section-toolbar no-print">
      <div className="data-table-generate-values">
        <select className="select-s" value={method ?? ''} onChange={(evt) => setMethod(evt.target.value as Method)}>
          <option value="" disabled hidden>
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
          // disabled={generating || !valid}
          disabled={!valid}
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
