import { MutableRefObject, useEffect } from 'react'

import { Objects } from 'utils/objects'

import { Row } from 'meta/assessment/row'

import { getDataGridElementMatrix } from 'client/components/DataGrid/utils'

type Props = {
  disabled: boolean
  gridRef: MutableRefObject<HTMLDivElement>
  rowsData: Array<Row>
  rowsHeader: Array<Row>
}

export const useCellBorderCorrection = (props: Props) => {
  const { disabled, gridRef, rowsData, rowsHeader } = props

  useEffect(() => {
    if (!gridRef?.current) return

    if (disabled) return

    const dataGridElementMatrix = getDataGridElementMatrix(gridRef.current)

    dataGridElementMatrix.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (Objects.isEmpty(cell)) return

        const isEditable = cell.classList.contains('editable')

        if (!isEditable) return

        const rightCell = row[colIndex + 1]
        const bottomCell = dataGridElementMatrix[rowIndex + 1]?.[colIndex]

        if (!Objects.isEmpty(rightCell) && !rightCell.classList.contains('editable')) {
          if (!rightCell.classList.contains('actions')) {
            cell.classList.add('lastEditableCol')
          }
        }

        if (!Objects.isEmpty(bottomCell) && !bottomCell.classList.contains('editable')) {
          if (!bottomCell.classList.contains('actions')) {
            cell.classList.add('lastEditableRow')
          }
        }
      })
    })
  }, [disabled, gridRef, rowsData.length, rowsHeader.length])
}
