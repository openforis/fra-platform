import React from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { useParams } from 'react-router-dom'

import { AssessmentName, AssessmentNames } from 'meta/assessment/assessment'
import { Labels } from 'meta/assessment/labels'
import { Row } from 'meta/assessment/row'

import { DataExportActions } from 'client/store/dataExport/actions'
import { useDataExportSelection } from 'client/store/dataExport/hooks/dataExport'
import { DataExportSelection } from 'client/store/dataExport/state'
import { useAppDispatch } from 'client/store/hooks'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSection } from 'client/store/meta/hooks/sections'
import ButtonCheckBox, { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox'
import DefinitionLink from 'client/components/Links/DefinitionLink'
import { Breakpoints } from 'client/utils/breakpoints'

const Heading: Record<string, string> = {
  [AssessmentNames.fra]: 'common.variable',
  [AssessmentNames.panEuropean]: 'panEuropean.variable',
}

const VariableSelect: React.FC<{ variables: Array<Row> }> = ({ variables }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { assessmentName, sectionName } = useParams<{
    assessmentName: AssessmentName
    sectionName: string
  }>()
  const cycle = useCycle()
  const selection = useDataExportSelection(sectionName)
  const selectionVariables = selection.sections[sectionName].variables
  const subSection = useSection(sectionName)

  const updateSelection = (variablesUpdate: Array<string>): void => {
    const selectionUpdate: DataExportSelection = {
      ...selection,
      sections: {
        ...selection.sections,
        [sectionName]: {
          ...selection.sections[sectionName],
          variables: variablesUpdate,
        },
      },
    }
    dispatch(
      DataExportActions.updateSelection({
        sectionName,
        selection: selectionUpdate,
      })
    )
  }

  return (
    <div className="export__form-section">
      <div className="export__form-section-header">
        <div className="export__form-section-header-withLink">
          <h4>{t(Heading[assessmentName])}</h4>
          <DefinitionLink
            anchor={subSection.props.anchors[cycle.uuid]}
            document="tad"
            title={`(${t('definition.definitionLabel')})`}
          />
        </div>
        <ButtonCheckBox
          checked={selectionVariables.length > 0 && selectionVariables.length === variables.length}
          className="btn-all"
          label={t(selectionVariables.length > 0 ? 'common.unselectAll' : 'common.selectAll')}
          onClick={() => {
            updateSelection(
              selection.sections[sectionName].variables.length > 0 ? [] : variables.map((v) => v.props.variableName)
            )
          }}
          variant={ButtonCheckboxVariant.checkbox}
        />
      </div>

      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <select
          multiple
          onChange={(event) => {
            const variablesUpdate = Array.from(event.target.selectedOptions, (option) => {
              return String(option.value)
            })
            updateSelection(variablesUpdate)
          }}
          value={selectionVariables}
        >
          {variables.map((variable) => {
            const { variableName } = variable.props

            const label = Labels.getCycleLabel({ cycle, labels: variable.cols[0].props.labels, t })

            return (
              <option key={variableName} value={variableName}>
                {label}
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
              const { variableName } = variable.props

              const label = Labels.getCycleLabel({ cycle, labels: variable.cols[0].props.labels, t })

              const selected = selectionVariables.includes(variableName)

              return (
                <ButtonCheckBox
                  key={variableName}
                  checked={selected}
                  label={label}
                  onClick={() => {
                    const variablesUpdate = [...selectionVariables]
                    if (selected) variablesUpdate.splice(variablesUpdate.indexOf(variableName), 1)
                    else variablesUpdate.push(variableName)

                    updateSelection(variablesUpdate)
                  }}
                  variant={ButtonCheckboxVariant.checkbox}
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
