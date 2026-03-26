import React from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { useParams } from 'react-router'

import { AssessmentName } from 'meta/assessment/assessment'

import { DataExportActions } from 'client/store/dataExport/actions'
import { useDataExportSelection } from 'client/store/dataExport/hooks/dataExport'
import { DataExportSelection } from 'client/store/dataExport/state'
import { useAppDispatch } from 'client/store/hooks'
import ButtonCheckBox, { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox'
import MultiSelect from 'client/components/Inputs/MultiSelect'
import { Option } from 'client/components/Inputs/Select'
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

  // Hide "dynamic" columns - they don't have a label (panEu)
  const visibleColumns = columns.reduce<Array<Option>>((acc, column) => {
    const label = getColumnLabelKeys(column, sectionName, assessmentName)
      .map((key) => t(key, { defaultValue: '' }))
      .join(' ')
      .trim()
    if (label) acc.push({ label, value: column })
    return acc
  }, [])

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
        <div className="title-container">
          <h4>{t('common.column')}</h4>
        </div>
        <MediaQuery minWidth={Breakpoints.laptop}>
          <ButtonCheckBox
            checked={selectionColumns.length > 0 && selectionColumns.length === visibleColumns.length}
            className="btn-all"
            label={t(selectionColumns.length > 0 ? 'common.unselectAll' : 'common.selectAll')}
            onClick={() => updateSelection(selectionColumns.length > 0 ? [] : visibleColumns.map((c) => c.value))}
            variant={ButtonCheckboxVariant.checkbox}
          />
        </MediaQuery>
      </div>

      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <MultiSelect
          multiLabelSummaryKey="common.column"
          onChange={updateSelection}
          options={visibleColumns}
          placeholder={t('common.select')}
          toggleAll
          value={selectionColumns}
        />
      </MediaQuery>
      <MediaQuery minWidth={Breakpoints.laptop}>
        <>
          <div className="divider" />
          <div className="export__form-section-variables">
            {visibleColumns.map(({ label, value: column }) => {
              const selected = selectionColumns.includes(column)

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
