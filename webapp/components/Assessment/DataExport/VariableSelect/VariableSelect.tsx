import React from 'react'
import { useDispatch } from 'react-redux'

import { FRA, PanEuropean } from '@core/assessment'
import { SectionSpecs } from '@webapp/sectionSpec'
import { useAssessmentType } from '@webapp/store/app'
import { DataExportAction, DataExportSelection, useDataExportSelection } from '@webapp/store/page/dataExport'
import { useI18n, useParamSection } from '@webapp/components/hooks'
import { getVariableLabelKey } from '@webapp/components/Assessment/DataExport/utils'

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

  const tableSpec = SectionSpecs.getTableSpecExport(assessmentType, assessmentSection)
  const variables = tableSpec.rows.filter((row) => !!row.variableExport)

  return (
    <div className="export__form-section">
      <div className="export__form-section-header">
        <h4>{i18n.t(Heading[assessmentType])}</h4>
      </div>

      <div className="divider" />

      <div className="export__form-section-variables">
        {variables.map((variable) => {
          const { cols, variableExport } = variable
          const { labelKey, labelParams, labelPrefixKey } = cols[0]
          const label = getVariableLabelKey(labelKey)
          const selected = variableExport === selection.variable

          return (
            <ButtonCheckBox
              key={variableExport}
              checked={selected}
              label={[labelPrefixKey, label]}
              labelParam={labelParams}
              onClick={() => {
                const selectionUpdate: DataExportSelection = { ...selection, variable: selected ? '' : variableExport }
                dispatch(DataExportAction.updateSelection({ assessmentSection, selection: selectionUpdate }))
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default VariableSelect
