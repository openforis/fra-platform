import React from 'react'

import { AssessmentType, FRA } from '@core/assessment'
import { useI18n } from '@webapp/hooks'

import DefinitionLink from '@webapp/components/definitionLink'
import ExtentOfForest from './ExtentOfForest/ExtentOfForest'
import ForestCharacteristics from './ForestCharacteristics/ForestCharacteristics'
import TitleWithExcelCalculator from './TitleExcelCalculator'
import { Props } from './props'

const Components: Record<string, Record<string, React.FC<Props>>> = {
  [FRA.type]: {
    [FRA.sections['1'].children.a.name]: ExtentOfForest,
    [FRA.sections['1'].children.b.name]: ForestCharacteristics,
    [FRA.sections['2'].children.c.name]: TitleWithExcelCalculator,
    [FRA.sections['2'].children.d.name]: TitleWithExcelCalculator,
  },
}

const TitleDefault: React.FC<Props> = (props) => {
  const { assessmentType, sectionName } = props

  const i18n = useI18n()
  const prefix = assessmentType === AssessmentType.panEuropean ? 'panEuropean.' : ''

  return <h2 className="headline no-print">{i18n.t(`${prefix}${sectionName}.${sectionName}`)}</h2>
}

const Title: React.FC<Props> = (props) => {
  const { assessmentType, sectionName, sectionAnchor } = props

  const i18n = useI18n()
  const panEuropean = assessmentType === AssessmentType.panEuropean

  const Component = Components[assessmentType]?.[sectionName] || TitleDefault

  return (
    <>
      {React.createElement(Component, { assessmentType, sectionAnchor, sectionName })}

      {!panEuropean && (
        <div className="app-view__section-toolbar no-print">
          <DefinitionLink
            className="margin-right-big"
            document="tad"
            anchor={sectionAnchor}
            title={i18n.t('definition.definitionLabel')}
            lang={i18n.language}
          />
          <DefinitionLink
            className="align-left"
            document="faq"
            anchor={sectionAnchor}
            title={i18n.t('definition.faqLabel')}
            lang={i18n.language}
          />
        </div>
      )}
    </>
  )
}
export default Title
