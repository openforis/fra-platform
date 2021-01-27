import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import * as FRA from '@common/assessment/fra'

import DefinitionLink from '@webapp/components/definitionLink'
import useI18n from '@webapp/components/hooks/useI18n'

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

const Title = (props) => {
  const i18n = useI18n()
  const { assessmentType, sectionName, sectionAnchor } = props
  const prefix = isTypePanEuropean(assessmentType) ? 'panEuropean.' : ''

  const component = R.pipe(
    R.path([assessmentType, sectionName]),
    R.defaultTo(() => <h2 className="headline no-print">{i18n.t(`${prefix}${sectionName}.${sectionName}`)}</h2>)
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

Title.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  sectionAnchor: PropTypes.string.isRequired,
}

export default Title
