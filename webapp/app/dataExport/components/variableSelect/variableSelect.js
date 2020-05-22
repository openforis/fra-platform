import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ButtonCheckBox from '@webapp/components/buttonCheckBox'

import { useI18n } from '@webapp/components/hooks'

const VariableSelect = (props) => {
  const { setSelectionVariable, variables } = props
  const i18n = useI18n()
  const [selectedVariable, setSelectedVariable] = useState('')

  return (
    <div className="export__form-section">
      <div className="export__form-section-header">
        <h4>{i18n.t('common.variable')}</h4>
      </div>

      <div className="divider" />

      <div className="export__form-section-variables">
        {variables.map((variable) => {
          const selected = variable.variableExport === selectedVariable
          return (
            <ButtonCheckBox
              key={variable.variableExport}
              checked={selected}
              label={variable.cols[0].labelKey}
              onClick={() => {
                const selection = selected ? '' : variable.variableExport
                setSelectedVariable(selection)
                setSelectionVariable(selection)
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
  setSelectionVariable: PropTypes.func.isRequired,
}

export default VariableSelect
