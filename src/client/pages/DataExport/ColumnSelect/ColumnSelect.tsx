import React from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { useParams } from 'react-router-dom'

import { AssessmentName } from 'meta/assessment/assessment'

import { DataExportActions } from 'client/store/dataExport/actions'
import { useDataExportSelection } from 'client/store/dataExport/hooks/dataExport'
import { DataExportSelection } from 'client/store/dataExport/state'
import { useAppDispatch } from 'client/store/hooks'
import ButtonCheckBox, { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox'
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
      })
    )
  }

  return (
    <div className="export__form-section">
      <div className="export__form-section-header select-all">
        <h4>{t('common.column')}</h4>
        <ButtonCheckBox
          checked={selectionColumns.length > 0 && selectionColumns.length === columns.length}
          className="btn-all"
          label={t(selectionColumns.length > 0 ? 'common.unselectAll' : 'common.selectAll')}
          onClick={() => updateSelection(selection.sections[sectionName].columns.length > 0 ? [] : columns.map(String))}
          variant={ButtonCheckboxVariant.checkbox}
        />
      </div>

      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <select
          multiple
          onChange={(event) => {
            const columnsUpdate = Array.from(event.target.selectedOptions, (option) => String(option.value))
            updateSelection(columnsUpdate)
          }}
          value={selectionColumns}
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

export default ColumnSelect
