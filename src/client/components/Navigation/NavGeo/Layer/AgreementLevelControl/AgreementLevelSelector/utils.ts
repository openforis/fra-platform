import { CSSProperties } from 'react'

export const getLevelStyle = (
  level: number,
  eligiblePalette: Array<string>,
  currentSelectedLevel: number
  // selectedLayersCoun?: number
): CSSProperties => {
  // const levelOffset = level - currentSelectedLevel

  // Checks if the level is selectable, strictly above current selected, and within range
  // const isLevelSelectableAbove =
  //   levelOffset >= 0 && level <= selectedLayersCount && levelOffset < eligiblePalette.length

  const style: CSSProperties = {}

  // if (isLevelSelectableAbove && eligiblePalette) {
  style.backgroundColor = eligiblePalette[level - 1]
  // }
  if (level === currentSelectedLevel) {
    style.boxShadow = `0px 0px 3px 3px ${style.backgroundColor}30`
  }
  return style
}
