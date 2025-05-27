import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Objects } from 'utils/objects'

import { Cols } from 'meta/assessment/cols'
import { Row } from 'meta/assessment/row'
import { Unit } from 'meta/assessment/unit'
import { UnitFactors } from 'meta/dataExport'

import { useCycle } from 'client/store/meta/assessment/hooks/cycles'
import { useTableSections } from 'client/store/metadata'
import { getUnitLabelKey } from 'client/pages/DataExport/utils'

type Props = {
  baseUnit?: Unit
  onUnitChange: (value: Unit, variable: string) => void
  resultsLoading: boolean
  variable: string
}

const Title: React.FC<Props> = (props) => {
  const { baseUnit = Unit.haThousand, onUnitChange, resultsLoading, variable } = props

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

  if (resultsLoading) {
    return <div>{t('description.loading')}</div>
  }

  return (
    <>
      <span>{labelVariable}</span>
      {Object.keys(UnitFactors).includes(baseUnit) ? (
        <>
          <span> (</span>
          <select
            className="select-s"
            defaultValue={baseUnit}
            onChange={(event) => {
              onUnitChange(event.target.value as Unit, variable)
            }}
          >
            <option value={baseUnit}>{t(getUnitLabelKey(baseUnit))}</option>

            {Object.keys(UnitFactors[baseUnit]).map(
              (unit) =>
                unit !== baseUnit && (
                  <option key={unit} value={unit}>
                    {t(getUnitLabelKey(unit))}
                  </option>
                )
            )}
          </select>
          <span>)</span>
        </>
      ) : (
        <span>{baseUnit ? ` (${t(`unit.${baseUnit}`)})` : ''}</span>
      )}
    </>
  )
}

export default Title
