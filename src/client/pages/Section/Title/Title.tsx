import React from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentNames, Labels, SubSections } from 'meta/assessment'

import { useAssessment, useCycle } from 'client/store/assessment'
import DefinitionLink from 'client/components/DefinitionLink'

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
  const { subSection } = props

  const cycle = useCycle()
  const { t } = useTranslation()

  return <h2 className="headline no-print">{Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })}</h2>
}

const Title: React.FC<Props> = (props) => {
  const { subSection } = props

  const assessment = useAssessment()
  const { i18n, t } = useTranslation()
  const cycle = useCycle()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const fra = assessmentName === AssessmentNames.fra
  const panEu = assessmentName === AssessmentNames.panEuropean
  const secondDoc = fra ? 'faq' : 'rn'
  const secondLabel = fra ? 'definition.faqLabel' : 'definition.seeReportingNotes'
  const sectionName = subSection.props.name
  const anchor = SubSections.getAnchor({ cycle, subSection })
  const Component = Components[assessmentName]?.[sectionName] || TitleDefault

  return (
    <>
      {React.createElement(Component, { subSection })}

      {(fra || (panEu && cycleName === '2025')) && (
        <div className="app-view__section-toolbar no-print">
          <DefinitionLink
            assessmentName={assessmentName}
            cycleName={cycleName}
            className="margin-right-big"
            document="tad"
            anchor={anchor}
            title={t('definition.definitionLabel')}
            lang={i18n.resolvedLanguage}
          />
          <DefinitionLink
            assessmentName={assessmentName}
            cycleName={cycleName}
            className="align-left"
            document={secondDoc}
            anchor={anchor}
            title={t(secondLabel)}
            lang={i18n.resolvedLanguage}
          />
        </div>
      )}
    </>
  )
}
export default Title
