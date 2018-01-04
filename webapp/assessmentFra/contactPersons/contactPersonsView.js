import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import CommentableDescription from '../../description/commentableDescription.js'

const sectionName = 'contactPersons'

class ContactPersonsView extends React.Component {
  componentWillMount () {
    const countryIso = this.props.match.params.countryIso
    this.props.fetchLastSectionUpdateTimestamp(countryIso, sectionName)
  }

  render () {
    const i18n = this.props.i18n

    return <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
      <div className="fra-view__content">
        <div className="fra-view__page-header">
          <h2 className="headline">{i18n.t('contactPersons.reportPreparationAndContactPersons')}</h2>
        </div>
        <CommentableDescription
           section={sectionName}
           title={i18n.t('contactPersons.contactPersons')}
           name='contactPersons'
           countryIso={this.props.match.params.countryIso}
           template={`<p>${i18n.t('contactPersons.contactPersonsSupport')}</p><table><thead><tr><th>${i18n.t('contactPersons.name')}</th><th>${i18n.t('contactPersons.institution')}</th><th>${i18n.t('contactPersons.email')}</th><th>${i18n.t('contactPersons.tables')}</th></tr></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>`}
         />
        <hr/>
        <CommentableDescription
           section={sectionName}
           title={i18n.t('contactPersons.introductoryText')}
           name='introductoryText'
           countryIso={this.props.match.params.countryIso}
           template={i18n.t('contactPersons.introductoryTextSupport')}
         />
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => ({openCommentThread: state.review.openThread, i18n: state.user.i18n })

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(ContactPersonsView)
