import './generateValues.less'

import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import { methods } from '@webapp/app/assessment/components/dataTable/generateValues/methods'

import FieldsOption from '@webapp/app/assessment/components/dataTable/generateValues/fieldsOption'
import useI18n from '@webapp/components/hooks/useI18n'
import useGenerateValuesState from '@webapp/app/assessment/components/dataTable/generateValues/useGenerateValulesState'

const GenerateValues = props => {
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
        <select className="select-s" value={method} onChange={evt => setMethod(evt.target.value)}>
          <option value="" disabled>
            {i18n.t('tableWithOdp.placeholderSelect')}
          </option>
          <option value={methods.linear}>{i18n.t('tableWithOdp.linearExtrapolation')}</option>
          <option value={methods.repeatLast}>{i18n.t('tableWithOdp.repeatLastExtrapolation')}</option>
          <option value={methods.annualChange}>{i18n.t('tableWithOdp.annualChangeExtrapolation')}</option>
          <option disabled>---</option>
          <option value={methods.clearTable}>{i18n.t('tableWithOdp.clearTable')}</option>
        </select>

        <button
          type="button"
          className={`btn-s ${isMethodClearTable ? 'btn-secondary' : 'btn-primary'}`}
          disabled={generating || !valid}
          onClick={generateValues}
        >
          {isMethodClearTable ? i18n.t('tableWithOdp.clearTable') : i18n.t('tableWithOdp.generateFraValues')}
        </button>

        {!R.isEmpty(method) && !isMethodClearTable && (
          <FieldsOption method={method} fields={fields} setFields={setFields} />
        )}
      </div>
    </div>
  )
}

GenerateValues.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
}

export default GenerateValues
