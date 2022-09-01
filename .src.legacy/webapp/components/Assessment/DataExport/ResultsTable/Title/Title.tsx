import React from 'react'

import { RowSpec, SectionSpecs, Unit, UnitFactors } from '@webapp/sectionSpec'
import { useAssessmentType } from '@webapp/store/app'
import { useI18n, useParamSection } from '@webapp/hooks'
import { getUnitLabelKey, getVariableLabelKey } from '@webapp/components/Assessment/DataExport/utils'

type Props = {
  baseUnit?: Unit
  onUnitChange: (value: Unit, variable: string) => void
  resultsLoading: boolean
  variable: string
}

const Title: React.FC<Props> = (props) => {
  const { baseUnit, resultsLoading, onUnitChange, variable } = props
  const i18n = useI18n()
  const assessmentType = useAssessmentType()
  const assessmentSection = useParamSection()

  const tableSpec = SectionSpecs.getTableSpecExport(assessmentType, assessmentSection)
  const rowSpecs = tableSpec.rows.filter((row: RowSpec) => !!row.variableExport)
  const rowSpecVariable = rowSpecs.find((_variable) => _variable.variableExport === variable)
  const { labelKey, labelParams, labelPrefixKey } = rowSpecVariable.cols[0]

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

export default Title
