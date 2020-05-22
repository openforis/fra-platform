import './columnSelect.less'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ButtonCheckBox from '@webapp/components/buttonCheckBox'

import { useI18n } from '@webapp/components/hooks'

const i18nMappings = {
  common_name: 'growingStockComposition.commonName',
  scientific_name: 'growingStockComposition.scientificName',
  national: 'forestPolicy.national',
  subnational: 'forestPolicy.subnational',
}

const getMapping = (column) => i18nMappings[column] || String(column)

const ColumnSelect = (props) => {
  const { setSelectionColumns, columns } = props
  const i18n = useI18n()

  const [selectedColumns, setSelectedColumns] = useState([])
  const columnIsSelected = (column) => selectedColumns.includes(column)

  const onClick = (column) => {
    const isSelected = columnIsSelected(column)
    const newSelection = isSelected ? selectedColumns.filter((col) => col !== column) : [...selectedColumns, column]
    setSelectedColumns(newSelection)
    setSelectionColumns(newSelection)
  }

  return (
    <div className="export-column-select">
      <div className="export-variable-select__header">
        <h4>{i18n.t('common.column')}</h4>
      </div>

      <div className="divider" />

      <div className="export-column-select__columns">
        {columns.map((column) => {
          return (
            <ButtonCheckBox
              key={column}
              checked={columnIsSelected(column)}
              label={getMapping(column)}
              onClick={() => onClick(column)}
            />
          )
        })}
      </div>
    </div>
  )
}

ColumnSelect.propTypes = {
  columns: PropTypes.array.isRequired,
  setSelectionColumns: PropTypes.func.isRequired,
}

export default ColumnSelect
