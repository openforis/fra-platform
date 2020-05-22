import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from '@webapp/components/hooks'
import ButtonCheckBox from '@webapp/components/buttonCheckBox'

const VariableSelect = (props) => {
  const { setSelectionVariable, variables, selectionVariable } = props
  const i18n = useI18n()

  return (
    <div className="export__form-section">
      <div className="export__form-section-header">
        <h4>{i18n.t('common.variable')}</h4>
      </div>

      <div className="divider" />

      <div className="export__form-section-variables">
        {variables.map((variable) => {
          const { cols, variableExport } = variable
          const selected = variableExport === selectionVariable
          return (
            <ButtonCheckBox
              key={variableExport}
              checked={selected}
              label={cols[0].labelKey}
              onClick={() => {
                setSelectionVariable(selected ? '' : variableExport)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

VariableSelect.propTypes = {
  variables: PropTypes.array.isRequired,
  selectionVariable: PropTypes.string.isRequired,
  setSelectionVariable: PropTypes.func.isRequired,
}

export default VariableSelect
