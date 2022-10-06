import React from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentNames, SubSections } from '@meta/assessment'

import { useCycle } from '@client/store/assessment'
import DefinitionLink from '@client/components/DefinitionLink'

import ExtentOfForest from './ExtentOfForest/ExtentOfForest'
import ForestCharacteristics from './ForestCharacteristics/ForestCharacteristics'
import { Props } from './props'
import TitleWithExcelCalculator from './TitleExcelCalculator'

const Components: Record<string, Record<string, React.FC<Props>>> = {
  [AssessmentNames.fra]: {
    extentOfForest: ExtentOfForest,
    forestCharacteristics: ForestCharacteristics,
    biomassStock: TitleWithExcelCalculator,
    carbonStock: TitleWithExcelCalculator,
  },
}

const TitleDefault: React.FC<Props> = (props) => {
  const { assessmentName, subSection } = props
  const { i18n } = useTranslation()
  const prefix = assessmentName === AssessmentNames.panEuropean ? 'panEuropean.' : ''
  const sectionName = subSection.props.name

  return <h2 className="headline no-print">{i18n.t<string>(`${prefix}${sectionName}.${sectionName}`)}</h2>
}

const Title: React.FC<Props> = (props) => {
  const { assessmentName, subSection } = props

  const { i18n } = useTranslation()
  const cycle = useCycle()

  const fra = assessmentName === AssessmentNames.fra
  const sectionName = subSection.props.name
  const anchor = SubSections.getAnchor({ cycle, subSection })
  const Component = Components[assessmentName]?.[sectionName] || TitleDefault

  return (
    <>
      {React.createElement(Component, { assessmentName, subSection })}

      {fra && (
        <div className="app-view__section-toolbar no-print">
          <DefinitionLink
            className="margin-right-big"
            document="tad"
            anchor={anchor}
            title={i18n.t<string>('definition.definitionLabel')}
            lang={i18n.language}
          />
          <DefinitionLink
            className="align-left"
            document="faq"
            anchor={anchor}
            title={i18n.t<string>('definition.faqLabel')}
            lang={i18n.language}
          />
        </div>
      )}
    </>
  )
}
export default Title
