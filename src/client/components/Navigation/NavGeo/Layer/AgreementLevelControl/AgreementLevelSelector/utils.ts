import { CSSProperties } from 'react'

export const getLevelStyle = (
  level: number,
  eligiblePalette: Array<string>,
  currentSelectedLevel: number
): CSSProperties => {
  const style: CSSProperties = {}

  style.backgroundColor = eligiblePalette[level - 1]

  if (level === currentSelectedLevel) {
    style.boxShadow = `0px 0px 3px 3px ${style.backgroundColor}30`
  }
  return style
}
