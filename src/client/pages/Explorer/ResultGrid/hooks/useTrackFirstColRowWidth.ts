import { useLayoutEffect } from 'react'

import { AxisSelection } from 'meta/explorer/selection'

type Props = {
  gridRef: React.RefObject<HTMLElement>
  gridTemplateColumns: string
  hideGrid: boolean
  xAxisSelection: AxisSelection['x']
  yAxisSelection: AxisSelection['y']
}

/**
 * Tracks the computed width of the first grid column and
 * the computed height of the first grid row, writing them to
 * `--first-col-width` and `--first-row-height` respectively.
 */
export const useTrackFirstColRowWidth = (props: Props) => {
  const { gridRef, gridTemplateColumns, hideGrid, xAxisSelection, yAxisSelection } = props

  useLayoutEffect(() => {
    if (hideGrid) return undefined

    const grid = gridRef.current
    if (!grid) return undefined

    const updateFirstDims = () => {
      const style = getComputedStyle(grid)

      // first column width
      const cols = style.gridTemplateColumns.trim().split(/\s+/)
      const firstColWidth = cols[0] ?? '0px'
      grid.style.setProperty('--first-col-width', firstColWidth)

      // first row height
      const rows = style.gridTemplateRows.trim().split(/\s+/)
      const firstRowHeight = rows[0] ?? '0px'
      grid.style.setProperty('--first-row-height', firstRowHeight)
    }

    updateFirstDims()

    const gridRO = new ResizeObserver(updateFirstDims)
    gridRO.observe(grid)

    const firstColCell = grid.querySelector<HTMLElement>('.firstCol')
    let cellRO: ResizeObserver | undefined
    if (firstColCell) {
      cellRO = new ResizeObserver(updateFirstDims)
      cellRO.observe(firstColCell)
    }

    const firstRowCell = grid.querySelector<HTMLElement>('.primary-x-header')
    let rowObserver: ResizeObserver | undefined
    if (firstRowCell) {
      rowObserver = new ResizeObserver(() => {
        grid.style.setProperty('--first-row-height', `${firstRowCell.offsetHeight}px`)
      })
      rowObserver.observe(firstRowCell)
    }

    return () => {
      gridRO.disconnect()
      cellRO?.disconnect()
      rowObserver?.disconnect()
    }
  }, [gridRef, gridTemplateColumns, hideGrid, xAxisSelection, yAxisSelection])
}
