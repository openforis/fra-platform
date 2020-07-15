import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from '@webapp/components/hooks'
import ButtonCheckBox from '@webapp/components/buttonCheckBox'
import { getCustomVariableI18nMappings } from '@webapp/app/dataExport/utils/format'

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
          const label = getCustomVariableI18nMappings(cols[0].labelKey)

          const labelParam = cols[0].labelParams
          // Some variables have special mapping: ex.
          // Other (specify in comments) => Other

          const selected = variableExport === selectionVariable.param
          return (
            <ButtonCheckBox
              key={variableExport}
              checked={selected}
              label={label}
              labelParam={labelParam}
              onClick={() => {
                setSelectionVariable(
                  selected ? {} : { param: variableExport, label: cols[0].labelKey, labelParam: cols[0].labelParams }
                )
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
  selectionVariable: PropTypes.object.isRequired,
  setSelectionVariable: PropTypes.func.isRequired,
}

export default VariableSelect
