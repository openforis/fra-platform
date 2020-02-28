/**
 * This is a sub state of CountryState
 */

import * as R from 'ramda'

import * as CountryState from '@webapp/country/countryState'

export const keys = {
  issuesCount: 'issuesCount',
  lastCommentUserId: 'lastCommentUserId',
  issueStatus: 'issueStatus',
  hasUnreadIssues: 'hasUnreadIssues',
}

export const keysIssueStatus = {
  opened: 'opened'
}

const defaultSectionStatus = { [keys.issuesCount]: 0 }

export const getStatusSection = name => R.pipe(
  CountryState.getReviewStatus,
  R.propOr(defaultSectionStatus, name)
)

export const getStatusSectionChildren = section => state => R.pipe(
  R.propOr([], 'children'),
  R.reduce(
    (statusesAgg, child) => {
      const status = getStatusSection(child.section)(state)
      const issuesCount = R.prop(keys.issuesCount)(status)
      const issueStatus = R.prop(keys.issueStatus)(status)
      // filtering all opened statuses
      if (!(issuesCount === 0 || issueStatus !== keysIssueStatus.opened)) {
        statusesAgg.push(status)
      }
      return statusesAgg
    },
    []
  ),
  // checking if there's an open status with unread issues
  R.or(
    R.find(R.propEq(keys.hasUnreadIssues), true),
    R.head
  ),
  R.defaultTo({})
)(section)
