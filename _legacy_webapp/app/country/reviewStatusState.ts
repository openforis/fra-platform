/**
 * This is a sub state of CountryState
 */

import * as R from 'ramda'

import * as CountryState from '../../app/country/countryState'

export const keys = {
  issuesCount: 'issuesCount',
  lastCommentUserId: 'lastCommentUserId',
  issueStatus: 'issueStatus',
  hasUnreadIssues: 'hasUnreadIssues',
}

export const keysIssueStatus = {
  opened: 'opened',
}

const defaultSectionStatus = { [keys.issuesCount]: 0 }

export const getStatusSection = (name: any) =>
  R.pipe(CountryState.getReviewStatus, R.propOr(defaultSectionStatus, name))

export const getStatusSectionChildren = (section: any) => (state: any) =>
  R.pipe(
    R.propOr({}, 'children'),
    // @ts-ignore
    R.values,
    R.reduce((statuses: any, child: any) => {
      const status: any = getStatusSection(child.name)(state)
      const issuesCount = R.prop(keys.issuesCount)(status)
      const issueStatus = R.prop(keys.issueStatus)(status)
      // filtering all opened statuses
      if (!(issuesCount === 0 || issueStatus !== keysIssueStatus.opened)) {
        statuses.push(status)
      }
      return statuses
    }, []),
    // checking if there's an open status with unread issues
    // @ts-ignore
    R.or(R.find(R.propEq(keys.hasUnreadIssues), true), R.head),
    R.defaultTo({})
    // @ts-ignore
  )(section)
