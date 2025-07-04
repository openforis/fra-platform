import { useLayoutEffect } from 'react'

type Props = {
  gridRef: React.RefObject<HTMLElement>
  gridTemplateColumns: string
  hideGrid: boolean
  yAxisVariableCount: number
}

/**
 * Tracks the computed width of the first grid column and writes it to
 * `--first-col-width`, so the secondary Y-header (which is sticky)
 * can use that value for its `left` offset and stay aligned when scrolling.
 */
export const useTrackFirstColWidth = (props: Props) => {
  const { gridRef, gridTemplateColumns, hideGrid, yAxisVariableCount } = props

  useLayoutEffect(() => {
    if (hideGrid) return undefined
    if (yAxisVariableCount !== 2) return undefined

    const grid = gridRef.current
    if (!grid) return undefined

    const updateFirstColWidth = () => {
      const cols = getComputedStyle(grid).gridTemplateColumns.trim().split(/\s+/)
      const firstColWidth = cols[0] ?? '0px'
      grid.style.setProperty('--first-col-width', firstColWidth)
    }

    updateFirstColWidth()

    const gridRO = new ResizeObserver(updateFirstColWidth)
    gridRO.observe(grid)

    const firstCell = grid.querySelector<HTMLElement>('.firstCol')
    let cellRO: ResizeObserver | undefined
    if (firstCell) {
      cellRO = new ResizeObserver(updateFirstColWidth)
      cellRO.observe(firstCell)
    }

    return () => {
      gridRO.disconnect()
      cellRO?.disconnect()
    }
  }, [gridRef, gridTemplateColumns, hideGrid, yAxisVariableCount])
}
