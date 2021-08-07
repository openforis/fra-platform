import React from 'react'
import { useDispatch } from 'react-redux'

import { SectionSpecs } from '@webapp/sectionSpec'
import { useAssessmentType } from '@webapp/store/app'
import { DataExportAction, DataExportSelection, useDataExportSelection } from '@webapp/store/page/dataExport'
import { useI18n, useParamSection } from '@webapp/components/hooks'
import { getColumnLabelKeys } from '@webapp/components/Assessment/DataExport/utils'

import ButtonCheckBox from '@webapp/components/buttonCheckBox'

const ColumnSelect: React.FC = () => {
  const dispatch = useDispatch()
  const i18n = useI18n()
  const assessmentType = useAssessmentType()
  const assessmentSection = useParamSection()
  const selection = useDataExportSelection(assessmentSection)

  const tableSpec = SectionSpecs.getTableSpecExport(assessmentType, assessmentSection)
  const columns = tableSpec.columnsExport ?? []

  return (
    <div className="export__form-section export-select-all">
      <div className="export__form-section-header">
        <h4>{i18n.t('common.column')}</h4>
      </div>

      <ButtonCheckBox
        className="btn-all"
        checked={selection.columns.length > 0 && selection.columns.length === columns.length}
        label={selection.columns.length > 0 ? 'common.unselectAll' : 'common.selectAll'}
        onClick={() => {
          const selectionUpdate: DataExportSelection = {
            ...selection,
            columns: selection.columns.length > 0 ? [] : columns.map(String),
          }
          dispatch(DataExportAction.updateSelection({ assessmentSection, selection: selectionUpdate }))
        }}
      />

      <div className="divider" />

      <div className="export__form-section-variables">
        {columns.map((column) => {
          const selected = selection.columns.includes(String(column))
          const label = getColumnLabelKeys(String(column), assessmentSection, assessmentType)

          return (
            <ButtonCheckBox
              key={String(column)}
              checked={selected}
              label={label}
              onClick={() => {
                const columnsUpdate = [...selection.columns]
                if (selected) columnsUpdate.splice(columnsUpdate.indexOf(String(column)), 1)
                else columnsUpdate.push(String(column))

                const selectionUpdate: DataExportSelection = { ...selection, columns: columnsUpdate }
                dispatch(DataExportAction.updateSelection({ assessmentSection, selection: selectionUpdate }))
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ColumnSelect
