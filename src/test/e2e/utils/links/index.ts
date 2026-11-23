import { enTranslation } from 'i18n/resources/en'

import { getInvalidLinkMessage } from './_getInvalidLinkMessage'

type InvalidLinksFixture = {
  emptyLinkError: string
  emptyLinkText: string
  brokenLinkError: string
  brokenLinkText: string
  brokenLinkDisplayUrl: string
  html: string
}

type ValidLinkFixture = {
  text: string
  html: string
}

// Note:
// labels are expected to be unique, e.g. Date.now().toString()

const buildInvalidLinksHtml = (label: string): InvalidLinksFixture => {
  const emptyLinkText = `empty link ${label}`
  const brokenLinkText = `broken link ${label}`
  const brokenLinkDomain = `${label}.this-domain-does-not-exist-e2e-test.invalid`
  const brokenLinkDisplayUrl = `https://${brokenLinkDomain}`
  const html = `<a href="">${emptyLinkText}</a><br><a href="${brokenLinkDisplayUrl}">${brokenLinkText}</a>`

  const { dnsError, empty } = enTranslation.linkValidation
  const brokenLinkError = getInvalidLinkMessage({ link: brokenLinkDisplayUrl, reason: dnsError })
  const emptyLinkError = getInvalidLinkMessage({ link: emptyLinkText, reason: empty })

  return { brokenLinkDisplayUrl, brokenLinkError, brokenLinkText, emptyLinkError, emptyLinkText, html }
}

const buildValidLinkHtml = (label: string): ValidLinkFixture => {
  const text = `valid reference ${label}`
  return { html: `<a href="https://example.com">${text}</a>`, text }
}

export const LinkBuilder = {
  buildInvalidLinksHtml,
  buildValidLinkHtml,
}
