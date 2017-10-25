import React from 'react'
import R from 'ramda'
import assert from 'assert'
import { connect } from 'react-redux'

import './style.less'
import ReviewIndicator from '../review/reviewIndicator'
import Description from '../description/description'

const assertProps = props =>
  assert(
    props.name &&
    props.countryIso &&
    props.section,
    'Some property is missing for CommentableDescriptions'
  )
const assertDescriptionProps = props =>
  assert(
    props.descriptionTitle &&
    props.descriptionName &&
    props.commentTarget &&
    props.countryIso &&
    props.section,
    'Some property is missing for CommentableDescription'
  )

export class CommentableReviewDescription extends React.Component {
  render() {
    assertDescriptionProps(this.props)
    return <div className="commentable-description">
      <div className={
        R.equals(this.props.openCommentThreadTarget, this.props.commentTarget)
          ? 'commentable-description__description-wrapper fra-row-comments__open'
          : 'commentable-description__description-wrapper'
      }>
        <Description title={this.props.descriptionTitle}
                     name={this.props.descriptionName}
                     template={this.props.editorTemplate}
                     countryIso={this.props.countryIso}/>
      </div>
      <div className="commentable-description__review-indicator-wrapper">
        <ReviewIndicator section={this.props.section}
                         name={this.props.descriptionTitle}
                         target={this.props.commentTarget}
                         countryIso={this.props.countryIso}/>
      </div>
    </div>
  }
}

class CommentableReviewDescriptions extends React.Component {

  render() {
    const sourcesTitle = this.props.i18n.t('description.dataSourcesTitle')
    const commentsTitle = this.props.i18n.t('description.generalCommentsTitle')
    assertProps(this.props)
    return <div>
      <CommentableReviewDescription
        descriptionName={`${this.props.name}_datasources`}
        commentTarget={['dataSources']}
        editorTemplate={
          `<strong>${this.props.i18n.t('description.dataSources')}</strong>
          <p></p>
          <strong>${this.props.i18n.t('description.originalData')}</strong>
          <p></p>
          <strong>${this.props.i18n.t('description.nationalClassificationAndDefinitions')}</strong>
          <p></p>`
        }
        descriptionTitle={sourcesTitle}
        {...this.props}
      />
      <hr/>
      <CommentableReviewDescription
        descriptionName={`${this.props.name}_generalComments`}
        commentTarget={['generalComments']}
        descriptionTitle={commentsTitle}
        {...this.props}
      />
    </div>
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    openCommentThreadTarget: state.review.openThread ? state.review.openThread.target : null
  }
}

export const CommentableDescriptions = connect(mapStateToProps, {})(CommentableReviewDescriptions)
