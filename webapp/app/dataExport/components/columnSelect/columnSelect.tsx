import React from 'react'
import { useI18n } from '@webapp/components/hooks'
import ButtonCheckBox from '@webapp/components/buttonCheckBox'
import { useParams } from 'react-router'
import { getI18nKey } from '../../utils/format'

type Props = {
  columns: any[]
  selectionColumns: string[]
  setSelectionColumns: (...args: any[]) => any
}
const ColumnSelect = (props: Props) => {
  const { setSelectionColumns, columns, selectionColumns } = props
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assessmentType' does not exist on type '... Remove this comment to see the full error message
  const { assessmentType, section } = useParams()
  const i18n = useI18n()
  const getLabel = (column: any) => getI18nKey(column, section, assessmentType)
  const columnsAsArray = Array.isArray(columns) ? columns : [columns]
  return (
    <div className="export__form-section export-select-all">
      <div className="export__form-section-header">
        <h4>{(i18n as any).t('common.column')}</h4>
      </div>

      <ButtonCheckBox
        className="btn-all"
        checked={selectionColumns.length > 0 && selectionColumns.length === columns.length}
        label={selectionColumns.length > 0 ? 'common.unselectAll' : 'common.selectAll'}
        onClick={() => {
          if (selectionColumns.length > 0) setSelectionColumns([])
          else setSelectionColumns(columns.map((column) => ({ label: getLabel(column), param: column })))
        }}
      />

      <div className="divider" />

      <div className="export__form-section-variables">
        {columnsAsArray.map((column) => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'param' does not exist on type 'String'.
          const selected = !!selectionColumns.find(({ param }) => param === column)
          const label = getLabel(column)
          return (
            <ButtonCheckBox
              key={String(column)}
              checked={selected}
              label={label}
              onClick={() => {
                const selectionColumnsUpdate = selected
                  ? selectionColumns.filter((col) => (col as any).param !== column)
                  : [...selectionColumns, { label, param: column }]
                setSelectionColumns(selectionColumnsUpdate)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
export default ColumnSelect
