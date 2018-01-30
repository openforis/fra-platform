import React from 'react'
import Route from 'route-parser'

export const getLinkTo = (pathTemplate, countryIso) => {
  const route = new Route(pathTemplate)
  return route.reverse({countryIso})
}

export const ReviewStatus = ({status}) =>
  status.issueStatus === 'opened'
    ? <div className={`nav__review-status--${status.hasUnreadIssues ? 'unread' : 'open'}`}/>
    : null

