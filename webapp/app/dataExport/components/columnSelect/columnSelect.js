import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from '@webapp/components/hooks'
import ButtonCheckBox from '@webapp/components/buttonCheckBox'

const i18nMappings = {
  common_name: 'growingStockComposition.commonName',
  scientific_name: 'growingStockComposition.scientificName',
  national: 'forestPolicy.national',
  subnational: 'forestPolicy.subnational',
}

const ColumnSelect = (props) => {
  const { setSelectionColumns, columns, selectionColumns } = props
  const i18n = useI18n()

  return (
    <div className="export__form-section">
      <div className="export__form-section-header">
        <h4>{i18n.t('common.column')}</h4>
      </div>

      <div className="divider" />

      <div className="export__form-section-variables">
        {columns.map((column) => {
          const selected = selectionColumns.includes(column)
          const label = i18nMappings[column] || String(column)
          return (
            <ButtonCheckBox
              key={column}
              checked={selected}
              label={label}
              onClick={() => {
                const selectionColumnsUpdate = selected
                  ? selectionColumns.filter((col) => col !== column)
                  : [...selectionColumns, column]
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
