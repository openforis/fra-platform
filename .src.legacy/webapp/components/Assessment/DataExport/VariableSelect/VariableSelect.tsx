import React from 'react'
import { useDispatch } from 'react-redux'
import MediaQuery from 'react-responsive'

import { FRA, PanEuropean } from '@core/assessment'
import { SectionSpecs } from '@webapp/sectionSpec'
import { useAssessmentType } from '@webapp/store/app'
import { DataExportActions, DataExportSelection, useDataExportSelection } from '@webapp/store/page/dataExport'
import { useI18n, useParamSection } from '@webapp/hooks'
import { getVariableLabelKey } from '@webapp/components/Assessment/DataExport/utils'
import { Breakpoints } from '@webapp/utils/breakpoints'

import ButtonCheckBox from '@webapp/components/buttonCheckBox'

const Heading: Record<string, string> = {
  [FRA.type]: 'common.variable',
  [PanEuropean.type]: 'panEuropean.variable',
}

const VariableSelect: React.FC = () => {
  const dispatch = useDispatch()
  const i18n = useI18n()
  const assessmentType = useAssessmentType()
  const assessmentSection = useParamSection()
  const selection = useDataExportSelection(assessmentSection)
  const selectionVariables = selection.sections[assessmentSection].variables

  const tableSpec = SectionSpecs.getTableSpecExport(assessmentType, assessmentSection)
  const variables = tableSpec.rows.filter((row) => !!row.variableExport)

  const updateSelection = (variablesUpdate: Array<string>): void => {
    const selectionUpdate: DataExportSelection = {
      ...selection,
      sections: {
        ...selection.sections,
        [assessmentSection]: {
          ...selection.sections[assessmentSection],
          variables: variablesUpdate,
        },
      },
    }
    dispatch(DataExportActions.updateSelection({ assessmentSection, selection: selectionUpdate }))
  }

  return (
    <div className="export__form-section">
      <div className="export__form-section-header">
        <h4>{i18n.t(Heading[assessmentType])}</h4>
        <ButtonCheckBox
          className="btn-all"
          checked={selectionVariables.length > 0 && selectionVariables.length === variables.length}
          label={selectionVariables.length > 0 ? 'common.unselectAll' : 'common.selectAll'}
          onClick={() => {
            updateSelection(
              selection.sections[assessmentSection].variables.length > 0
                ? []
                : variables.map((v) => String(v.variableExport))
            )
          }}
        />
      </div>

      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <select
          multiple
          value={selectionVariables}
          onChange={(event) => {
            const variablesUpdate = Array.from(event.target.selectedOptions, (option) => {
              return String(option.value)
            })
            updateSelection(variablesUpdate)
          }}
        >
          {variables.map((variable) => {
            const { cols, variableExport } = variable
            const { labelKey, labelParams, labelPrefixKey } = cols[0]
            const label = getVariableLabelKey(labelKey)

            return (
              <option key={variableExport} value={variableExport}>
                {`${labelPrefixKey ? i18n.t(labelPrefixKey) : ''}${i18n.t(label, labelParams)}`}
              </option>
            )
          })}
        </select>
      </MediaQuery>
      <MediaQuery minWidth={Breakpoints.laptop}>
        <>
          <div className="divider" />
          <div className="export__form-section-variables">
            {variables.map((variable) => {
              const { cols, variableExport } = variable
              const { labelKey, labelParams, labelPrefixKey } = cols[0]
              const label = getVariableLabelKey(labelKey)
              const selected = selectionVariables.includes(String(variableExport))

              return (
                <ButtonCheckBox
                  key={variableExport}
                  checked={selected}
                  label={[labelPrefixKey, label]}
                  labelParam={labelParams}
                  onClick={() => {
                    const variablesUpdate = [...selectionVariables]
                    if (selected) variablesUpdate.splice(variablesUpdate.indexOf(String(variableExport)), 1)
                    else variablesUpdate.push(String(variableExport))

                    updateSelection(variablesUpdate)
                  }}
                />
              )
            })}
          </div>
        </>
      </MediaQuery>
    </div>
  )
}

export default VariableSelect
