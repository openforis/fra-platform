import './ButtonCopyValues.scss'
import React, { MutableRefObject, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Table, TableNames } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { getData } from 'client/components/ButtonTableExport/utils'

type CopyValuesProps = {
  tableRef: MutableRefObject<HTMLTableElement>
  table: Table
}

// tableMappings is a mapping of table names to the variables that should be copied to clipboard
const tableMappings2020: Record<string, Array<string>> = {
  [TableNames.forestCharacteristics]: [
    'forestCharacteristics.naturalForestArea',
    'forestCharacteristics.plantationForestArea',
    'forestCharacteristics.plantationForestIntroducedArea',
    'forestCharacteristics.otherPlantedForestArea',
  ],
  [TableNames.growingStockAvg]: [
    'growingStock.naturallyRegeneratingForest',
    'growingStock.naturallyRegeneratingForest',
    'growingStock.plantationForest',
    'growingStock.otherPlantedForest',
  ],
}

const tableMappings2025: Record<string, Array<string>> = {
  [TableNames.forestCharacteristics]: [
    'fra.forestCharacteristics.naturalForestArea2025',
    'fra.forestCharacteristics.ofWhichPlantationForest',
    'fra.forestCharacteristics.plantationForestIntroducedArea2025',
    'fra.forestCharacteristics.ofWhichOtherPlantedForest',
  ],
  [TableNames.growingStockAvg]: [
    'fra.growingStock.naturallyRegeneratingForest2025',
    'fra.growingStock.plantedForest2025',
    'fra.growingStock.plantationForest2025',
    'fra.growingStock.otherPlantedForest2025',
  ],
}

const colMapping = [1990, 2000, 2010, 2015, 2020, 2025]

const ButtonCopyValues: React.FC<CopyValuesProps> = (props: CopyValuesProps) => {
  const { tableRef, table } = props
  const cycle = useCycle()
  const user = useUser()
  const { t } = useTranslation()

  const tableMappings = cycle.name === '2025' ? tableMappings2025 : tableMappings2020

  const showButton = Object.keys(tableMappings).includes(table.props.name)

  const _onClick = useCallback(() => {
    const _table = tableRef.current
    if (!_table) return
    const csv = getData(_table)
    const include = tableMappings[table.props.name].map((variableLabel) => t(variableLabel))
    // A list of indexes of the table columns that should be copied to clipboard
    const correctIndexes = colMapping.map((year) => csv[1].indexOf(year.toString()))
    const z = csv
      .filter((row: string) => {
        return include.some((translatedVariable) => row[0].includes(translatedVariable))
      })
      .map((row: string[]) => {
        return row.filter((_, i) => correctIndexes.includes(i))
      })

    navigator.clipboard.writeText(z.map((row: Array<string>) => row.join('\t')).join('\n'))
  }, [t, table.props.name, tableMappings, tableRef])

  // Hide button if incorrect table or user is not logged in
  if (!user || !showButton) return null

  return (
    <button
      type="button"
      onClick={_onClick}
      className="fra-table__btn-export btn-xs btn-primary no-print btn-copy-values"
    >
      {t('tableWithOdp.copyToClipboard')}
    </button>
  )
}

export default ButtonCopyValues
