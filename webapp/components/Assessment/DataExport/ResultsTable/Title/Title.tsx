import React, { Dispatch, SetStateAction } from 'react'

import { SectionSpecs, Unit, UnitFactors } from '@webapp/sectionSpec'
import { useAssessmentType } from '@webapp/store/app'
import { useDataExportSelection } from '@webapp/store/page/dataExport'
import { useI18n, useParamSection } from '@webapp/components/hooks'
import { getUnitLabelKey, getVariableLabelKey } from '@webapp/components/Assessment/DataExport/utils'

type Props = {
  baseUnit?: Unit
  onUnitChange: Dispatch<SetStateAction<Unit>>
  resultsLoading: boolean
}

const Title: React.FC<Props> = (props) => {
  const { baseUnit, resultsLoading, onUnitChange } = props
  const i18n = useI18n()
  const assessmentType = useAssessmentType()
  const assessmentSection = useParamSection()
  const selection = useDataExportSelection(assessmentSection)

  const tableSpec = SectionSpecs.getTableSpecExport(assessmentType, assessmentSection)
  const variables = tableSpec.rows.filter((row) => !!row.variableExport)
  const variable = variables.find((variable) => variable.variableExport === selection.variable)
  const { labelKey, labelParams, labelPrefixKey } = variable.cols[0]

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
              onUnitChange(event.target.value as Unit)
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
