import React from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { useParams } from 'react-router'

import { Objects } from '@core/utils'

import { AssessmentName, Row, Table } from '@meta/assessment'
import { useAppDispatch } from '@client/store'
import { useTableSections } from '@client/store/pages/assessmentSection'
import { DataExportActions, DataExportSelection, useDataExportSelection } from '@client/store/pages/dataExport'
import { DataExportActionType } from '@client/store/pages/dataExport/actionTypes'
import ButtonCheckBox from '@client/components/ButtonCheckBox'
import { getVariableLabelKey } from '@client/pages/DataExport/utils'
import { Breakpoints } from '@client/utils/breakpoints'

const Heading: Record<string, string> = {
  [AssessmentName.fra]: 'common.variable',
  [AssessmentName.panEuropean]: 'panEuropean.variable',
}

const VariableSelect: React.FC = () => {
  const dispatch = useAppDispatch()
  const i18n = useTranslation()
  const { assessmentName, section: assessmentSection } = useParams<{
    assessmentName: AssessmentName
    section: string
  }>()
  const selection = useDataExportSelection(assessmentSection)
  const selectionVariables = selection.sections[assessmentSection].variables

  const tableSections = useTableSections({ sectionName: assessmentSection })
  if (Objects.isEmpty(tableSections)) return null
  const { tables } = tableSections[1]
  // const tables = tableSections.reduce((prev: Array<Table>, curr: TableSection) => [...prev, ...curr.tables], [])
  const variables = tables.reduce(
    (prev: Array<Row>, curr: Table) => [...prev, ...curr.rows.filter((row) => !!row.props.variableName)],
    []
  )

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
    dispatch(
      DataExportActions.updateSelection({
        assessmentSection,
        selection: selectionUpdate,
        type: DataExportActionType.selectionUpdate,
      })
    )
  }

  return (
    <div className="export__form-section">
      <div className="export__form-section-header">
        <h4>{i18n.t(Heading[assessmentName])}</h4>
        <ButtonCheckBox
          className="btn-all"
          checked={selectionVariables.length > 0 && selectionVariables.length === variables.length}
          label={selectionVariables.length > 0 ? 'common.unselectAll' : 'common.selectAll'}
          onClick={() => {
            updateSelection(
              selection.sections[assessmentSection].variables.length > 0
                ? []
                : variables.map((v) => v.props.variableName)
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
            const { variableName } = variable.props
            const { key: labelKey, params: labelParams, prefix: labelPrefixKey } = variable.props.label
            const label = getVariableLabelKey(labelKey)

            return (
              <option key={variableName} value={variableName}>
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
              const { variableName } = variable.props
              const { key: labelKey, params: labelParams, prefix: labelPrefixKey } = variable.props.label
              const label = getVariableLabelKey(labelKey)
              const selected = selectionVariables.includes(variableName)

              return (
                <ButtonCheckBox
                  key={variableName}
                  checked={selected}
                  label={[labelPrefixKey, label]}
                  labelParam={labelParams}
                  onClick={() => {
                    const variablesUpdate = [...selectionVariables]
                    if (selected) variablesUpdate.splice(variablesUpdate.indexOf(variableName), 1)
                    else variablesUpdate.push(variableName)

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
