import React from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { useParams } from 'react-router'

import { Objects } from '@core/utils'

import { AssessmentName, Col, Cols, ColType, Row } from '@meta/assessment'
import { useAppDispatch } from '@client/store'
import { useTableSections } from '@client/store/pages/assessmentSection'
import { DataExportActions, DataExportSelection, useDataExportSelection } from '@client/store/pages/dataExport'
import { DataExportActionType } from '@client/store/pages/dataExport/actionTypes'
import ButtonCheckBox from '@client/components/ButtonCheckBox'
import { getColumnLabelKeys } from '@client/pages/DataExport/utils'
import { Breakpoints } from '@client/utils/breakpoints'

const ColumnSelect: React.FC = () => {
  const dispatch = useAppDispatch()
  const i18n = useTranslation()
  const { assessmentName, section: assessmentSection } = useParams<{
    assessmentName: AssessmentName
    section: string
  }>()
  const selection = useDataExportSelection(assessmentSection)
  const selectionColumns = selection.sections[assessmentSection].columns

  const tableSections = useTableSections({ sectionName: assessmentSection })
  if (Objects.isEmpty(tableSections)) return null
  const { tables } = tableSections.find((tableSection) => tableSection.tables.find((table) => table.props.dataExport))
  const { rows } = tables.find((table) => table.props.dataExport)
  const cols = rows.reduce(
    (prev: Array<Col>, curr: Row) => [...prev, ...curr.cols.filter((col) => col.props.colType !== ColType.header)],
    []
  )
  const colIndexes = Cols.getColIndexes({ rows, cols })
  const columns = colIndexes.map((colIdx) => Cols.getColName({ colIdx, cols }))

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
          {columns.map((column: string) => {
            const label = getColumnLabelKeys(column, assessmentSection, assessmentName)
            return (
              <option key={column} value={column}>
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
            {columns.map((column: string) => {
              const selected = selectionColumns.includes(column)
              const label = getColumnLabelKeys(column, assessmentSection, assessmentName)

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
