import { createI18nPromise } from 'i18n/i18nFactory'

import { CountryIso } from 'meta/area/countryIso'
import { Link } from 'meta/cycleData/links/link'
import { Lang } from 'meta/lang'

import { MailServiceEmail } from 'server/service/mail/mail'

type Props = {
  to: string
  linksByCountry: Record<CountryIso, Array<Link>>
  threshold: number
}

export const buildEmail = async (props: Props): Promise<MailServiceEmail> => {
  const { linksByCountry, threshold, to } = props
  const { t } = await createI18nPromise(Lang.en)

  const subject = t('email.invalidLinks.subject')
  const messageBodyIntro = t('email.invalidLinks.messageBodyIntro', { threshold })
  const messageFooter = t('email.invalidLinks.messageFooter')

  const entries = Object.entries(linksByCountry) as Array<[CountryIso, Array<Link>]>

  // TODO : Add links
  const textLines = entries
    .map(([countryIso, links]) => `  - ${countryIso}: ${links.length} invalid link(s)`)
    .join('\n')
  const htmlItems = entries
    .map(([countryIso, links]) => `<li>${countryIso}: ${links.length} invalid link(s)</li>`)
    .join('')

  const text = `${messageBodyIntro}\n\n${textLines}\n\n${messageFooter}`
  const html = `<p>${messageBodyIntro}</p><ul>${htmlItems}</ul><p style="white-space: pre-line">${messageFooter}</p>`

  return { to, subject, text, html }
}
