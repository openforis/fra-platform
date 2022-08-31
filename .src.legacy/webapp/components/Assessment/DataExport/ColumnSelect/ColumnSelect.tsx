import React from 'react'
import { useDispatch } from 'react-redux'
import MediaQuery from 'react-responsive'

import { SectionSpecs } from '@webapp/sectionSpec'
import { useAssessmentType } from '@webapp/store/app'
import { DataExportActions, DataExportSelection, useDataExportSelection } from '@webapp/store/page/dataExport'
import { useI18n, useParamSection } from '@webapp/hooks'
import { getColumnLabelKeys } from '@webapp/components/Assessment/DataExport/utils'
import { Breakpoints } from '@webapp/utils/breakpoints'

import ButtonCheckBox from '@webapp/components/buttonCheckBox'

const ColumnSelect: React.FC = () => {
  const dispatch = useDispatch()
  const i18n = useI18n()
  const assessmentType = useAssessmentType()
  const assessmentSection = useParamSection()
  const selection = useDataExportSelection(assessmentSection)
  const selectionColumns = selection.sections[assessmentSection].columns

  const tableSpec = SectionSpecs.getTableSpecExport(assessmentType, assessmentSection)
  const columns = tableSpec.columnsExport ?? []

  const updateSelection = (columnsUpdate: Array<string>): void => {
    const selectionUpdate: DataExportSelection = {
      ...selection,
      sections: {
        ...selection.sections,
        [assessmentSection]: {
          ...selection.sections[assessmentSection],
          columns: columnsUpdate,
        },
      },
    }
    dispatch(DataExportActions.updateSelection({ assessmentSection, selection: selectionUpdate }))
  }

  return (
    <div className="export__form-section">
      <div className="export__form-section-header select-all">
        <h4>{i18n.t('common.column')}</h4>
        <ButtonCheckBox
          className="btn-all"
          checked={selectionColumns.length > 0 && selectionColumns.length === columns.length}
          label={selectionColumns.length > 0 ? 'common.unselectAll' : 'common.selectAll'}
          onClick={() =>
            updateSelection(selection.sections[assessmentSection].columns.length > 0 ? [] : columns.map(String))
          }
        />
      </div>

      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <select
          multiple
          value={selectionColumns}
          onChange={(event) => {
            const columnsUpdate = Array.from(event.target.selectedOptions, (option) => String(option.value))
            updateSelection(columnsUpdate)
          }}
        >
          {columns.map((column) => {
            const label = getColumnLabelKeys(String(column), assessmentSection, assessmentType)
            return (
              <option key={column} value={String(column)}>
                {i18n.t(label)}
              </option>
            )
          })}
        </select>
      </MediaQuery>
      <MediaQuery minWidth={Breakpoints.laptop}>
        <>
          <div className="divider" />
          <div className="export__form-section-variables">
            {columns.map((column) => {
              const selected = selectionColumns.includes(String(column))
              const label = getColumnLabelKeys(String(column), assessmentSection, assessmentType)

              return (
                <ButtonCheckBox
                  key={String(column)}
                  checked={selected}
                  label={label}
                  onClick={() => {
                    const columnsUpdate = [...selectionColumns]
                    if (selected) columnsUpdate.splice(columnsUpdate.indexOf(String(column)), 1)
                    else columnsUpdate.push(String(column))

                    updateSelection(columnsUpdate)
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

export default ColumnSelect
