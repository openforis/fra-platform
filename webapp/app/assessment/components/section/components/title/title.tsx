import React from 'react'
import * as R from 'ramda'
import FRA from '@common/assessment/fra'
import DefinitionLink from '@webapp/components/definitionLink'
import useI18n from '@webapp/components/hooks/useI18n'
import { isTypePanEuropean } from '@common/assessment/assessment'
import ExtentOfForest from './extentOfForest'
import ForestCharacteristics from './forestCharacteristics'
import TitleWithExcelCalculator from './titleWithExcelCalculator'

const Components: any = {
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
  const component: any = R.pipe(
    R.path([assessmentType, sectionName]),
    R.defaultTo(() => (
      <h2 className="headline no-print">{(i18n as any).t(`${prefix}${sectionName}.${sectionName}`)}</h2>
    ))
  )(Components)
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
