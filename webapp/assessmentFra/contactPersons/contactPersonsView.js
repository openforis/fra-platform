import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'

import CommentableDescription from '../../description/commentableDescription.js'

import { isFRA2020SectionEditDisabled } from '../../utils/assessmentAccess'

const sectionName = 'contactPersons'

class ContactPersonsView extends React.Component {

  componentDidMount () {
    const countryIso = this.props.match.params.countryIso
    this.props.fetchLastSectionUpdateTimestamp(countryIso, sectionName)
  }

  render () {

    const {i18n, countryIso, isEditDataDisabled} = this.props

    return <div className="fra-view__content">

        <CommentableDescription
          section={sectionName}
          title={i18n.t('contactPersons.introductoryText')}
          name='introductoryText'
          countryIso={countryIso}
          template={i18n.t('contactPersons.introductoryTextSupport')}
          disabled={isEditDataDisabled}
        />

      </div>
  }
}

const mapStateToProps = (state, props) => ({
  openCommentThread: state.review.openThread,
  i18n: state.user.i18n,
  countryIso: R.path(['match', 'params', 'countryIso'], props),
  isEditDataDisabled: isFRA2020SectionEditDisabled(state, sectionName)
})

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(ContactPersonsView)
