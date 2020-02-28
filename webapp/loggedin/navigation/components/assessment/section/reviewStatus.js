import './reviewStatus.less'

import React from 'react'
import PropTypes from 'prop-types'

import * as ReviewStatusState from '@webapp/country/reviewStatusState'

const ReviewStatus = props => {

  const { status } = props

  if (status[ReviewStatusState.keys.issueStatus] !== ReviewStatusState.keysIssueStatus.opened) {
    return null
  }

  const className = `nav-review-status__${status[ReviewStatusState.keys.hasUnreadIssues] ? 'unread' : 'open'}`

  return (
    <div className={className}/>
  )

}

ReviewStatus.propTypes = {
  status: PropTypes.object.isRequired
}

export default ReviewStatus
