import React from 'react'
import * as R from 'ramda'
import assert from 'assert'
import { connect } from 'react-redux'
import ReviewIndicator from '../review/reviewIndicator'
import Description from '../description/description'

const assertProps = props =>
  assert(
    props.name &&
    props.countryIso &&
    props.section,
    'Some property is missing for DataSourceDescriptionAndComments'
  )

const dataSourcesEditorTemplate = (i18n) =>
  `<strong>${i18n.t('description.dataSources')}</strong>
  <p></p>
  <strong>${i18n.t('description.originalData')}</strong>
  <p></p>
  <strong>${i18n.t('description.nationalClassificationAndDefinitions')}</strong>
  <p></p>`

class CommentableReviewDescriptions extends React.Component {
  render() {
    const dataSources = 'dataSources'
    const dataSourcesTarget = [dataSources]
    const generalComments = 'generalComments'
    const generalCommentsTarget = [generalComments]
    assertProps(this.props)

    return <div className="fra-description__container">
      <div className="fra-description">
        <div className={
          R.equals(this.props.openCommentThreadTarget, dataSourcesTarget)
            ? 'fra-description__wrapper fra-row-comments__open'
            : 'fra-description__wrapper'
        }>
          <Description
            title={this.props.i18n.t('description.dataSourcesTitle')}
            section={this.props.section}
            name={dataSources}
            template={dataSourcesEditorTemplate(this.props.i18n)}
            countryIso={this.props.countryIso}/>
        </div>
        <div className="fra-description__review-indicator-wrapper">
          <ReviewIndicator
            section={this.props.section}
            title={this.props.i18n.t('description.dataSourcesTitle')}
            target={dataSourcesTarget}
            countryIso={this.props.countryIso}/>
        </div>
      </div>
      <div className="fra-description">
        <div className={
          R.equals(this.props.openCommentThreadTarget, generalCommentsTarget)
            ? 'fra-description__wrapper fra-row-comments__open'
            : 'fra-description__wrapper'
        }>
          <Description
            title={this.props.i18n.t('description.generalCommentsTitle')}
            section={this.props.section}
            name={generalComments}
            countryIso={this.props.countryIso}/>
        </div>
        <div className="fra-description__review-indicator-wrapper">
          <ReviewIndicator
            section={this.props.section}
            title={this.props.i18n.t('description.generalCommentsTitle')}
            target={generalCommentsTarget}
            countryIso={this.props.countryIso}/>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    openCommentThreadTarget: state.review.openThread ? state.review.openThread.target : null
  }
}

export const DataSourceDescriptionAndComments = connect(mapStateToProps, {})(CommentableReviewDescriptions)
