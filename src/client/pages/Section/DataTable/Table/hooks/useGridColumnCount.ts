import { MutableRefObject } from 'react'

type Props = {
  gridRef: MutableRefObject<HTMLDivElement>
}

export const useGridColumnCount = (props: Props): number => {
  const { gridRef } = props
  if (!gridRef?.current) return 0

  const gridStyle = getComputedStyle(gridRef?.current)
  const columnCount = gridStyle.getPropertyValue('grid-template-columns').split(' ').length

  return columnCount
}
