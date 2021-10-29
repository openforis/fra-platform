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
  const selectionVariable = selection.sections[assessmentSection].variable

  const tableSpec = SectionSpecs.getTableSpecExport(assessmentType, assessmentSection)
  const variables = tableSpec.rows.filter((row) => !!row.variableExport)

  const toggleVariable = (variableExport: string): void => {
    const selected = variableExport === selection.sections[assessmentSection].variable
    const selectionUpdate: DataExportSelection = {
      ...selection,
      sections: {
        [assessmentSection]: {
          ...selection.sections[assessmentSection],
          variable: selected ? '' : variableExport,
        },
      },
    }
    dispatch(DataExportActions.updateSelection({ assessmentSection, selection: selectionUpdate }))
  }

  return (
    <div className="export__form-section">
      <div className="export__form-section-header">
        <h4>{i18n.t(Heading[assessmentType])}</h4>
      </div>

      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <select onChange={(event) => toggleVariable(event.target.value)} value={selectionVariable}>
          <option value="">-</option>
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
              const selected = variableExport === selectionVariable

              return (
                <ButtonCheckBox
                  key={variableExport}
                  checked={selected}
                  label={[labelPrefixKey, label]}
                  labelParam={labelParams}
                  onClick={() => toggleVariable(variableExport)}
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
