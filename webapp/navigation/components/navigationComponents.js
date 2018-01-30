import React from 'react'
import Route from 'route-parser'
import * as R from 'ramda'

import { Link } from '../../reusableUiComponents/link'

export const getLinkTo = (pathTemplate, countryIso) => {
  const route = new Route(pathTemplate)
  return route.reverse({countryIso})
}

export const ReviewStatus = ({status}) =>
  status.issueStatus === 'opened'
    ? <div className={`nav__review-status--${status.hasUnreadIssues ? 'unread' : 'open'}`}/>
    : null

export const NationalData = ({path, countryIso, pathTemplate, secondaryPathTemplate, status, label, userInfo}) => {
  const linkTo = getLinkTo(pathTemplate, countryIso)
  const secondaryLinkTo = getLinkTo(secondaryPathTemplate, countryIso)

  return <Link
    className={`nav__link ${R.any(linkTo => R.startsWith(linkTo, path), [linkTo, secondaryLinkTo]) ? 'selected' : ''}`}
    to={linkTo}>
    <span className="nav__link-label">{label}</span>
    <span className="nav__link-count">{status.count}</span>
    <div className="nav__link-status-content">
      <ReviewStatus status={status}/>
      <div className="nav__link-error-status">
        {
          status.errors
            ? <Icon className="icon-middle icon-red" name="alert"/>
            : null
        }
      </div>
    </div>
  </Link>
}

export const SectionLink = ({countryIso, path, pathTemplate, label}) => {
  const linkTo = getLinkTo(pathTemplate, countryIso)

  return <Link
    className={`nav__link ${R.equals(path, linkTo) ? 'selected' : ''}`}
    to={linkTo}>
    <div className='nav__link-label'>{label}</div>
  </Link>
}

export const Footer = ({i18n, userInfo, countryIso, path}) => {
  const currentYear = new Date().getFullYear()
  const newLine = `%0D%0A`
  const subject = i18n.t('navigation.support.feedbackEmailSubject')
  const body = `
${newLine}${newLine}
*** ${i18n.t('navigation.support.dontDelete')} ***
${newLine}${newLine}
${i18n.t('navigation.support.user')}: ${userInfo.name} (${userInfo.id})
${newLine}
${i18n.t('navigation.support.platformVersion')}: ${__PLATFORM_VERSION__}
${newLine}
${i18n.t('navigation.support.userAgent')}: ${navigator.userAgent}
`
  return <div className="nav__footer">
    <a
      className="nav__footer-link"
      target="_top"
      href={`mailto:fra@fao.org?subject=${subject}&body=${body}`}>
      {i18n.t('navigation.support.sendFeedback')}
    </a>
    <span className="nav__footer-copyright">&copy; {currentYear} FAO</span>
  </div>
}
