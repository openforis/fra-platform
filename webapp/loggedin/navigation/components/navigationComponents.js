import React from 'react'
import * as R from 'ramda'

export const getLinkTo = (pathTemplate, countryIso) => R.replace(/:countryIso/, countryIso, pathTemplate)

export const ReviewStatus = ({ status }) =>
  status.issueStatus === 'opened'
    ? <div className={`nav__review-status--${status.hasUnreadIssues ? 'unread' : 'open'}`}/>
    : null

