import React from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { useParams } from 'react-router-dom'

import { AssessmentName } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { DataExportActions, DataExportSelection, useDataExportSelection } from 'client/store/ui/dataExport'
import { DataExportActionType } from 'client/store/ui/dataExport/actionTypes'
import ButtonCheckBox from 'client/components/ButtonCheckBox'
import { getColumnLabelKeys } from 'client/pages/DataExport/utils'
import { Breakpoints } from 'client/utils/breakpoints'

const ColumnSelect: React.FC<{ columns: Array<string> }> = ({ columns }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { assessmentName, sectionName } = useParams<{
    assessmentName: AssessmentName
    sectionName: string
  }>()
  const selection = useDataExportSelection(sectionName)
  const selectionColumns = selection.sections[sectionName].columns

  const updateSelection = (columnsUpdate: Array<string>): void => {
    const selectionUpdate: DataExportSelection = {
      ...selection,
      sections: {
        ...selection.sections,
        [sectionName]: {
          ...selection.sections[sectionName],
          columns: columnsUpdate,
        },
      },
    }
    dispatch(
      DataExportActions.updateSelection({
        sectionName,
        selection: selectionUpdate,
        type: DataExportActionType.selectionUpdate,
      })
    )
  }

  return (
    <div className="export__form-section">
      <div className="export__form-section-header select-all">
        <h4>{t('common.column')}</h4>
        <ButtonCheckBox
          className="btn-all"
          checked={selectionColumns.length > 0 && selectionColumns.length === columns.length}
          label={t(selectionColumns.length > 0 ? 'common.unselectAll' : 'common.selectAll')}
          onClick={() => updateSelection(selection.sections[sectionName].columns.length > 0 ? [] : columns.map(String))}
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
          {columns.map((column: string) => {
            const label = getColumnLabelKeys(column, sectionName, assessmentName).map(t).join(' ')
            return (
              <option key={column} value={column}>
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
            {columns.map((column: string) => {
              const selected = selectionColumns.includes(column)
              const label = getColumnLabelKeys(column, sectionName, assessmentName).map(t).join(' ')

              return (
                <ButtonCheckBox
                  key={column}
                  checked={selected}
                  label={label}
                  onClick={() => {
                    const columnsUpdate = [...selectionColumns]
                    if (selected) columnsUpdate.splice(columnsUpdate.indexOf(column), 1)
                    else columnsUpdate.push(column)

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
