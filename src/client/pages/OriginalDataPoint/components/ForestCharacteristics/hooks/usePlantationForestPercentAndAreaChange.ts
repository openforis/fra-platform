import { useMemo } from 'react'

import BigNumber from 'bignumber.js'
import * as Diff from 'diff'
import { Change } from 'diff'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPs } from 'meta/assessment/odps'

import { useLastApprovedOriginalDataPoint } from 'client/store/data/history/hooks/lastApprovedOriginalDataPoint'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'

type Props = {
  forestPlantationIntroducedPercent: string | null
  nationalClassIndex: number
  plantationIntroducedArea: BigNumber | null
}

type Returned = {
  forestPlantationIntroducedPercent: Array<Change>
  plantationIntroducedArea: Array<Change>
}

export const usePlantationForestPercentAndAreaChange = (props: Props): Returned => {
  const {
    forestPlantationIntroducedPercent: forestPlantationIntroducedPercentCurrent,
    nationalClassIndex,
    plantationIntroducedArea: plantationIntroducedAreaCurrent,
  } = props

  const originalDataPointHistory = useLastApprovedOriginalDataPoint()
  const displayHistory = useODPDisplayHistory()
  const nationalClass = originalDataPointHistory?.nationalClasses?.[nationalClassIndex]

  return useMemo<Returned>(() => {
    if (!displayHistory) return undefined

    const canCalculate = !Objects.isEmpty(nationalClass)

    const forestPlantationIntroducedPercentPrev = canCalculate ? nationalClass.forestPlantationIntroducedPercent : null
    const formattedForestPlantationIntroducedPercentPrev = Numbers.format(forestPlantationIntroducedPercentPrev, 3)

    const formattedForestPlantationIntroducedPercentCurrent = Numbers.format(
      forestPlantationIntroducedPercentCurrent,
      3
    )

    const forestPlantationIntroducedPercent = Diff.diffLines(
      formattedForestPlantationIntroducedPercentPrev ?? '',
      formattedForestPlantationIntroducedPercentCurrent ?? ''
    )

    const plantationIntroducedAreaPrev = canCalculate
      ? ODPs.calculateNationalClassPlantationForestPercentArea(nationalClass)
      : null
    const formattedPlantationIntroducedAreaPrev = Numbers.format(plantationIntroducedAreaPrev)

    const formattedPlantationIntroducedAreaCurrent = Numbers.format(plantationIntroducedAreaCurrent)

    const plantationIntroducedArea = Diff.diffLines(
      formattedPlantationIntroducedAreaPrev ?? '',
      formattedPlantationIntroducedAreaCurrent ?? ''
    )

    return {
      forestPlantationIntroducedPercent,
      plantationIntroducedArea,
    }
  }, [displayHistory, forestPlantationIntroducedPercentCurrent, nationalClass, plantationIntroducedAreaCurrent])
}
