import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from '@webapp/components/hooks'
import ButtonCheckBox from '@webapp/components/buttonCheckBox'
import { getCustomVariableI18nMappings } from '@webapp/app/dataExport/utils/format'
import { useAssessmentType } from '@webapp/store/app'
import * as FRA from '@common/assessment/fra'
import * as PanEuropean from '@common/assessment/panEuropean'

const VariableSelect = (props) => {
  const { setSelectionVariable, variables, selectionVariable } = props
  const i18n = useI18n()
  const assessmentType = useAssessmentType()
  const heading = {
    [FRA.type]: 'common.variable',
    [PanEuropean.type]: 'panEuropean.variable',
  }

  return (
    <div className="export__form-section">
      <div className="export__form-section-header">
        <h4>{i18n.t(heading[assessmentType])}</h4>
      </div>

      <div className="divider" />

      <div className="export__form-section-variables">
        {variables.map((variable) => {
          const { cols, variableExport } = variable
          const { labelKey, labelParams: labelParam, labelPrefixKey } = cols[0]
          const label = getCustomVariableI18nMappings(labelKey)
          // Some variables have special mapping: ex.
          // Other (specify in comments) => Other

          const selected = variableExport === selectionVariable.param
          return (
            <ButtonCheckBox
              key={variableExport}
              checked={selected}
              label={[labelPrefixKey, label]}
              labelParam={labelParam}
              onClick={() => {
                setSelectionVariable(
                  selected
                    ? {}
                    : {
                        param: variableExport,
                        label: labelKey,
                        labelParam,
                        labelPrefixKey,
                      }
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
