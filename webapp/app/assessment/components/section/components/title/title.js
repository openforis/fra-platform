import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import * as FRA from '@common/assessment/fra'

import ExtentOfForest from '@webapp/app/assessment/components/section/components/title/extentOfForest'
import useI18n from '@webapp/components/hooks/useI18n'

const components = {
  [FRA.type]: {
    [FRA.sections['1'].children.a.name]: ExtentOfForest,
  },
}

const TitleDefault = props => {
  const { sectionName } = props
  const i18n = useI18n()

  return <h2 className="headline no-print">{i18n.t(`${sectionName}.${sectionName}`)}</h2>
}

TitleDefault.propTypes = {
  sectionName: PropTypes.string.isRequired,
}

const Title = props => {
  const { assessmentType, sectionName } = props
  const component = R.pathOr(TitleDefault, [assessmentType, sectionName])(components)

  if (!component) {
    return null
  }

  return React.createElement(component, { assessmentType, sectionName })
}

Title.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
}

export default Title
