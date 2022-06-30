import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Objects } from '@core/utils'

import { Row } from '@meta/assessment'
import { Unit, UnitFactors } from '@meta/dataExport'

import { useTableSections } from '@client/store/pages/assessmentSection'
import { getUnitLabelKey, getVariableLabelKey } from '@client/pages/DataExport/utils'

type Props = {
  baseUnit?: Unit
  onUnitChange: (value: Unit, variable: string) => void
  resultsLoading: boolean
  variable: string
}

const Title: React.FC<Props> = (props) => {
  const { baseUnit, resultsLoading, onUnitChange, variable } = props
  const i18n = useTranslation()
  const { section: assessmentSection } = useParams<{
    section: string
  }>()

  const tableSections = useTableSections({ sectionName: assessmentSection })
  if (!tableSections) return null
  if (Objects.isEmpty(tableSections)) return null
  const { tables } = tableSections.find((tableSection) => tableSection.tables.find((table) => table.props.dataExport))
  const tableSpec = tables[0]

  const rowSpecs = tableSpec.rows.filter((row: Row) => !!row.props.variableName)
  const rowSpecVariable = rowSpecs.find((row: Row) => row.props.variableName === variable)

  const { key: labelKey, params: labelParams, prefixKey: labelPrefixKey } = rowSpecVariable.cols[0].props.label

  if (resultsLoading) {
    return <div>{i18n.t('description.loading')}</div>
  }

  return (
    <>
      <span>
        {labelPrefixKey && `${i18n.t(labelPrefixKey)} `}
        {i18n.t(getVariableLabelKey(labelKey), labelParams)}
      </span>
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
            <option value={baseUnit}>{i18n.t(getUnitLabelKey(baseUnit))}</option>

            {Object.keys(UnitFactors[baseUnit]).map(
              (unit) =>
                unit !== baseUnit && (
                  <option key={unit} value={unit}>
                    {i18n.t(getUnitLabelKey(unit))}
                  </option>
                )
            )}
          </select>
          <span>)</span>
        </>
      ) : (
        <span>{baseUnit ? ` (${i18n.t(`unit.${baseUnit}`)})` : ''}</span>
      )}
    </>
  )
}

Title.defaultProps = {
  baseUnit: Unit.haThousand,
}

export default Title
