import './variableSelect.less'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useI18n } from '@webapp/components/hooks'

const VariableSelect = (props) => {
  const { setSelectionVariable, variables } = props
  const i18n = useI18n()

  const [selectedVariable, setSelectedVariable] = useState('')

  return (
    <div className="export-variable-select">
      <div className="export-variable-select__header">
        <h4>{i18n.t('variableSelection.variable')}</h4>
      </div>

      <div className="divider" />

      <div className="export-variable-select__countries">
        {variables.map((variable) => {
          const selected = variable.variableExport === selectedVariable
          return (
            <button
              name={variable.variableExport}
              type="button"
              className="btn-s btn-variable"
              key={variable.variableExport}
              onClick={() => {
                const selection = selected ? '' : variable.variableExport
                setSelectedVariable(selection)
                setSelectionVariable(selection)
              }}
            >
              <div className={`fra-checkbox${selected ? ' checked' : ''}`} />
              <div>{i18n.t(variable.cols[0].labelKey)}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

VariableSelect.propTypes = {
  variables: PropTypes.array.isRequired,
  setSelectionVariable: PropTypes.func.isRequired,
}

export default VariableSelect
