import { CSSProperties, useMemo } from 'react'

import { Trend } from 'client/pages/Section/DataTable/Chart/types'

type Props = {
  trend: Trend
}

const hexToRgba = (hex: string, alpha: number): string => {
  const hexEscape = hex.replace('#', '')
  const r = parseInt(hexEscape.substring(0, 2), 16)
  const g = parseInt(hexEscape.substring(2, 4), 16)
  const b = parseInt(hexEscape.substring(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

export const useStyle = (props: Props): CSSProperties => {
  const { trend } = props
  const { color } = trend

  return useMemo<CSSProperties>(() => {
    return {
      fill: 'none',
      // opacity: 0,
      shapeRendering: 'geometricPrecision',
      stroke: hexToRgba(color, 0.5),
      strokeWidth: 2,
    }
  }, [color])
}
