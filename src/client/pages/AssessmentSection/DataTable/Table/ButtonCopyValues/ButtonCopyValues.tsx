import './ButtonCopyValues.scss'
import React, { MutableRefObject, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Table, TableNames } from '@meta/assessment'

import { useUser } from '@client/store/user'
import { getData } from '@client/components/ButtonTableExport/utils'

type CopyValuesProps = {
  tableRef: MutableRefObject<HTMLTableElement>
  table: Table
}

// tableMappings is a mapping of table names to the variables that should be copied to clipboard
const tableMappings: Record<string, Array<string>> = {
  [TableNames.forestCharacteristics]: [
    'forestCharacteristics.naturalForestArea',
    'fra.forestCharacteristics.ofWhichPlantationForest',
    'fra.forestCharacteristics.plantationForestIntroducedArea2025',
    'fra.forestCharacteristics.ofWhichOtherPlantedForest',
  ],
  [TableNames.growingStockAvg]: [
    'growingStock.naturallyRegeneratingForest',
    'growingStock.plantedForest',
    'growingStock.plantationForest',
    'growingStock.otherPlantedForest',
  ],
}

const ButtonCopyValues: React.FC<CopyValuesProps> = (props: CopyValuesProps) => {
  const { tableRef, table } = props
  const user = useUser()
  const { t } = useTranslation()

  const showButton = Object.keys(tableMappings).includes(table.props.name)

  const _onClick = useCallback(() => {
    const _table = tableRef.current
    if (!_table) return
    const csv = getData(_table)
    const include = tableMappings[table.props.name].map((variableLabel) => t(variableLabel))
    const z = csv
      .filter((row: string) => {
        return include.some((translatedVariable) => row[0].includes(translatedVariable))
      })
      .map(([_, ...row]: string[]) => row)

    navigator.clipboard.writeText(z.map((row: Array<string>) => row.join('\t')).join('\n'))
  }, [t, table.props.name, tableRef])

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
