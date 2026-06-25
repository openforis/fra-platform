type InvalidLinksFixture = {
  emptyLinkText: string
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
  const brokenLinkDisplayUrl = `//${brokenLinkDomain}`
  const html = `<a href="">${emptyLinkText}</a><br><a href="https://${brokenLinkDomain}">${brokenLinkText}</a>`

  return { brokenLinkDisplayUrl, brokenLinkText, emptyLinkText, html }
}

const buildValidLinkHtml = (label: string): ValidLinkFixture => {
  const text = `valid reference ${label}`
  return { html: `<a href="https://example.com">${text}</a>`, text }
}

export const LinkFixtures = {
  buildInvalidLinksHtml,
  buildValidLinkHtml,
}
