import { createI18nPromise } from 'i18n/i18nFactory'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment, AssessmentName } from 'meta/assessment/assessment'
import { Cycle, CycleName } from 'meta/assessment/cycle'
import { Link } from 'meta/cycleData/links/link'
import { Lang } from 'meta/lang'
import { Routes } from 'meta/routes/routes'
import { SectionNames } from 'meta/routes/sectionNames'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

import { MailServiceEmail } from 'server/service/mail/mail'
import { ProcessEnv } from 'server/utils'

import { LinksByCountry } from './types'

type Props = {
  assessment: Assessment
  cycle: Cycle
  linksByCountry: LinksByCountry
  threshold: number
  user: User
}

type CountryEntry = {
  countryIso: CountryIso
  countryName: string
  countryLinksUrl: string
  links: Array<Link>
}

type GetCountryEntriesProps = {
  assessmentName: AssessmentName
  cycleName: CycleName
  linksByCountry: LinksByCountry
  t: (key: string) => string
}

// Return links to the linkStatus page per assessment x cycle x country
const getCountryLinksUrl = (params: {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
}): string =>
  `${ProcessEnv.appUri}${Routes.CountryHomeSection.generatePath({ ...params, sectionName: SectionNames.Country.Home.linksStatus })}`

// Returns the text version of the body of the email
const _getTextLines = (countryEntries: Array<CountryEntry>): string =>
  countryEntries
    .map(({ countryIso, countryLinksUrl, countryName, links }) => {
      const urlLines = links.map(({ link }) => `    - ${link}`).join('\n')
      return `  ${countryName} (${countryIso}): ${links.length} invalid link(s)\n  ${countryLinksUrl}\n${urlLines}`
    })
    .join('\n\n')

// Returns the HTML body of the email
const _getHtmlItems = (countryEntries: Array<CountryEntry>): string =>
  countryEntries
    .map(({ countryIso, countryLinksUrl, countryName, links }) => {
      const urlItems = links.map(({ link }) => `<li><a href="${link}">${link}</a></li>`).join('')
      return `<li><a href="${countryLinksUrl}"><strong>${countryName} (${countryIso})</strong></a>: ${links.length} invalid link(s)<ul>${urlItems}</ul></li>`
    })
    .join('<br>')

const _getCountryEntries = (props: GetCountryEntriesProps): Array<CountryEntry> => {
  const { assessmentName, cycleName, linksByCountry, t } = props

  const entries = Object.entries(linksByCountry) as Array<[CountryIso, Array<Link>]>

  return entries.map(([countryIso, links]) => ({
    countryIso,
    countryName: t(`area.${countryIso}.listName`),
    countryLinksUrl: getCountryLinksUrl({ assessmentName, cycleName, countryIso }),
    links,
  }))
}

export const buildEmail = async (props: Props): Promise<MailServiceEmail> => {
  const { assessment, cycle, linksByCountry, threshold, user } = props
  const { t } = await createI18nPromise(Lang.en)
  const to = user.email

  const subject = t('email.invalidLinks.subject')
  const messageHeader = t('email.invalidLinks.messageHeader', { recipientName: Users.getFullName(user) })
  const messageBodyIntro = t('email.invalidLinks.messageBodyIntro', { threshold })
  const messageFooter = t('email.invalidLinks.messageFooter')

  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const countryEntries = _getCountryEntries({ assessmentName, cycleName, linksByCountry, t })
  const textLines = _getTextLines(countryEntries)
  const htmlItems = _getHtmlItems(countryEntries)

  const text = [messageHeader, messageBodyIntro, textLines, messageFooter].join('\n\n')

  const html = [
    `<p>${messageHeader}</p>`,
    `<p>${messageBodyIntro}</p>`,
    `<ul>${htmlItems}</ul>`,
    `<p style="white-space: pre-line">${messageFooter}</p>`,
  ].join('')

  return { to, subject, text, html }
}
