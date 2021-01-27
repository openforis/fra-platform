import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'
import DefinitionLink from '@webapp/components/definitionLink'
import useI18n from '@webapp/components/hooks/useI18n'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { isTypePanEuropean } from '@common/assessment/assessment'
import ExtentOfForest from './extentOfForest'
import ForestCharacteristics from './forestCharacteristics'
import TitleWithExcelCalculator from './titleWithExcelCalculator'

const components = {
  [FRA.type]: {
    [FRA.sections['1'].children.a.name]: ExtentOfForest,
    [FRA.sections['1'].children.b.name]: ForestCharacteristics,
    [FRA.sections['2'].children.c.name]: TitleWithExcelCalculator,
    [FRA.sections['2'].children.d.name]: TitleWithExcelCalculator,
  },
}
type Props = {
  assessmentType: string
  sectionName: string
  sectionAnchor: string
}
const Title = (props: Props) => {
  const i18n = useI18n()
  const { assessmentType, sectionName, sectionAnchor } = props
  const prefix = isTypePanEuropean(assessmentType) ? 'panEuropean.' : ''
  const component = R.pipe(
    R.path([assessmentType, sectionName]),
    R.defaultTo(() => (
      <h2 className="headline no-print">{(i18n as any).t(`${prefix}${sectionName}.${sectionName}`)}</h2>
    ))
  )(components)
  return (
    <>
      {React.createElement(component, { assessmentType, sectionName })}

      {!isTypePanEuropean(assessmentType) && (
        <div className="app-view__section-toolbar no-print">
          <DefinitionLink
            className="margin-right-big"
            document="tad"
            anchor={sectionAnchor}
            title={(i18n as any).t('definition.definitionLabel')}
            lang={(i18n as any).language}
          />
          <DefinitionLink
            className="align-left"
            document="faq"
            anchor={sectionAnchor}
            title={(i18n as any).t('definition.faqLabel')}
            lang={(i18n as any).language}
          />
        </div>
      )}
    </>
  )
}
export default Title
