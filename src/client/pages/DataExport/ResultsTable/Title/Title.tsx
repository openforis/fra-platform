import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Objects } from 'utils/objects'

import { Cols } from 'meta/assessment/cols'
import { Row } from 'meta/assessment/row'
import { UnitFactors } from 'meta/dataExport/unitFactor'
import { UnitName } from 'meta/measurement/unitName'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useTableSections } from 'client/store/meta/hooks/tableSections'
import Select, { Option } from 'client/components/Inputs/Select'
import { getUnitLabelKey } from 'client/pages/DataExport/utils'

type Props = {
  baseUnit?: UnitName
  onUnitChange: (value: UnitName, variable: string) => void
  resultsLoading: boolean
  unit: UnitName
  variable: string
}

const Title: React.FC<Props> = (props) => {
  const { baseUnit = UnitName.haThousand, onUnitChange, resultsLoading, unit, variable } = props

  const { t } = useTranslation()
  const { sectionName } = useParams<{ sectionName: string }>()
  const cycle = useCycle()
  const tableSections = useTableSections({ sectionName })

  if (!tableSections || Objects.isEmpty(tableSections)) return null

  const { tables } = tableSections.find((tableSection) => tableSection.tables.find((table) => table.props.dataExport))
  const tableSpec = tables[0]

  const rowSpecs = tableSpec.rows.filter((row: Row) => !!row.props.variableName)
  const rowSpecVariable = rowSpecs.find((row: Row) => row.props.variableName === variable)
  const labelVariable = Cols.getLabel({ cycle, col: rowSpecVariable.cols[0], t })

  const options = Object.keys(UnitFactors[baseUnit] ?? {}).reduce<Array<Option>>(
    (acc, unit) => {
      if (unit !== baseUnit) {
        acc.push({ label: t(getUnitLabelKey(unit)), value: unit })
      }
      return acc
    },
    [{ label: t(getUnitLabelKey(baseUnit)), value: baseUnit }]
  )

  if (resultsLoading) {
    return <div>{t('description.loading')}</div>
  }

  return (
    <div className="results-table__title">
      <span>{labelVariable}</span>
      {Object.keys(UnitFactors).includes(baseUnit) ? (
        <>
          <span> (</span>
          <Select
            isClearable={false}
            onChange={(value: UnitName): void => {
              onUnitChange(value, variable)
            }}
            options={options}
            value={unit}
          />
          <span>)</span>
        </>
      ) : (
        <span>{baseUnit ? ` (${t(`unit.${baseUnit}`)})` : ''}</span>
      )}
    </div>
  )
}

export default Title
