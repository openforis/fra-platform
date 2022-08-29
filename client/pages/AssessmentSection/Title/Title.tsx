import React from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentName, AssessmentNames } from '@meta/assessment'

import DefinitionLink from '@client/components/DefinitionLink'

import ExtentOfForest from './ExtentOfForest/ExtentOfForest'
import ForestCharacteristics from './ForestCharacteristics/ForestCharacteristics'
import TitleWithExcelCalculator from './TitleExcelCalculator'

const Components: Record<string, Record<string, React.FC<Props>>> = {
  // TODO handle this?
  [AssessmentNames.fra]: {
    /* Handle these better? */ extentOfForest: ExtentOfForest,
    forestCharacteristics: ForestCharacteristics,
    biomassStock: TitleWithExcelCalculator,
    carbonStock: TitleWithExcelCalculator,
  },
}

export type Props = {
  assessmentName: AssessmentName
  sectionName: string
  sectionAnchor: string
}

const TitleDefault: React.FC<Omit<Props, 'sectionAnchor'>> = (props) => {
  const { assessmentName, sectionName } = props

  const { i18n } = useTranslation()
  const prefix = assessmentName === AssessmentNames.panEuropean ? 'panEuropean.' : ''

  return <h2 className="headline no-print">{i18n.t<string>(`${prefix}${sectionName}.${sectionName}`)}</h2>
}

const Title: React.FC<Props> = (props) => {
  const { assessmentName, sectionName, sectionAnchor } = props

  const { i18n } = useTranslation()
  const panEuropean = assessmentName === AssessmentNames.panEuropean

  const Component = Components[assessmentName]?.[sectionName] || TitleDefault

  return (
    <>
      {React.createElement(Component, { assessmentName, sectionName })}

      {!panEuropean && (
        <div className="app-view__section-toolbar no-print">
          <DefinitionLink
            className="margin-right-big"
            document="tad"
            anchor={sectionAnchor}
            title={i18n.t<string>('definition.definitionLabel')}
            lang={i18n.language}
          />
          <DefinitionLink
            className="align-left"
            document="faq"
            anchor={sectionAnchor}
            title={i18n.t<string>('definition.faqLabel')}
            lang={i18n.language}
          />
        </div>
      )}
    </>
  )
}
export default Title
