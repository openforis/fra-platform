import React from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import Description from '@webapp/components/description/description'
import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'

const dataSourcesEditorTemplate = (i18n) =>
  `<strong>${i18n.t('description.dataSources')}</strong>
  <p></p>
  <strong>${i18n.t('description.originalData')}</strong>
  <p></p>
  <strong>${i18n.t('description.nationalClassificationAndDefinitions')}</strong>
  <p></p>`

const DataSourceDescriptionAndComments = props => {
  const { section } = props
  const openCommentThreadTarget = useSelector(ReviewState.getOpenThreadTarget)
  const countryIso = useCountryIso();
  const i18n = useI18n();

  const dataSources = 'dataSources'
  const dataSourcesTarget = [dataSources] // ?
  const generalComments = 'generalComments'
  const generalCommentsTarget = [generalComments]

  return <div className="fra-description__container">
    <div className="fra-description">
      <div className={
        R.equals(openCommentThreadTarget, dataSourcesTarget)
          ? 'fra-description__wrapper fra-row-comments__open'
          : 'fra-description__wrapper'
      }>
        <Description
          title={i18n.t('description.dataSourcesTitle')}
          section={section}
          name={dataSources}
          template={dataSourcesEditorTemplate(i18n)} />
      </div>
      <div className="fra-description__review-indicator-wrapper">
        <ReviewIndicator
          section={section}
          title={i18n.t('description.dataSourcesTitle')}
          target={dataSourcesTarget}
          countryIso={countryIso}/>
      </div>
    </div>
    <div className="fra-description">
      <div className={
        R.equals(openCommentThreadTarget, generalCommentsTarget)
          ? 'fra-description__wrapper fra-row-comments__open'
          : 'fra-description__wrapper'
      }>
        <Description
          title={i18n.t('description.generalCommentsTitle')}
          section={section}
          name={generalComments}/>
      </div>
      <div className="fra-description__review-indicator-wrapper">
        <ReviewIndicator
          section={section}
          title={i18n.t('description.generalCommentsTitle')}
          target={generalCommentsTarget}
          countryIso={countryIso}/>
      </div>
    </div>
  </div>
}

DataSourceDescriptionAndComments.propTypes = {
  name: PropTypes.any.isRequired,
  section: PropTypes.any.isRequired,
}

export default DataSourceDescriptionAndComments
