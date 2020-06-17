import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from '@webapp/components/hooks'
import ButtonCheckBox from '@webapp/components/buttonCheckBox'
import { useParams } from 'react-router'
import { getI18nKey } from '../../utils/format'

const ColumnSelect = (props) => {
  const { setSelectionColumns, columns, selectionColumns } = props
  const { section } = useParams()
  const i18n = useI18n()

  return (
    <div className="export__form-section export-select-all">
      <div className="export__form-section-header">
        <h4>{i18n.t('common.column')}</h4>
      </div>

      <ButtonCheckBox
        className="btn-all"
        checked={selectionColumns.length > 0 && selectionColumns.length === columns.length}
        label={selectionColumns.length > 0 ? 'common.unselectAll' : 'common.selectAll'}
        onClick={() => {
          if (selectionColumns.length > 0) setSelectionColumns([])
          else setSelectionColumns(columns.map((column) => ({ label: getI18nKey(column, section), param: column })))
        }}
      />

      <div className="divider" />

      <div className="export__form-section-variables">
        {columns.map((column) => {
          const selected = !!selectionColumns.find(({ param }) => param === column)
          const label = getI18nKey(column, section)
          return (
            <ButtonCheckBox
              key={String(column)}
              checked={selected}
              label={label}
              onClick={() => {
                const selectionColumnsUpdate = selected
                  ? selectionColumns.filter((col) => col.param !== column)
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

ColumnSelect.propTypes = {
  columns: PropTypes.array.isRequired,
  selectionColumns: PropTypes.arrayOf(String).isRequired,
  setSelectionColumns: PropTypes.func.isRequired,
}

export default ColumnSelect
