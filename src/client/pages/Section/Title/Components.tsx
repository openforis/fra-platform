import React from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentNames } from 'meta/assessment/assessment'
import { Labels } from 'meta/assessment/labels'

import { useCycle } from 'client/store/meta/hooks/cycles'
import ExtentOfForest from 'client/pages/Section/Title/ExtentOfForest'
import ForestCharacteristics from 'client/pages/Section/Title/ForestCharacteristics'
import TitleWithExcelCalculator from 'client/pages/Section/Title/TitleExcelCalculator'

import { Props } from './props'

export const Components: Record<string, Record<string, React.FC<Props>>> = {
  [AssessmentNames.fra]: {
    extentOfForest: ExtentOfForest,
    forestCharacteristics: ForestCharacteristics,
    biomassStock: TitleWithExcelCalculator,
    carbonStock: TitleWithExcelCalculator,
  },
}

export const TitleDefault: React.FC<Props> = (props) => {
  const { subSection } = props

  const cycle = useCycle()
  const { t } = useTranslation()

  return <h2 className="headline no-print">{Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })}</h2>
}
