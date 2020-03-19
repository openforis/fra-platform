import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import * as FRA from '@common/assessment/fra'

import DefinitionLink from '@webapp/components/definitionLink'
import ExtentOfForest from '@webapp/app/assessment/components/section/components/title/extentOfForest'
import TitleWithExcelCalculator from '@webapp/app/assessment/components/section/components/title/titleWithExcelCalculator'
import useI18n from '@webapp/components/hooks/useI18n'

const components = {
  [FRA.type]: {
    [FRA.sections['1'].children.a.name]: ExtentOfForest,
    [FRA.sections['2'].children.c.name]: TitleWithExcelCalculator,
  },
}

const Title = props => {
  const i18n = useI18n()
  const { assessmentType, sectionName, sectionAnchor } = props
  const component = R.pipe(
    R.path([assessmentType, sectionName]),
    R.defaultTo(() => <h2 className="headline no-print">{i18n.t(`${sectionName}.${sectionName}`)}</h2>)
  )(components)

  return (
    <>
      {React.createElement(component, { assessmentType, sectionName })}

      <div className="app-view__section-toolbar">
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
    </>
  )
}

Title.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  sectionAnchor: PropTypes.string.isRequired,
}

export default Title
