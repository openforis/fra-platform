import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { TableNames } from 'meta/assessment/table'

import { useUser } from 'client/store/user/hooks/user'
import { useCycleRouteParams } from 'client/hooks/routeParams'
import { getDataGridData } from 'client/components/DataGrid/utils'
import { CopyValuesProps } from 'client/pages/Section/DataTable/Table/ButtonCopyValues/types'

// Cycle -> Table name -> Variables to be coppied to clipboard
const tableMappings: Record<string, Record<string, Array<string>>> = {
  '2020': {
    [TableNames.forestCharacteristics]: [
      'forestCharacteristics.naturalForestArea',
      'forestCharacteristics.plantationForestArea',
      'forestCharacteristics.plantationForestIntroducedArea',
      'forestCharacteristics.otherPlantedForestArea',
    ],
    [TableNames.growingStockAvg]: [
      'growingStock.naturallyRegeneratingForest',
      'growingStock.plantedForest',
      'growingStock.plantationForest',
      'growingStock.otherPlantedForest',
    ],
  },
  '2025': {
    [TableNames.forestCharacteristics]: [
      'fra.forestCharacteristics.naturalForestArea2025',
      'fra.growingStock.plantationForest2025',
      'fra.forestCharacteristics.plantationForestIntroducedArea2025',
      'fra.forestCharacteristics.ofWhichOtherPlantedForest',
    ],
    [TableNames.growingStockAvg]: [
      'fra.growingStock.naturallyRegeneratingForest2025',
      'fra.growingStock.plantedForest2025',
      'fra.growingStock.plantationForest2025',
      'fra.growingStock.otherPlantedForest2025',
    ],
  },
}

const yearsToCopy = [1990, 2000, 2010, 2015, 2020, 2025]

type Returned = {
  onClick: () => void
  showButton: boolean
}

export const useCopyValues = (props: CopyValuesProps): Returned => {
  const { gridRef, table } = props

  const { t } = useTranslation()
  const { cycleName } = useCycleRouteParams()
  const user = useUser()

  const cycleTableMappings = tableMappings[cycleName]

  const isTableIncluded = useMemo<boolean>(
    () => Object.keys(cycleTableMappings ?? {}).includes(table.props.name),
    [cycleTableMappings, table.props.name]
  )

  const onClick = useCallback<Returned['onClick']>(() => {
    if (!isTableIncluded) return

    const grid = gridRef.current
    if (!grid) return

    const csv = getDataGridData(grid)
    const variablesToCopy = cycleTableMappings[table.props.name].map((variableLabel) => t(variableLabel))
    const columnIndexesToCopy = yearsToCopy.map((year) => csv[1].indexOf(year.toString()))

    const z = csv.reduce((acc: Array<Array<string>>, row: Array<string>) => {
      const shouldIncludeRow = variablesToCopy.some((translatedVariable) => row[0].includes(translatedVariable))
      if (shouldIncludeRow) {
        const filteredRow = row.filter((_, i) => columnIndexesToCopy.includes(i))
        acc.push(filteredRow)
      }
      return acc
    }, [])

    navigator.clipboard.writeText(z.map((row: Array<string>) => row.join('\t')).join('\n'))
  }, [cycleTableMappings, gridRef, isTableIncluded, t, table.props.name])

  return {
    onClick,
    showButton: isTableIncluded && !Objects.isEmpty(user),
  }
}
